'use client';

import React from 'react';
import { Language } from '@/lib/engine/types';
import { BrandLogo } from './BrandLogo';

interface LanguageSelectionModalProps {
  isOpen: boolean;
  onSelectLanguage: (lang: Language) => void;
}

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  subtext: string;
  scriptGlyph: string;
}

export const LanguageSelectionModal: React.FC<LanguageSelectionModalProps> = ({
  isOpen,
  onSelectLanguage,
}) => {
  if (!isOpen) return null;

  const languages: LanguageOption[] = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      subtext: 'Continue in English',
      scriptGlyph: 'A',
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      subtext: 'हिन्दी में आगे बढ़ें',
      scriptGlyph: 'अ',
    },
    {
      code: 'bn',
      name: 'Bengali',
      nativeName: 'বাংলা',
      subtext: 'বাংলায় এগিয়ে যান',
      scriptGlyph: 'অ',
    },
    {
      code: 'mr',
      name: 'Marathi',
      nativeName: 'मराठी',
      subtext: 'मराठीत पुढे जा',
      scriptGlyph: 'म',
    },
    {
      code: 'te',
      name: 'Telugu',
      nativeName: 'తెలుగు',
      subtext: 'తెలుగులో కొనసాగించండి',
      scriptGlyph: 'తె',
    },
    {
      code: 'ta',
      name: 'Tamil',
      nativeName: 'தமிழ்',
      subtext: 'தமிழில் தொடரவும்',
      scriptGlyph: 'த',
    },
    {
      code: 'gu',
      name: 'Gujarati',
      nativeName: 'ગુજરાતી',
      subtext: 'ગુજરાતીમાં આગળ વધો',
      scriptGlyph: 'ક',
    },
    {
      code: 'kn',
      name: 'Kannada',
      nativeName: 'ಕನ್ನಡ',
      subtext: 'ಕನ್ನಡದಲ್ಲಿ ಮುಂದುವರಿಯಿರಿ',
      scriptGlyph: 'ಕ',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl border border-[#dde0e6] space-y-5 sm:space-y-6 my-auto relative overflow-hidden">
        {/* Tricolor top border accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"
          aria-hidden="true"
        />

        {/* Header with Emblem / Shield */}
        <div className="text-center space-y-2 sm:space-y-3 pt-1">
          <div className="flex justify-center">
            <BrandLogo size="lg" />
          </div>

          <h2
            id="language-modal-title"
            className="font-display font-black text-xl sm:text-3xl text-[#16191f] tracking-tight leading-snug"
          >
            Welcome to Scam<span className="text-[#ea580c]">Shield</span> <span className="text-[#15803d]">Bharat</span> 🇮🇳
          </h2>
          <p className="text-xs sm:text-sm font-bold text-[#074ce0] tracking-wide">
            Detect the Scam. Protect India.
          </p>

          <div className="space-y-1 text-xs sm:text-sm text-[#454c58] font-medium leading-relaxed">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#fef7ee] text-[#b45309] border border-[#fde68a] text-xs font-semibold mb-1">
              <span>🇮🇳 राष्ट्रीय नागरिक डिजिटल सुरक्षा</span>
            </div>
            <p>Please choose your preferred Indian language to continue</p>
            <p className="text-[#16191f] text-xs">कृपया अपनी पसंदीदा भाषा चुनें • আপনার ভাষা নির্বাচন করুন • आपली भाषा निवडा</p>
          </div>
        </div>

        {/* 8 Indian Languages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 max-h-[55vh] overflow-y-auto touch-scroll px-1 py-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => onSelectLanguage(lang.code)}
              className="flex items-center justify-between p-3 sm:p-4 min-h-[56px] rounded-2xl border-2 border-[#dde0e6] hover:border-[#074ce0] bg-[#ffffff] hover:bg-[#f8faff] text-left transition-all group cursor-pointer shadow-xs active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#f3f4f6] group-hover:bg-[#074ce0] group-hover:text-white text-[#16191f] font-bold text-base transition-colors shrink-0">
                  {lang.scriptGlyph}
                </div>
                <div>
                  <span className="font-display font-bold text-base text-[#16191f] block group-hover:text-[#074ce0]">
                    {lang.nativeName} ({lang.name})
                  </span>
                  <span className="text-xs text-[#454c58]">
                    {lang.subtext}
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#f3f4f6] text-[#454c58] group-hover:bg-[#074ce0] group-hover:text-white transition-colors shrink-0">
                Choose
              </span>
            </button>
          ))}
        </div>

        {/* Civic Safety Guarantee Note */}
        <p className="text-center text-xs text-[#454c58] leading-relaxed pt-2 border-t border-[#dde0e6]">
          100% Free Public Safety Initiative • Dial 1930 for National Cyber Crime Helpline
        </p>
      </div>
    </div>
  );
};
