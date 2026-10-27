'use client';

import React from 'react';
import { DEMO_EXAMPLES } from '@/lib/data/examples';
import { Language } from '@/lib/engine/types';
import { TRANSLATIONS } from '@/lib/i18n/translations';
import { Play, Sparkles } from 'lucide-react';

interface ExampleScenariosProps {
  currentLang: Language;
  onSelectExample: (text: string) => void;
}

export const ExampleScenarios: React.FC<ExampleScenariosProps> = ({
  currentLang,
  onSelectExample,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-white border border-[#dde0e6] shadow-sm">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-[#074ce0] shrink-0 mt-0.5" />
          <div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-[#16191f]">
              {t.examplesTitle}
            </h3>
            <p className="text-sm text-[#454c58] mt-1 leading-relaxed">
              {t.examplesSubtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEMO_EXAMPLES.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white border border-[#dde0e6] shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#f3f4f6] text-[#454c58] border border-[#dde0e6] uppercase tracking-wide">
                  Test Case #{item.id}
                </span>
                <span className="text-xs font-semibold text-[#074ce0]">
                  {item.badge[currentLang] || item.badge.hi || item.badge.en}
                </span>
              </div>

              <h4 className="font-display font-bold text-base text-[#16191f]">
                {item.title[currentLang] || item.title.hi || item.title.en}
              </h4>

              <p className="text-xs sm:text-sm text-[#454c58] mt-1 leading-relaxed">
                {item.description[currentLang] || item.description.hi || item.description.en}
              </p>

              {/* Sample Message Box */}
              <div className="mt-3.5 p-3 rounded-xl bg-[#fcfcfd] border border-[#dde0e6] text-xs font-mono text-[#16191f] leading-relaxed">
                &quot;{item.content}&quot;
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#dde0e6] flex sm:justify-end">
              <button
                type="button"
                onClick={() => onSelectExample(item.content)}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 min-h-[44px] rounded-xl bg-[#074ce0] hover:bg-[#0536a0] active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{t.btnLoadExample}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
