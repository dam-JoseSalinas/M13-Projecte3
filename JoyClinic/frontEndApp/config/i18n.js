import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { NativeModules, Platform } from 'react-native';
import 'intl-pluralrules'; // Importa el polyfill
import enTranslations from '.././locales/en/translation.json'
import esTranslations from '.././locales/es/translation.json'
import caTranslations from '.././locales/ca/translation.json'

if (!Intl.PluralRules) {
    require('intl-pluralrules');
  }

// Traducciones
const resources = {
    "en": {
      "translation": enTranslations
    },
    "es": {
      "translation": esTranslations
    },
    "ca": {
      "translation": caTranslations
    }
  };

// Detectar el idioma del dispositivo
const deviceLanguage =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13+
    : NativeModules.I18nManager.localeIdentifier;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: deviceLanguage.split('_')[0], // Obtén solo el código del idioma (es, en, etc.)
    fallbackLng: 'ca',
    interpolation: {
      escapeValue: false // React ya escapa los valores por defecto
    }
  });

export default i18n;
