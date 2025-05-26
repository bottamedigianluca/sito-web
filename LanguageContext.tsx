import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { translations, Locale, Translations } from '../translations';

interface LanguageContextType {
  language: Locale;
  setLanguage: (language: Locale) => void;
  t: (key: string, defaultValue?: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Locale>('it'); // Default to Italian

  useEffect(() => {
    const storedLang = localStorage.getItem('bottamedi_lang') as Locale | null;
    if (storedLang && (storedLang === 'it' || storedLang === 'de')) {
      setLanguageState(storedLang);
      document.documentElement.lang = storedLang;
    } else {
      document.documentElement.lang = 'it'; // Default if nothing stored
    }
  }, []);

  const setLanguage = (lang: Locale) => {
    setLanguageState(lang);
    localStorage.setItem('bottamedi_lang', lang);
    document.documentElement.lang = lang;
  };

  const t = useCallback((key: string, defaultValue?: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let result: string | Translations | undefined = translations[language];

    for (const k of keys) {
      if (typeof result === 'object' && result !== null && k in result) {
        result = (result as Translations)[k];
      } else {
        result = undefined;
        break;
      }
    }
    
    let finalResult = typeof result === 'string' ? result : defaultValue || key;

    if (params && typeof finalResult === 'string') {
        Object.keys(params).forEach(paramKey => {
            finalResult = (finalResult as string).replace(new RegExp(`{{${paramKey}}}`, 'g'), String(params[paramKey]));
        });
    }

    return finalResult as string;
  }, [language]); // Added `language` to dependency array

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
