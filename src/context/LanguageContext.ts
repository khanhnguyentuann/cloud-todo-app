import { createContext } from "react";
import type { Language, Translations } from "@/utils/translations";

export interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
    getCurrentDate: () => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);
