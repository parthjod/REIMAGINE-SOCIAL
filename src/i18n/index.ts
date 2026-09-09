// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';

const savedLang =
  typeof window !== 'undefined' && typeof localStorage !== 'undefined'
    ? (localStorage.getItem('reimagine-social-lang') ??
      localStorage.getItem('paypause-lang') ??
      'en')
    : 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
  },
  lng: savedLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
