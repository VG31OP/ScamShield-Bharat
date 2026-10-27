'use client';

import React, { useState } from 'react';
import {
  Globe,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Unlock,
  Layers,
  FileCode,
  Info,
  Trash2,
  ClipboardPaste,
} from 'lucide-react';
import { Language, UrlAnalysis } from '@/lib/engine/types';
import { analyzeUrl } from '@/lib/engine/urlDetector';
import { TRANSLATIONS } from '@/lib/i18n/translations';

interface UrlSafetyCheckerProps {
  currentLang: Language;
  onAnalyzeUrlText: (url: string) => void;
}

export const UrlSafetyChecker: React.FC<UrlSafetyCheckerProps> = ({
  currentLang,
  onAnalyzeUrlText,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [inputUrl, setInputUrl] = useState('');
  const [analyzedData, setAnalyzedData] = useState<UrlAnalysis | null>(null);

  const sampleUrls = [
    { label: 'SBI Lookalike Phishing', url: 'https://bit.ly/sbi-pan-kyc-update' },
    { label: 'India Post Fake Domain (.top)', url: 'http://indiapost-parcel-update.top/address' },
    { label: 'Raw IP APK Trojan', url: 'http://192.168.1.104/yono_sbi_update.apk' },
    { label: 'Official SBI Domain', url: 'https://onlinesbi.sbi' },
    { label: 'Official Cybercrime Portal', url: 'https://cybercrime.gov.in' },
  ];

  const handleInspect = (targetUrl?: string) => {
    const urlToTest = (targetUrl !== undefined ? targetUrl : inputUrl).trim();
    if (!urlToTest) return;
    const result = analyzeUrl(urlToTest);
    setAnalyzedData(result);
    onAnalyzeUrlText(urlToTest);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputUrl(text);
        handleInspect(text);
      }
    } catch {
      // Clipboard denied
    }
  };

  const handleClear = () => {
    setInputUrl('');
    setAnalyzedData(null);
  };

  return (
    <div className="space-y-6">
      {/* Informative Intro Note */}
      <div className="p-5 rounded-xl bg-[#f3f4f6] border border-[#dde0e6]">
        <div className="flex items-start gap-3">
          <Globe className="w-5 h-5 text-[#074ce0] shrink-0 mt-0.5" />
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-[#16191f]">
              {t.urlInspectorTitle}
            </h3>
            <p className="text-sm text-[#454c58] mt-1 leading-relaxed">
              {t.urlInspectorSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* URL Input Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#dde0e6] shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="url-input" className="text-sm font-bold text-[#16191f] flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#074ce0] shrink-0" />
            <span>Paste website link:</span>
          </label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePaste}
              className="px-3 py-2 min-h-[40px] text-xs sm:text-sm font-semibold rounded-xl bg-[#f3f4f6] text-[#454c58] hover:bg-[#e5e7eb] active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <ClipboardPaste className="w-3.5 h-3.5" />
              <span>{t.btnPaste}</span>
            </button>

            {inputUrl && (
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-2 min-h-[40px] text-xs sm:text-sm font-semibold rounded-xl text-[#d92d20] hover:bg-[#fef3f2] active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.btnClear}</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            id="url-input"
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder={t.urlInputPlaceholder}
            className="flex-1 px-4 py-3.5 min-h-[48px] rounded-xl border border-[#dde0e6] bg-[#fcfcfd] text-[#16191f] text-base focus:outline-none focus:ring-2 focus:ring-[#074ce0] font-mono"
            onKeyDown={(e) => e.key === 'Enter' && handleInspect()}
          />
          <button
            type="button"
            onClick={() => handleInspect()}
            disabled={!inputUrl.trim()}
            className="w-full sm:w-auto px-6 py-3.5 min-h-[48px] rounded-xl bg-[#074ce0] hover:bg-[#0536a0] active:scale-[0.98] disabled:opacity-50 text-white font-bold text-sm sm:text-base transition-all cursor-pointer shrink-0 flex items-center justify-center gap-2"
          >
            <span>{t.btnInspectUrl}</span>
          </button>
        </div>

        {/* Explicit Guarantee and Live Reputation Limitation Notice */}
        <div className="p-3.5 rounded-xl bg-[#fff9f0] border border-[#fedf89] flex items-start gap-2.5 text-xs text-[#7a2e0e]">
          <Info className="w-4 h-4 text-[#b54708] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {t.urlCautionNote}
          </p>
        </div>

        {/* Indian Citizen Cyber Tip for URLs */}
        <div className="p-3 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] flex items-start gap-2.5 text-xs text-[#166534]">
          <ShieldAlert className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
          <p className="leading-relaxed font-medium">
            <span className="font-bold">🇮🇳 भारतीय नागरिक सुरक्षा नियम:</span> केंद्र व राज्य सरकारों की आधिकारिक वेबसाइट हमेशा <span className="font-mono font-bold">.gov.in</span> या <span className="font-mono font-bold">.nic.in</span> पर होती हैं। बैंक या डाक विभाग कभी भी एसएमएस में <span className="font-mono font-bold">.apk</span>, <span className="font-mono font-bold">.top</span>, या <span className="font-mono font-bold">.xyz</span> लिंक नहीं भेजते।
          </p>
        </div>

        {/* Test URLs (Explicit User Action Only) */}
        <div className="pt-2">
          <span className="text-xs font-bold text-[#454c58] uppercase tracking-wider block mb-2">
            Or test with a known sample link:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleUrls.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputUrl(s.url);
                  handleInspect(s.url);
                }}
                className="px-3.5 py-2 min-h-[40px] text-xs font-medium rounded-xl bg-white text-[#16191f] hover:bg-[#f3f4f6] active:scale-95 border border-[#dde0e6] transition-all cursor-pointer"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* URL Structural Breakdown */}
      {analyzedData && (
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#dde0e6] shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dde0e6] pb-3">
            <div>
              <span className="text-xs font-bold text-[#454c58] uppercase tracking-wider block">
                Inspected Website Hostname:
              </span>
              <span className="font-display font-bold text-base sm:text-lg text-[#16191f] break-all">
                {analyzedData.domain || 'N/A'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {analyzedData.isHttps ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#ecfdf3] text-[#067647] border border-[#a6f4c5]">
                  <Lock className="w-3.5 h-3.5" />
                  <span>HTTPS Encrypted</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#fffaeb] text-[#b54708] border border-[#fedf89]">
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Insecure HTTP (No Encryption)</span>
                </span>
              )}
            </div>
          </div>

          {/* Heuristic Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Lookalike Status */}
            <div className="p-3.5 rounded-xl bg-[#fcfcfd] border border-[#dde0e6]">
              <span className="text-xs text-[#454c58] font-medium block">
                {t.urlLookalike}
              </span>
              <div className="mt-1 flex items-center gap-1.5">
                {analyzedData.isLookalike ? (
                  <>
                    <ShieldAlert className="w-4 h-4 text-[#d92d20] shrink-0" />
                    <span className="text-xs font-bold text-[#b42318]">
                      Impersonating {analyzedData.targetBrand}
                    </span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#067647] shrink-0" />
                    <span className="text-xs font-semibold text-[#16191f]">
                      No known brand spoof matched
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Shortener Status */}
            <div className="p-3.5 rounded-xl bg-[#fcfcfd] border border-[#dde0e6]">
              <span className="text-xs text-[#454c58] font-medium block">
                {t.urlShortener}
              </span>
              <div className="mt-1 flex items-center gap-1.5">
                {analyzedData.isShortener ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-[#b54708] shrink-0" />
                    <span className="text-xs font-bold text-[#b54708]">
                      Yes (Destination is masked)
                    </span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#067647] shrink-0" />
                    <span className="text-xs font-semibold text-[#16191f]">
                      Direct Domain
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* TLD Assessment */}
            <div className="p-3.5 rounded-xl bg-[#fcfcfd] border border-[#dde0e6]">
              <span className="text-xs text-[#454c58] font-medium block">
                {t.urlTld}
              </span>
              <div className="mt-1 flex items-center gap-1.5">
                {analyzedData.hasSuspiciousTld ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-[#b54708] shrink-0" />
                    <span className="text-xs font-bold text-[#b54708]">
                      Suspicious (.{analyzedData.domain.split('.').pop()})
                    </span>
                  </>
                ) : (
                  <>
                    <Layers className="w-4 h-4 text-[#454c58] shrink-0" />
                    <span className="text-xs font-semibold text-[#16191f]">
                      .{analyzedData.domain.split('.').pop() || 'standard'}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Danger: APK Trojan Alert */}
          {analyzedData.hasSuspiciousExtension && (
            <div className="p-4 rounded-xl bg-[#fef3f2] border border-[#fecdca] flex items-start gap-3">
              <FileCode className="w-5 h-5 text-[#d92d20] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-[#b42318]">
                  Dangerous Application (.APK) Download Detected!
                </p>
                <p className="text-xs sm:text-sm text-[#b42318]/90 mt-0.5 leading-relaxed">
                  Do not download or install this file. Attackers trick citizens into installing fake banking or electricity apps to gain remote access to SMS and OTPs.
                </p>
              </div>
            </div>
          )}

          {/* Specific Flags List */}
          {analyzedData.flags.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-[#16191f] block">
                Specific Warning Indicators:
              </span>
              {analyzedData.flags.map((flag, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg text-xs sm:text-sm font-medium flex items-start gap-2 ${
                    flag.severity === 'danger'
                      ? 'bg-[#fef3f2] text-[#b42318] border border-[#fecdca]'
                      : 'bg-[#fffaeb] text-[#b54708] border border-[#fedf89]'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{flag.description[currentLang] || flag.description.en}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
