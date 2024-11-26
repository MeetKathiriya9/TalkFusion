// // src/i18n.js
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import { getFirestore, doc, getDoc } from 'firebase/firestore';
// import { app } from './firebase';

// const db = getFirestore(app);

// const loadTranslations = async (language) => {
//   const docRef = doc(db, 'translations', language);
//   const docSnap = await getDoc(docRef);
  
//   if (docSnap.exists()) {
//     const translations = docSnap.data();
//     i18n.addResourceBundle(language, 'translation', translations);
//   } else {
//     console.error(`No translations found for language: ${language}`);
//   }
// };

// i18n
//   .use(initReactI18next)
//   .init({
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false, // React already safes from xss
//     },
//     resources: {
//       en: {
//         translation: {
//           // Default English translations can be added here
//           'Translate Text': 'Translate Text',
//           'Enter text to translate': 'Enter text to translate',
//           'Translate': 'Translate',
//           'Translated Text': 'Translated Text',
//         },
//       },
//     },
//   });

// export { i18n, loadTranslations };
