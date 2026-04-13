'use client';

import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';
import type { Translations } from './translations';

type Language = 'en' | 'zh';

interface I18nContextType {
  lang: Language;
  t: Translations;
  setLang: (lang: Language) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LANG_KEY = 'superpowers-lang';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY) as Language | null;
    if (saved && (saved === 'en' || saved === 'zh')) {
      setLangState(saved);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('zh')) {
        setLangState('zh');
      }
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem(LANG_KEY, newLang);
  };

  const t = translations[lang];

  return React.createElement(
    I18nContext.Provider,
    { value: { lang, t, setLang } },
    children
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
