import i18n from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

// const availableLanguages = ['en', 'gr', 'el'];
i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    debug: false,
    // whitelist: availableLanguages,
    initImmediate: false,
    // resources: {
    //   en: {
    //     dashboard: endashboard,
    //   },
    //   gr: {
    //     dashboard: grdashboard,
    //   },
    // },
    nonExplicitWhitelist: true,
    // backend: {
    //   loadPath:
    //     'https://mtuates.northeurope.cloudapp.azure.com/moneygate-core/api/v1-core/locale/file/{{lng}}/{{ns}}',
    //   // '/src/App/Views/common/locales/{{lng}}/{{ns}}.json', // '/locales/{{lng}}/{{ns}}.json',
    //   crossDomain: true,
    // },
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
      // useSuspense: false,
      bindI18n: 'languageChanged loaded',
    },
    returnObjects: true,
  });

export default i18n;
