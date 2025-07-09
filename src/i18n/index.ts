import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/i18n/en.json';
import ja from '@/i18n/ja.json';
import vi from '@/i18n/vi.json';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: { translation: en },
            ja: { translation: ja },
            vi: { translation: vi },
        },
        lng: 'en', // default language
        fallbackLng: 'en',

        interpolation: {
            escapeValue: false, // react already does escaping
        }
    });

export default i18n;