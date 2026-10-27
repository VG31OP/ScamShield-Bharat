'use client';

import React, { useState } from 'react';
import {
  PhoneCall,
  ExternalLink,
  ShieldAlert,
  Clock,
  Info,
  ChevronRight,
} from 'lucide-react';
import { Language } from '@/lib/engine/types';
import { TRANSLATIONS } from '@/lib/i18n/translations';

interface ActionCenterProps {
  currentLang: Language;
}

export const ActionCenter: React.FC<ActionCenterProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [selectedTriage, setSelectedTriage] = useState<number>(1);

  const getTriageSteps = (id: number): string[] => {
    const stepsMap: Record<number, Record<string, string[]>> = {
      1: {
        en: [
          'Do NOT click any link in the message.',
          'Do NOT reply with STOP, YES, or call any number mentioned inside the text.',
          'Take a screenshot showing the sender phone number or alphanumeric header.',
          'Block and report the sender on WhatsApp or mark as Spam in your SMS app.',
          'Report fraudulent SMS sender headers to DoT Chakshu at sancharsaathi.gov.in.',
        ],
        hi: [
          'संदेश में दिए गए किसी भी लिंक पर क्लिक न करें।',
          'STOP या YES लिखकर जवाब न दें और संदेश में दिए किसी नंबर पर फोन न करें।',
          'संदेश भेजने वाले का नंबर या हेडर दिखाते हुए स्क्रीनशॉट लें।',
          'व्हाट्सऐप पर नंबर को ब्लॉक और रिपोर्ट करें या एसएमएस में स्पैम मार्क करें।',
          'धोखाधड़ी वाले एसएमएस हेडर को संचार साथी (sancharsaathi.gov.in) पर रिपोर्ट करें।',
        ],
        gu: [
          'મેસેજમાં આપેલી કોઈપણ લિંક પર ક્લિક કરશો નહીં.',
          'STOP કે YES લખીને જવાબ આપશો નહીં અને અંદર આપેલા નંબર પર ફોન કરશો નહીં.',
          'મોકલનારનો નંબર કે હેડર દેખાય તેવો સ્ક્રીનશોટ પાડી લો.',
          'વોટ્સએપ પર નંબર બ્લોક અને રિપોર્ટ કરો અથવા SMSમાં સ્પામ માર્ક કરો.',
          'છેતરપિંડીવાળા SMS હેડરને સંચાર સાથી (sancharsaathi.gov.in) પર રિપોર્ટ કરો.',
        ],
      },
      2: {
        en: [
          'Turn off your internet (Wi-Fi and mobile data) immediately.',
          'Open your Downloads folder and delete any recently downloaded .APK or .EXE files immediately.',
          'Clear your mobile browser history, cookies, and cache.',
          'Never permit "Install from Unknown Sources" or "Accessibility Service" access.',
          'Run a mobile security scan using Google Play Protect on your Android phone.',
        ],
        hi: [
          'तुरंत अपने फोन का इंटरनेट (वाई-फाई और मोबाइल डेटा) बंद करें।',
          'अपने फोन के डाउनलोड्स फोल्डर में जाकर हाल ही में डाउनलोड की गई .APK या .EXE फाइल डिलीट करें।',
          'ब्राउज़र की हिस्ट्री और कैशे तुरंत साफ करें।',
          'अज्ञात स्रोतों से ऐप इंस्टॉल करने या एक्सेसिबिलिटी परमिशन कभी न दें।',
          'गूगल प्ले स्टोर में जाकर Google Play Protect से फोन को तुरंत स्कैन करें।',
        ],
        gu: [
          'તરત જ તમારા ફોનનું ઈન્ટરનેટ (વાઈ-ફાઈ અને મોબાઈલ ડેટા) બંધ કરો.',
          'ડાઉનલોડ્સ ફોલ્ડરમાં જઈને તાજેતરમાં ડાઉનલોડ કરેલી .APK કે .EXE ફાઇલ ડિલીટ કરો.',
          'મોબાઇલ બ્રાઉઝરની હિસ્ટ્રી અને કેશ તરત સાફ કરો.',
          'અજાણી એપ ઇન્સ્ટોલ કરવાની પરમિશન ક્યારેય આપશો નહીં.',
          'Google Play Protect દ્વારા તમારા ફોનને તરત સ્કેન કરો.',
        ],
      },
      3: {
        en: [
          'Call your bank official 24x7 customer helpline IMMEDIATELY to block netbanking & debit cards.',
          'Change your netbanking login password and transaction password from a DIFFERENT, clean device.',
          'Reset your UPI MPIN on Google Pay, PhonePe, and Paytm.',
          'Check your account mini-statement to verify if any unauthorized transaction has initiated.',
        ],
        hi: [
          'तुरंत अपने बैंक के आधिकारिक 24x7 हेल्पलाइन पर कॉल करके नेटबैंकिंग और डेबिट कार्ड ब्लॉक करवाएं।',
          'किसी दूसरे सुरक्षित फोन या कंप्यूटर से अपना नेटबैंकिंग पासवर्ड बदलें।',
          'Google Pay, PhonePe और Paytm का UPI पिन तुरंत रीसेट करें।',
          'अपने बैंक खाते का मिनी स्टेटमेंट जांचें कि कोई अनधिकृत लेन-देन तो नहीं हुआ।',
        ],
        gu: [
          'તરત જ બેંકની 24x7 હેલ્પલાઇન પર કોલ કરીને નેટબેંકિંગ અને ડેબિટ કાર્ડ બ્લોક કરાવો.',
          'બીજા સુરક્ષિત ફોન કે કમ્પ્યુટર પરથી નેટબેંકિંગ પાસવર્ડ બદલો.',
          'Google Pay, PhonePe અને Paytm નો UPI PIN તરત રીસેટ કરો.',
          'ખાતાનું મિની સ્ટેટમેન્ટ તપાસો કે કોઈ અનધિકૃત વ્યવહાર થયો નથી ને.',
        ],
      },
      4: {
        en: [
          'ACT WITHIN THE GOLDEN HOURS: Dial 1930 immediately! The Indian Cyber Crime Coordination Centre (I4C) can freeze recipient bank accounts before funds are withdrawn at ATMs.',
          'Note down: Transaction UTR Number, Bank Account Number, Recipient UPI ID, Date & Exact Time.',
          'File an official FIR complaint on the National Cyber Crime Portal at https://cybercrime.gov.in.',
          'Visit your bank branch with a copy of the cybercrime complaint acknowledgment to request a chargeback / lien.',
        ],
        hi: [
          'गोल्डन ऑवर्स में तुरंत कार्रवाई करें: फौरन 1930 डायल करें! I4C पैसे एटीएम से निकाले जाने से पहले ब्लॉक कर सकता है।',
          'लेन-देन का UTR नंबर, बैंक खाता संख्या, तारीख और समय लिखकर रखें।',
          'राष्ट्रीय साइबर अपराध पोर्टल (cybercrime.gov.in) पर तुरंत ऑनलाइन शिकायत दर्ज करें।',
          'साइबर अपराध शिकायत पावती की प्रति लेकर अपनी बैंक शाखा जाएं।',
        ],
        gu: [
          'ગોલ્ડન અવર્સમાં તાત્કાલિક પગલાં લો: તરત જ 1930 ડાયલ કરો! રકમ ઉપાડતા પહેલા ફ્રીઝ કરાવી શકાય છે.',
          'ટ્રાન્ઝેક્શન UTR નંબર, બેંક એકાઉન્ટ નંબર, તારીખ અને ચોક્કસ સમય નોંધી રાખો.',
          'રાષ્ટ્રીય સાયબર ક્રાઈમ પોર્ટલ (cybercrime.gov.in) પર ઓનલાઈન ફરિયાદ નોંધાવો.',
          'ફરિયાદની નકલ સાથે તમારી બેંક શાખાની મુલાકાત લો.',
        ],
      },
    };

    const scenario = stepsMap[id];
    if (!scenario) return [];
    return scenario[currentLang] || (currentLang === 'hi' || currentLang === 'mr' ? scenario.hi : scenario.en);
  };

  const triageOptions = [
    {
      id: 1,
      title: t.triageScenario1,
      desc: t.triageDesc1,
      steps: getTriageSteps(1),
    },
    {
      id: 2,
      title: t.triageScenario2,
      desc: t.triageDesc2,
      steps: getTriageSteps(2),
    },
    {
      id: 3,
      title: t.triageScenario3,
      desc: t.triageDesc3,
      steps: getTriageSteps(3),
    },
    {
      id: 4,
      title: t.triageScenario4,
      desc: t.triageDesc4,
      steps: getTriageSteps(4),
    },
  ];

  const currentOption = triageOptions.find((o) => o.id === selectedTriage) || triageOptions[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#dde0e6] shadow-sm">
        <h3 className="font-display font-bold text-xl sm:text-2xl text-[#16191f]">
          {t.actionCenterTitle}
        </h3>
        <p className="text-sm sm:text-base text-[#454c58] mt-1 leading-relaxed">
          {t.actionCenterSubtitle}
        </p>
      </div>

      {/* Emergency 1930 & Golden Hours Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#fef3f2] border border-[#fecdca] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#d92d20] text-white">
                <Clock className="w-3.5 h-3.5" />
                <span>{t.goldenHoursTitle}</span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white text-[#b42318] border border-[#fecdca]">
                🇮🇳 गृह मंत्रालय (MHA) • I4C
              </span>
            </div>
            <h4 className="font-display font-bold text-2xl sm:text-3xl text-[#16191f]">
              राष्ट्रीय साइबर अपराध हेल्पलाइन: 1930
            </h4>
            <p className="text-xs sm:text-sm text-[#454c58] max-w-xl leading-relaxed">
              {t.goldenHoursDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto shrink-0">
            <a
              href="tel:1930"
              className="flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl bg-[#d92d20] hover:bg-[#b42318] active:scale-[0.98] text-white font-bold text-sm sm:text-base shadow-sm transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t.call1930Btn}</span>
            </a>

            <a
              href="https://cybercrime.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-xl bg-white text-[#16191f] border border-[#dde0e6] hover:bg-[#f3f4f6] active:scale-[0.98] font-semibold text-sm transition-all"
            >
              <span>cybercrime.gov.in</span>
              <ExternalLink className="w-4 h-4 text-[#454c58]" />
            </a>
          </div>
        </div>

        {/* Clear Disclaimer: We do not file complaints for you */}
        <div className="mt-5 pt-4 border-t border-[#fecdca] flex items-start gap-2 text-xs text-[#7a2e0e]">
          <Info className="w-4 h-4 text-[#b42318] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {t.notPoliceDisclaimer}
          </p>
        </div>
      </div>

      {/* Interactive Incident Triage: What happened? */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#dde0e6] shadow-sm space-y-6">
        <div>
          <h4 className="font-display font-bold text-lg text-[#16191f] flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#074ce0]" />
            <span>{t.triageTitle}</span>
          </h4>
        </div>

        {/* Situation Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {triageOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedTriage(opt.id)}
              className={`p-4 rounded-xl text-left border min-h-[56px] active:scale-[0.98] transition-all cursor-pointer ${
                selectedTriage === opt.id
                  ? 'bg-[#074ce0] text-white border-[#074ce0] shadow-sm'
                  : 'bg-[#fcfcfd] text-[#16191f] border-[#dde0e6] hover:bg-[#f3f4f6]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold ${selectedTriage === opt.id ? 'text-white/80' : 'text-[#074ce0]'}`}>
                  Option {opt.id}
                </span>
              </div>
              <h5 className="font-bold text-sm leading-snug">
                {opt.title}
              </h5>
            </button>
          ))}
        </div>

        {/* Selected Guidance Details */}
        <div className="p-5 sm:p-6 rounded-xl bg-[#fcfcfd] border border-[#dde0e6] space-y-4">
          <div className="border-b border-[#dde0e6] pb-3">
            <h5 className="font-display font-bold text-base sm:text-lg text-[#16191f]">
              {currentOption.title}
            </h5>
            <p className="text-xs sm:text-sm text-[#454c58] mt-0.5">
              {currentOption.desc}
            </p>
          </div>

          <ul className="space-y-3">
            {currentOption.steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#16191f] leading-relaxed">
                <ChevronRight className="w-4 h-4 text-[#074ce0] shrink-0 mt-0.5" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
