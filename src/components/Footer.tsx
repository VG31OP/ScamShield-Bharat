'use client';

import React from 'react';
import { Lock, PhoneCall, ExternalLink } from 'lucide-react';
import { Language } from '@/lib/engine/types';
import { TRANSLATIONS } from '@/lib/i18n/translations';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <footer className="w-full bg-[#16191f] text-white border-t border-[#2b303b] mt-16 transition-colors">
      {/* Indian National Tricolor Stripe */}
      <div
        className="h-1 sm:h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-[#ffffff] to-[#138808]"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="sm:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <BrandLogo size="md" />
              <div>
                <span className="font-display font-bold text-xl text-[#fcfcfd] block">
                  Scam<span className="text-[#fb923c]">Shield</span> <span className="text-[#4ade80]">Bharat</span> 🇮🇳
                </span>
                <span className="text-xs text-[#94a3b8] font-medium block">
                  Detect the Scam. Protect India.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#f59e0b]">
              <span>🇮🇳 सत्यमेव जयते</span>
              <span className="text-[#454c58]">•</span>
              <span className="text-[#d0d4dd]">राष्ट्रीय नागरिक साइबर सुरक्षा पहल</span>
            </div>
            <p className="text-sm text-[#d0d4dd] max-w-md leading-relaxed">
              {t.footerDisclaimer}
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#34d399] bg-[#202530] px-3 py-1.5 rounded-lg border border-[#2e3544]">
              <Lock className="w-3.5 h-3.5" />
              <span>100% Private Client-Side Analysis (Zero Data Saved)</span>
            </div>
          </div>

          {/* Emergency Portals */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d0d4dd]">
              {t.officialLinksTitle}
            </h4>
            <ul className="space-y-1 text-xs sm:text-sm text-[#d0d4dd]">
              <li>
                <a
                  href="https://cybercrime.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#38bdf8] inline-flex items-center gap-1.5 py-1.5 transition-colors"
                >
                  <span>National Cyber Crime Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#d0d4dd]/60" />
                </a>
              </li>
              <li>
                <a
                  href="https://sancharsaathi.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#38bdf8] inline-flex items-center gap-1.5 py-1.5 transition-colors"
                >
                  <span>DoT Chakshu Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#d0d4dd]/60" />
                </a>
              </li>
              <li>
                <a
                  href="https://sachet.rbi.org.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#38bdf8] inline-flex items-center gap-1.5 py-1.5 transition-colors"
                >
                  <span>RBI Sachet Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#d0d4dd]/60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.cert-in.org.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#38bdf8] inline-flex items-center gap-1.5 py-1.5 transition-colors"
                >
                  <span>CERT-In National Advisory</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#d0d4dd]/60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Citizen Emergency Helpline */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d0d4dd]">
              Citizen Emergency
            </h4>
            <div className="p-4 rounded-xl bg-[#202530] border border-[#2e3544]">
              <span className="text-xs font-bold text-[#f87171] uppercase tracking-wider block">
                National Helpline (24x7)
              </span>
              <a
                href="tel:1930"
                className="mt-1 flex items-center gap-2 font-display font-black text-2xl text-[#fcfcfd] hover:text-[#38bdf8] transition-colors"
              >
                <PhoneCall className="w-5 h-5 text-[#f87171]" />
                <span>1930</span>
              </a>
              <span className="text-xs text-[#d0d4dd] block mt-1 leading-snug">
                Toll-free national cyber financial fraud line
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#2b303b] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[#d0d4dd]">
          <p>© 2026 ScamShield Bharat • राष्ट्रीय नागरिक साइबर रक्षा पहल</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF9933]" />
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="w-2 h-2 rounded-full bg-[#138808]" />
            <span>{t.builtForBharat}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
