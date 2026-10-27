'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertOctagon,
  AlertTriangle,
  Copy,
  Check,
  Share2,
  PhoneCall,
  ExternalLink,
  Volume2,
  VolumeX,
  ChevronRight,
  Info,
} from 'lucide-react';
import { Language, ScamAnalysisResult } from '@/lib/engine/types';
import { TRANSLATIONS } from '@/lib/i18n/translations';

interface ResultDashboardProps {
  result: ScamAnalysisResult;
  currentLang: Language;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({ result, currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Stop speaking if component unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const citizenCategory = result.citizenCategory;

  // 3 Clear Result Categories
  const getCategoryConfig = () => {
    switch (citizenCategory) {
      case 'HIGH_RISK':
        return {
          label: t.levelHighRisk,
          description: t.descHighRisk,
          cardBg: 'bg-[#fef3f2]',
          border: 'border-[#fecdca]',
          badgeBg: 'bg-[#d92d20] text-white',
          textColor: 'text-[#b42318]',
          icon: AlertOctagon,
        };
      case 'SOME_WARNINGS':
        return {
          label: t.levelSomeWarnings,
          description: t.descSomeWarnings,
          cardBg: 'bg-[#fffaeb]',
          border: 'border-[#fedf89]',
          badgeBg: 'bg-[#b54708] text-white',
          textColor: 'text-[#b54708]',
          icon: AlertTriangle,
        };
      default:
        return {
          label: t.levelNoWarnings,
          description: t.descNoWarnings,
          cardBg: 'bg-[#ecfdf3]',
          border: 'border-[#a6f4c5]',
          badgeBg: 'bg-[#067647] text-white',
          textColor: 'text-[#067647]',
          icon: ShieldCheck,
        };
    }
  };

  const config = getCategoryConfig();
  const StatusIcon = config.icon;

  // Plain-text summary for copying
  const generatePlainTextReport = () => {
    const warningsText = result.warnings
      .map((w) => `• ${w.title[currentLang] || w.title.en}: ${w.explanation[currentLang] || w.explanation.en}`)
      .join('\n');
    const actionsText = (result.recommendedActions[currentLang] || result.recommendedActions.en || [])
      .map((a, idx) => `  ${idx + 1}. ${a}`)
      .join('\n');

    return `🛡️ SCAMSHIELD BHARAT - SAFETY REPORT
==========================================
Result: ${config.label}
Assessment: ${config.description}

Detected Warning Signs (${result.warnings.length}):
${warningsText || 'No obvious warning signs detected.'}

Recommended Actions:
${actionsText}

Emergency Help:
If money was debited fraudulently, call 1930 immediately or visit https://cybercrime.gov.in/

Notice: ScamShield Bharat is an advisory tool. It does not file police complaints for you.`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatePlainTextReport());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleWhatsAppShare = () => {
    const localizedWarning =
      currentLang === 'hi'
        ? '⚠️ कभी भी किसी के साथ अपना OTP, UPI पिन या बैंक पासवर्ड साझा न करें। यदि आपको धोखाधड़ी का संदेह है, तो तुरंत राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 पर कॉल करें।'
        : currentLang === 'gu'
        ? '⚠️ કોઈપણ સંજોગોમાં તમારો OTP, UPI PIN કે બેંક પાસવર્ડ કોઈને આપશો નહીં. શંકા હોય તો તરત જ રાષ્ટ્રીય સાયબર ક્રાઈમ હેલ્પલાઇન 1930 પર કોલ કરો.'
        : '⚠️ Never share your OTP, UPI PIN, or bank passwords with anyone. If you suspect fraud, call National Cybercrime Helpline 1930 immediately.';

    const textToShare = encodeURIComponent(
      `🚨 *ScamShield Bharat Safety Check* 🚨\n\n` +
      `*Status:* ${config.label}\n\n` +
      `*Advice:* ${config.description}\n\n` +
      `${localizedWarning}`
    );
    window.open(`https://api.whatsapp.com/send?text=${textToShare}`, '_blank', 'noopener,noreferrer');
  };

  const handleVoiceToggle = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Prepare speech text in selected language
    const speechText = `${config.label}. ${config.description}. ${
      result.warnings.length > 0
        ? result.warnings.map((w) => w.title[currentLang] || w.title.en).join('. ')
        : t.noWarningsDesc
    }`;

    const utterance = new SpeechSynthesisUtterance(speechText);
    const langVoiceMap: Record<Language, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      bn: 'bn-IN',
      mr: 'mr-IN',
      te: 'te-IN',
      ta: 'ta-IN',
      gu: 'gu-IN',
      kn: 'kn-IN',
    };
    utterance.lang = langVoiceMap[currentLang] || 'en-IN';
    utterance.rate = 0.9; // Slightly slower for clarity

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div id="results-card" className={`mt-6 sm:mt-8 rounded-2xl border p-4 sm:p-8 bg-white ${config.border} shadow-sm`}>
      {/* Top Banner with 3 Clear Result Categories */}
      <div className={`p-4 sm:p-6 rounded-xl ${config.cardBg} border ${config.border} flex flex-col md:flex-row md:items-center justify-between gap-5`}>
        <div className="flex items-start gap-3.5 sm:gap-4">
          <div className={`flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${config.badgeBg} shrink-0 mt-0.5 shadow-sm`}>
            <StatusIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${config.badgeBg}`}>
                {config.label}
              </span>
            </div>
            <p className="mt-2 text-base sm:text-lg font-semibold text-[#16191f] leading-snug max-w-2xl">
              {config.description}
            </p>
          </div>
        </div>

        {/* Voice and WhatsApp Family Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 w-full md:w-auto shrink-0">
          {typeof window !== 'undefined' && 'speechSynthesis' in window && (
            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer min-h-[44px] active:scale-[0.98] ${
                isSpeaking
                  ? 'bg-[#d92d20] text-white border-[#d92d20]'
                  : 'bg-white text-[#16191f] border-[#dde0e6] hover:bg-[#f3f4f6]'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#074ce0]" />}
              <span>{isSpeaking ? t.voiceStop : t.voiceReadout}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#25d366] hover:bg-[#20ba59] active:scale-[0.98] text-white shadow-xs transition-all cursor-pointer min-h-[44px]"
          >
            <Share2 className="w-4 h-4" />
            <span>{t.shareWhatsapp}</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 px-4 py-3 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white hover:bg-[#f3f4f6] active:scale-[0.98] text-[#454c58] border border-[#dde0e6] transition-all cursor-pointer min-h-[44px]"
          >
            {copied ? <Check className="w-4 h-4 text-[#067647]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t.copiedReport : t.copyReport}</span>
          </button>
        </div>
      </div>

      {/* Detected Warning Signs (Plain Language, Short Sentences) */}
      <div className="mt-8">
        <h3 className="font-display font-bold text-lg text-[#16191f] flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-[#074ce0]" />
          <span>{t.warningsFound} ({result.warnings.length})</span>
        </h3>

        {result.warnings.length === 0 ? (
          <div className="p-5 rounded-xl bg-[#f3f4f6] border border-[#dde0e6] text-center">
            <ShieldCheck className="w-8 h-8 text-[#067647] mx-auto mb-2" />
            <h4 className="font-bold text-base text-[#16191f]">
              {t.noWarningsTitle}
            </h4>
            <p className="text-sm text-[#454c58] mt-1 max-w-xl mx-auto leading-relaxed">
              {t.noWarningsDesc}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {result.warnings.map((warn, i) => (
              <div
                key={warn.id || i}
                className="p-4 rounded-xl bg-[#ffffff] border border-[#dde0e6] flex flex-col gap-1.5 shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${
                      warn.severity === 'critical' || warn.severity === 'high'
                        ? 'bg-[#fef3f2] text-[#b42318] border border-[#fecdca]'
                        : 'bg-[#fffaeb] text-[#b54708] border border-[#fedf89]'
                    }`}
                  >
                    {warn.severity === 'critical' || warn.severity === 'high' ? 'Warning' : 'Notice'}
                  </span>
                  <span className="font-bold text-sm sm:text-base text-[#16191f]">
                    {warn.title[currentLang] || warn.title.en}
                  </span>
                </div>

