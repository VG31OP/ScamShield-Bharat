'use client';

import React from 'react';
import { PhoneCall, Globe } from 'lucide-react';
import { Language } from '@/lib/engine/types';
import { TRANSLATIONS } from '@/lib/i18n/translations';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#dde0e6] bg-[#ffffff]/95 backdrop-blur-md transition-colors">
      {/* Indian National Tricolor Accent Ribbon */}
      <div
        className="h-1 sm:h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-[#ffffff] to-[#138808]"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink min-w-0">
          <BrandLogo size="md" />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-display font-black text-base sm:text-xl md:text-2xl tracking-tight text-[#0f172a] truncate">
                Scam<span className="text-[#ea580c]">Shield</span> <span className="text-[#15803d]">Bharat</span>
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-[#fff7ed] text-[#c2410c] border border-[#ffedd5] hidden sm:inline-flex items-center gap-1">
                <span>🇮🇳</span>
                <span className="font-bold text-[#b45309]">भारत</span>
              </span>
              <span className="hidden xl:inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]">
                <span>सत्यमेव जयते</span>
              </span>
            </div>
            <p className="text-xs text-[#454c58] font-medium leading-tight hidden md:block">
              Detect the Scam. Protect India. • {t.brandTagline}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Language Selector */}
          <div className="relative flex items-center bg-[#ffffff] border border-[#dde0e6] rounded-xl px-2 sm:px-2.5 h-10 sm:h-11 shadow-2xs">
            <Globe className="w-4 h-4 text-[#454c58] mr-1 sm:mr-1.5 shrink-0" />
            <select
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-transparent text-xs sm:text-sm font-bold text-[#16191f] focus:outline-none cursor-pointer pr-0.5 sm:pr-1"
              aria-label="Select Language"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="bn">বাংলা (Bengali)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="gu">ગુજરાતી (Gujarati)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
            </select>
          </div>

          {/* Emergency 1930 Helpline */}
          <a
            href="tel:1930"
            className="flex items-center justify-center gap-1.5 px-3 sm:px-3.5 h-10 sm:h-11 rounded-xl bg-[#d92d20] hover:bg-[#b42318] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-xs transition-all"
            title="National Cybercrime Emergency Helpline 1930"
          >
            <PhoneCall className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">{t.navEmergency}</span>
            <span className="sm:hidden font-mono font-bold">1930</span>
          </a>
        </div>
      </div>
    </header>
  );
};
