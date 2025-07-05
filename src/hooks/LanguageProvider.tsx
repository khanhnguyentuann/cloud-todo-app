import { useState, useEffect, type ReactNode } from "react";
import { translations } from "@/utils/translations";
import type { Language } from "@/utils/translations";
import { LanguageContext } from "./LanguageContext";

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en");

    useEffect(() => {
        const savedLanguage = localStorage.getItem("language") as Language;
        if (savedLanguage && ["en", "ja", "vi"].includes(savedLanguage)) {
            setLanguageState(savedLanguage);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("language", lang);
    };

    const getCurrentDate = () => {
        const today = new Date();
        const dayNames = [
            translations[language].sunday,
            translations[language].monday,
            translations[language].tuesday,
            translations[language].wednesday,
            translations[language].thursday,
            translations[language].friday,
            translations[language].saturday,
        ];
        const monthNames = [
            translations[language].january,
            translations[language].february,
            translations[language].march,
            translations[language].april,
            translations[language].may,
            translations[language].june,
            translations[language].july,
            translations[language].august,
            translations[language].september,
            translations[language].october,
            translations[language].november,
            translations[language].december,
        ];
        const dayName = dayNames[today.getDay()];
        const monthName = monthNames[today.getMonth()];
        const dayNumber = today.getDate();

        return `${dayName}, ${monthName} ${dayNumber}`;
    };

    return (
        <LanguageContext.Provider
            value={{ language, setLanguage, t: translations[language], getCurrentDate }}
        >
            {children}
        </LanguageContext.Provider>
    );
}
