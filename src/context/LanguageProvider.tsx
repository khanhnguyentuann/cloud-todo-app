import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export default function App() {
    const { i18n, t } = useTranslation();

    useEffect(() => {
        const savedLang = localStorage.getItem("language");
        if (savedLang && ["en", "ja", "vi"].includes(savedLang)) {
            i18n.changeLanguage(savedLang);
        }
    }, [i18n]);

    const setLanguage = (lang: "en" | "ja" | "vi") => {
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
    };

    return (
        <div>
            <button onClick={() => setLanguage('en')}>EN</button>
            <button onClick={() => setLanguage('ja')}>JA</button>
            <button onClick={() => setLanguage('vi')}>VI</button>

            <h1>{t('header.appName')}</h1>
            <p>{t('sidebar.myDay')}</p>
        </div>
    );
}
