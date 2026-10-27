'use client';

import React from 'react';
import Image from 'next/image';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  variant?: 'icon' | 'full';
  theme?: 'light' | 'dark';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = false,
  variant = 'icon',
  theme = 'light',
  className = '',
}) => {
  const sizeMap = {
    sm: { box: 'w-8 h-8', px: 32, text: 'text-base', sub: 'text-xs' },
    md: { box: 'w-10 h-10 sm:w-11 sm:h-11', px: 44, text: 'text-xl', sub: 'text-xs' },
    lg: { box: 'w-14 h-14 sm:w-16 sm:h-16', px: 64, text: 'text-2xl', sub: 'text-xs' },
    xl: { box: 'w-20 h-20 sm:w-24 sm:h-24', px: 96, text: 'text-3xl', sub: 'text-sm' },
    '2xl': { box: 'w-32 h-32 sm:w-40 sm:h-40', px: 160, text: 'text-4xl', sub: 'text-base' },
  };

  const dim = sizeMap[size];

  // If user requested full lockup image
  if (variant === 'full') {
    return (
      <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
        <Image
          src="/logo.png"
          alt="ScamShield Bharat Logo - Detect the Scam. Protect India."
          width={dim.px * 3}
          height={dim.px * 3}
          className="object-contain w-auto h-auto max-h-48 drop-shadow-md"
          priority
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* User's Exact Shield Emblem Cutout */}
      <div className={`relative ${dim.box} shrink-0 drop-shadow-sm flex items-center justify-center`}>
        <Image
          src="/logo-icon.png"
          alt="ScamShield Bharat Shield Logo"
          width={dim.px}
          height={dim.px}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      {/* Optional Integrated Text Lockup with User's Official Slogan */}
      {showText && (
        <div className="flex flex-col select-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-display font-black tracking-tight leading-none ${dim.text} ${
                theme === 'dark' ? 'text-white' : 'text-[#16191f]'
              }`}
            >
              Scam<span className="text-[#074ce0]">Shield</span> <span className="text-[#046A38]">Bharat</span>
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded-full font-bold bg-[#fff7ed] text-[#c2410c] border border-[#ffedd5]">
              🇮🇳
            </span>
          </div>
          <span
            className={`font-sans font-medium tracking-normal mt-0.5 ${dim.sub} ${
              theme === 'dark' ? 'text-[#d0d4dd]' : 'text-[#454c58]'
            }`}
          >
            Detect the Scam. Protect India.
          </span>
        </div>
      )}
    </div>
  );
};
