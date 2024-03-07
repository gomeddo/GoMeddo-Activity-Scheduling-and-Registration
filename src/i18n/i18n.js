import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en";
import de from "./translations/de";
import nl from "./translations/nl";

i18n.use(initReactI18next).init({
    // Define resources with translations for different languages
    resources: {
        en: {
            translation: en,
        },
        de: {
            translation: de,
        },
        nl: {
            translation: nl,
        },
    },
    lng: "en", // Set default language to English
    fallbackLng: "en", // Fallback language in case translation is missing
    interpolation: {
        escapeValue: false, // Prevent escaping of HTML entities
    },
});

export default i18n;
