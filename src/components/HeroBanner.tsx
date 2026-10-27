'use client';

import React from 'react';
import {
  Copy,
  ClipboardPaste,
  ShieldCheck,
  PhoneCall,
  MessageSquare,
  Globe,
  ArrowDown,
} from 'lucide-react';
import { Language } from '@/lib/engine/types';
import { TRANSLATIONS } from '@/lib/i18n/translations';

interface HeroBannerProps {
  currentLang: Language;
  onSelectTab: (tab: 'message' | 'url' | 'examples' | 'actionCenter') => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ currentLang, onSelectTab }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section className="relative w-full bg-[#fcfcfd] pt-8 sm:pt-12 pb-6 border-b border-[#dde0e6] overflow-hidden">
      {/* Soft Indian Tricolor Civic Aura in background */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-44 bg-gradient-to-r from-[#FF9933]/10 via-transparent to-[#138808]/10 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Public service reassurance badge with Indian tricolor motif */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-[#16191f] border border-[#dde0e6] shadow-2xs mb-4">
          <div className="flex items-center gap-1" aria-hidden="true">
            <span className="w-2 h-2 rounded-full bg-[#FF9933]" />
            <span className="w-2 h-2 rounded-full bg-white border border-[#dde0e6]" />
            <span className="w-2 h-2 rounded-full bg-[#138808]" />
          </div>
          <span className="font-bold text-[#074ce0]">राष्ट्रीय नागरिक साइबर सुरक्षा</span>
          <span className="text-[#dde0e6]">•</span>
          <span className="text-[#454c58]">{t.heroBadge}</span>
        </div>

        {/* Primary Heading */}
        <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-[#16191f] tracking-tight leading-[1.15] max-w-2xl mx-auto">
          {t.heroTitle}
        </h1>

        {/* Clear, simple description */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#454c58] leading-[1.6] max-w-2xl mx-auto">
          {t.heroSubtitle}
        </p>

        {/* Civic Trust & Indian Safety Assurance Strip */}
        <div className="mt-3 text-xs font-medium text-[#454c58] flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-[#067647]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#067647]" /> 100% निःशुल्क जनसेवा
          </span>
          <span className="text-[#dde0e6] hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-1.5 text-[#074ce0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#074ce0]" /> I4C &amp; CERT-In साइबर सुरक्षा जागरूकता
          </span>
          <span className="text-[#dde0e6] hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-1.5 text-[#c2410c]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d92d20]" /> राष्ट्रीय हेल्पलाइन: 1930
          </span>
        </div>

        {/* Primary and Secondary Action Choices */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 max-w-md sm:max-w-none mx-auto">
          <button
            type="button"
            onClick={() => {
              onSelectTab('message');
              const el = document.getElementById('checker-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#074ce0] hover:bg-[#0536a0] active:scale-[0.98] text-white text-sm sm:text-base font-bold shadow-md shadow-[#074ce0]/20 transition-all cursor-pointer min-h-[48px]"
          >
            <MessageSquare className="w-5 h-5" />
            <span>{t.tabMessage}</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectTab('url');
              const el = document.getElementById('checker-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-[#f3f4f6] active:scale-[0.98] text-[#16191f] text-sm sm:text-base font-semibold border border-[#dde0e6] shadow-2xs transition-all cursor-pointer min-h-[48px]"
          >
            <Globe className="w-5 h-5 text-[#454c58]" />
            <span>{t.tabUrl}</span>
          </button>

          <a
            href="tel:1930"
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#fef3f2] hover:bg-[#fee4e2] active:scale-[0.98] text-[#d92d20] border border-[#fecdca] text-sm font-bold transition-all cursor-pointer min-h-[48px]"
          >
            <PhoneCall className="w-4 h-4" />
            <span>1930 Helpline</span>
          </a>
        </div>

        {/* 3 Short Instructions */}
        <div className="mt-10 pt-8 border-t border-[#dde0e6]/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-white border border-[#dde0e6] shadow-2xs flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#f3f4f6] text-[#074ce0] font-bold text-sm shrink-0">
                <Copy className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#16191f] flex items-center gap-1.5">
                  <span className="text-[#074ce0]">1.</span> {t.step1Title}
                </h2>
                <p className="text-xs text-[#454c58] mt-1 leading-relaxed">
                  {t.step1Desc}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-white border border-[#dde0e6] shadow-2xs flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#f3f4f6] text-[#074ce0] font-bold text-sm shrink-0">
                <ClipboardPaste className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#16191f] flex items-center gap-1.5">
                  <span className="text-[#074ce0]">2.</span> {t.step2Title}
                </h2>
                <p className="text-xs text-[#454c58] mt-1 leading-relaxed">
                  {t.step2Desc}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-white border border-[#dde0e6] shadow-2xs flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#f3f4f6] text-[#074ce0] font-bold text-sm shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#16191f] flex items-center gap-1.5">
                  <span className="text-[#074ce0]">3.</span> {t.step3Title}
                </h2>
                <p className="text-xs text-[#454c58] mt-1 leading-relaxed">
                  {t.step3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
