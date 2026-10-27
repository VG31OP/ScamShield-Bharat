'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Globe,
  Sparkles,
  LifeBuoy,
  ClipboardPaste,
  Trash2,
  ShieldAlert,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { Language, ScamAnalysisResult } from '@/lib/engine/types';
import { analyzeContent } from '@/lib/engine/scamDetector';
import { TRANSLATIONS } from '@/lib/i18n/translations';

import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { ResultDashboard } from '@/components/ResultDashboard';
import { UrlSafetyChecker } from '@/components/UrlSafetyChecker';
import { ExampleScenarios } from '@/components/ExampleScenarios';
import { ActionCenter } from '@/components/ActionCenter';
import { Footer } from '@/components/Footer';
import { LanguageSelectionModal } from '@/components/LanguageSelectionModal';

export default function Home() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'message' | 'url' | 'examples' | 'actionCenter'>('message');

  // Input & Result State: Start completely empty (Zero pre-loaded fake data)
  const [inputText, setInputText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<ScamAnalysisResult | null>(null);

  // Per-Session Language Selection Modal State
  const [showLangModal, setShowLangModal] = useState<boolean>(false);

  const t = TRANSLATIONS[currentLang];

  useEffect(() => {
    // Check if the user has already selected a language for THIS browser session
    try {
      const sessionChosen = sessionStorage.getItem('scamshield_session_lang_selected');
      const savedLang = localStorage.getItem('scamshield_lang') as Language;

      queueMicrotask(() => {
        if (!sessionChosen) {
          setShowLangModal(true);
        }
        if (savedLang && ['en', 'hi', 'gu', 'bn', 'mr', 'te', 'ta', 'kn'].includes(savedLang)) {
          setCurrentLang(savedLang);
        }
      });
    } catch {
      // Storage unavailable (e.g. strict private browsing or disabled cookies)
    }
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem('scamshield_lang', lang);
    } catch {
      // Storage write restricted
    }
  };

  const handleSelectModalLanguage = (lang: Language) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem('scamshield_lang', lang);
      sessionStorage.setItem('scamshield_session_lang_selected', 'true');
    } catch {
      // Storage write restricted
    }
    setShowLangModal(false);
  };

  const handleAnalyze = (contentToAnalyze?: string) => {
    const text = (contentToAnalyze !== undefined ? contentToAnalyze : inputText).trim();
    if (!text) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeContent(text);
      setAnalysisResult(result);
      setIsAnalyzing(false);

      // Scroll smoothly to results card
      setTimeout(() => {
        const resultsEl = document.getElementById('results-card');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }, 120);
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
        handleAnalyze(text);
      }
    } catch {
      // Clipboard permissions denied
    }
  };

  const handleClear = () => {
    setInputText('');
    setAnalysisResult(null);
  };

  const handleLoadExample = (exampleText: string) => {
    setInputText(exampleText);
    setActiveTab('message');
    handleAnalyze(exampleText);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd] text-[#16191f]">
      {/* Top Accessible Navbar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
      />

      <main className="flex-1">
        {/* Simple, reassuring Hero Banner */}
        <HeroBanner
          currentLang={currentLang}
          onSelectTab={(tab) => {
            setActiveTab(tab);
          }}
        />

        {/* Main Content Area */}
        <div id="checker-section" className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
          {/* Main Citizen Tabs: Simple, uncluttered, high contrast with touch scroll snap */}
          <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white border border-[#dde0e6] shadow-xs overflow-x-auto no-scrollbar touch-scroll snap-x scroll-smooth">
            <button
              type="button"
              onClick={() => setActiveTab('message')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer min-h-[44px] snap-start active:scale-[0.98] ${
                activeTab === 'message'
                  ? 'bg-[#074ce0] text-white shadow-xs'
                  : 'text-[#454c58] hover:text-[#16191f] hover:bg-[#f3f4f6]'
              }`}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>{t.tabMessage}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer min-h-[44px] snap-start active:scale-[0.98] ${
                activeTab === 'url'
                  ? 'bg-[#074ce0] text-white shadow-xs'
                  : 'text-[#454c58] hover:text-[#16191f] hover:bg-[#f3f4f6]'
              }`}
            >
              <Globe className="w-4 h-4 shrink-0" />
              <span>{t.tabUrl}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('actionCenter')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer min-h-[44px] snap-start active:scale-[0.98] ${
                activeTab === 'actionCenter'
                  ? 'bg-[#074ce0] text-white shadow-xs'
                  : 'text-[#454c58] hover:text-[#16191f] hover:bg-[#f3f4f6]'
              }`}
            >
              <LifeBuoy className="w-4 h-4 shrink-0" />
              <span>{t.tabActionCenter}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('examples')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer min-h-[44px] snap-start active:scale-[0.98] ${
                activeTab === 'examples'
                  ? 'bg-[#074ce0] text-white shadow-xs'
                  : 'text-[#454c58] hover:text-[#16191f] hover:bg-[#f3f4f6]'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{t.tabExamples}</span>
            </button>
          </div>

          {/* TAB 1: MESSAGE CHECKER */}
          {activeTab === 'message' && (
            <div className="mt-6 sm:mt-8 space-y-6">
              <div className="p-4 sm:p-8 rounded-2xl bg-white border border-[#dde0e6] shadow-sm space-y-4">
                {/* Header & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label
                    htmlFor="message-input"
                    className="font-display font-bold text-base sm:text-lg text-[#16191f] flex items-center gap-2"
                  >
                    <ShieldAlert className="w-5 h-5 text-[#074ce0] shrink-0" />
                    <span>{t.inputLabel}</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePasteFromClipboard}
                      className="px-3.5 py-2 min-h-[40px] rounded-xl text-xs sm:text-sm font-semibold bg-[#f3f4f6] hover:bg-[#e5e7eb] active:scale-95 text-[#16191f] flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <ClipboardPaste className="w-4 h-4 text-[#454c58]" />
                      <span>{t.btnPaste}</span>
                    </button>

                    {inputText && (
                      <button
                        type="button"
                        onClick={handleClear}
                        className="px-3 py-2 min-h-[40px] text-xs sm:text-sm font-semibold rounded-xl text-[#d92d20] hover:bg-[#fef3f2] active:scale-95 flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>{t.btnClear}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Example showing what user can paste */}
                <div className="p-3 rounded-xl bg-[#fcfcfd] border border-[#dde0e6] text-xs text-[#454c58] leading-relaxed">
                  {t.messageExampleHint}
                </div>

                {/* Popular Indian Scam Examples Quick Strip */}
                <div className="space-y-1.5 pt-0.5">
                  <div className="flex items-center justify-between text-xs text-[#454c58]">
                    <span className="font-bold flex items-center gap-1.5 text-[#16191f]">
                      <span className="w-2 h-2 rounded-full bg-[#FF9933]" />
                      <span>प्रमुख भारतीय साइबर धोखाधड़ी (Tap to test):</span>
                    </span>
                    <span className="text-xs text-[#074ce0] hidden sm:inline font-semibold">क्लिक करके तुरंत जांचें</span>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar touch-scroll py-1">
                    <button
                      type="button"
                      onClick={() => handleLoadExample(
                        'Dear Consumer, your electricity power will be disconnected tonight at 9:30 PM from the electricity office due to unpaid bill. Call our electricity officer immediately at 9876543210.'
                      )}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-xl text-xs font-semibold bg-[#fff7ed] hover:bg-[#ffedd5] active:scale-95 text-[#c2410c] border border-[#fed7aa] shrink-0 transition-all cursor-pointer"
                    >
                      <span>⚡ बिजली बिल कटने का SMS</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLoadExample(
                        'Dear SBI Customer, your YONO NetBanking account has been suspended due to pending KYC verification. Update your PAN immediately at https://bit.ly/sbi-pan-kyc-update to avoid account deactivation.'
                      )}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-xl text-xs font-semibold bg-[#eff6ff] hover:bg-[#dbeafe] active:scale-95 text-[#1e40af] border border-[#bfdbfe] shrink-0 transition-all cursor-pointer"
                    >
                      <span>🏦 SBI बैंक KYC ब्लॉक</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLoadExample(
                        'This is DCP Crime Branch Mumbai. You are placed under digital arrest for money laundering in Jet Airways case. Stay on WhatsApp video call until verification is completed.'
                      )}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-xl text-xs font-semibold bg-[#fef2f2] hover:bg-[#fee2e2] active:scale-95 text-[#b91c1c] border border-[#fecaca] shrink-0 transition-all cursor-pointer"
                    >
                      <span>🚨 डिजिटल अरेस्ट (Digital Arrest)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLoadExample(
                        'India Post: Your package IN8291482 could not be delivered due to incomplete house address. Update address within 12 hours at https://indiapost-parcel-tracking.top to avoid return.'
                      )}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-xl text-xs font-semibold bg-[#f0fdf4] hover:bg-[#dcfce7] active:scale-95 text-[#166534] border border-[#bbf7d0] shrink-0 transition-all cursor-pointer"
                    >
                      <span>📦 स्पीड पोस्ट पार्सल डिलीवरी</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLoadExample(
                        'Congratulations! Your mobile number has won ₹25,00,000 in KBC Jio Lucky Draw 2026. Contact Rana Pratap on WhatsApp at 9988776655 to claim prize after ₹1,200 fee.'
                      )}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-xl text-xs font-semibold bg-[#faf5ff] hover:bg-[#f3e8ff] active:scale-95 text-[#6b21a8] border border-[#e9d5ff] shrink-0 transition-all cursor-pointer"
                    >
                      <span>💰 KBC ₹25 लाख लॉटरी</span>
                    </button>
                  </div>
                </div>

                {/* Textarea: 16px font-size to prevent unwanted mobile zoom */}
                <div className="relative">
                  <textarea
                    id="message-input"
                    rows={6}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={t.inputPlaceholder}
                    className="w-full p-3.5 sm:p-4 rounded-xl border border-[#dde0e6] bg-[#ffffff] text-[#16191f] text-base focus:outline-none focus:ring-2 focus:ring-[#074ce0] font-sans leading-relaxed resize-y"
                  />
                  {inputText.length > 0 && (
                    <div className="absolute right-3 bottom-3 text-xs font-mono text-[#454c58] bg-[#f3f4f6] px-2 py-0.5 rounded border border-[#dde0e6]">
                      {inputText.length} {t.charCount}
                    </div>
                  )}
                </div>

                {/* Phone Helper Tip */}
                <div className="text-xs text-[#454c58] leading-relaxed bg-[#f3f4f6] p-3 rounded-xl border border-[#dde0e6]">
                  {t.mobileCopyPasteTip}
                </div>

                {/* Privacy and Zero-Secrets Warning */}
                <div className="text-xs text-[#067647] bg-[#ecfdf3] p-3 rounded-xl border border-[#a6f4c5] leading-relaxed">
                  {t.privacyBoxNotice}
                </div>

                {/* Primary Analyze Action Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleAnalyze()}
                    disabled={!inputText.trim() || isAnalyzing}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-xl bg-[#074ce0] hover:bg-[#0536a0] active:scale-[0.98] disabled:opacity-50 text-white font-bold text-base shadow-md shadow-[#074ce0]/20 transition-all cursor-pointer min-h-[50px]"
                  >
                    <Shield className="w-5 h-5" />
                    <span>{isAnalyzing ? t.analyzing : t.btnAnalyze}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Assessment Report Dashboard (Shows only after analysis) */}
              {analysisResult && (
                <ResultDashboard result={analysisResult} currentLang={currentLang} />
              )}
            </div>
          )}

          {/* TAB 2: WEBSITE LINK CHECKER */}
          {activeTab === 'url' && (
            <div className="mt-8 space-y-6">
              <UrlSafetyChecker
                currentLang={currentLang}
                onAnalyzeUrlText={(url) => {
                  setInputText(url);
                  handleAnalyze(url);
                }}
              />
              {analysisResult && (
                <ResultDashboard result={analysisResult} currentLang={currentLang} />
              )}
            </div>
          )}

          {/* TAB 3: EMERGENCY HELP & 1930 */}
          {activeTab === 'actionCenter' && (
            <div className="mt-8">
              <ActionCenter currentLang={currentLang} />
            </div>
          )}

          {/* TAB 4: TRY AN EXAMPLE (TEST CASES) */}
          {activeTab === 'examples' && (
            <div className="mt-8">
              <ExampleScenarios
                currentLang={currentLang}
                onSelectExample={handleLoadExample}
              />
            </div>
          )}
        </div>
      </main>

      {/* Honest, Helpful Footer */}
      <Footer currentLang={currentLang} />

      {/* Per-Session Language Selection Modal Prompt */}
      <LanguageSelectionModal
        isOpen={showLangModal}
        onSelectLanguage={handleSelectModalLanguage}
      />
    </div>
  );
}