                <p className="text-sm text-[#454c58] leading-relaxed">
                  {warn.explanation[currentLang] || warn.explanation.en}
                </p>

                {warn.matchedPatterns.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                    <span className="text-[#454c58] font-medium">Found in message:</span>
                    {warn.matchedPatterns.map((pat, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 font-mono text-xs bg-[#f3f4f6] text-[#16191f] rounded border border-[#dde0e6]"
                      >
                        {pat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Safety Actions Checklist */}
      <div className="mt-8 p-6 rounded-xl bg-[#fcfcfd] border border-[#dde0e6]">
        <h3 className="font-display font-bold text-base sm:text-lg text-[#16191f] flex items-center gap-2 mb-3">
          <ShieldAlert className="w-5 h-5 text-[#074ce0]" />
          <span>{t.actionsTitle}</span>
        </h3>

        <ul className="space-y-2.5">
          {(result.recommendedActions[currentLang] || result.recommendedActions.en || []).map((action, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-[#16191f] leading-relaxed">
              <ChevronRight className="w-4 h-4 text-[#074ce0] shrink-0 mt-1" />
              <span>{action}</span>
            </li>
          ))}
        </ul>

        {/* Emergency Call Box if High Risk */}
        {citizenCategory === 'HIGH_RISK' && (
          <div className="mt-6 p-4 rounded-xl bg-[#fef3f2] border border-[#fecdca] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <PhoneCall className="w-6 h-6 text-[#d92d20] shrink-0" />
              <div>
                <p className="text-sm sm:text-base font-bold text-[#b42318]">
                  Transferred money or shared OTP?
                </p>
                <p className="text-xs sm:text-sm text-[#b42318]/90">
                  Call National Cybercrime Helpline 1930 immediately within the first 2 hours.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="tel:1930"
                className="px-4 py-2.5 bg-[#d92d20] hover:bg-[#b42318] text-white font-bold text-xs sm:text-sm rounded-lg shadow-xs flex items-center gap-1.5 transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call 1930</span>
              </a>
              <a
                href="https://cybercrime.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 bg-white text-[#16191f] border border-[#dde0e6] hover:bg-[#f3f4f6] font-semibold text-xs sm:text-sm rounded-lg flex items-center gap-1.5"
              >
                <span>cybercrime.gov.in</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#454c58]" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Reassuring Golden Rules for Everyone */}
      <div className="mt-8 p-5 rounded-xl bg-white border border-[#dde0e6]">
        <h4 className="font-display font-bold text-sm sm:text-base text-[#16191f] mb-3">
          {t.goldenRulesTitle}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#454c58]">
          <div className="p-3 rounded-lg bg-[#f3f4f6] border border-[#dde0e6]/70 leading-relaxed">
            🚫 <strong>Rule 1:</strong> {t.rule1}
          </div>
          <div className="p-3 rounded-lg bg-[#f3f4f6] border border-[#dde0e6]/70 leading-relaxed">
            ⚖️ <strong>Rule 2:</strong> {t.rule2}
          </div>
          <div className="p-3 rounded-lg bg-[#f3f4f6] border border-[#dde0e6]/70 leading-relaxed">
            💳 <strong>Rule 3:</strong> {t.rule3}
          </div>
          <div className="p-3 rounded-lg bg-[#f3f4f6] border border-[#dde0e6]/70 leading-relaxed">
            📲 <strong>Rule 4:</strong> {t.rule4}
          </div>
        </div>
      </div>

      {/* Honest Public Service Disclaimer */}
      <div className="mt-6 flex items-start gap-2 text-xs text-[#454c58] border-t border-[#dde0e6] pt-4">
        <Info className="w-4 h-4 text-[#454c58] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {t.notPoliceDisclaimer}
        </p>
      </div>
    </div>
  );
};
