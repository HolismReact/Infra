import app from "./App";

const Globalization = {
    translations: [],
    setTranslations: (translations) => {
        Globalization.translations = translations;
    },
    getTranslations: () => {
        return Globalization.translations;
    },
    t: (text) => {
        if (!text) {
            return text;
        }
        if (Globalization.translations.hasOwnProperty(text)) {
            return Globalization.translations[text];
        }
        return text;
    },
    locale: {},
    setLocale: (locale) => {
        Globalization.locale = locale;
    },
    getLocale: () => {
        return Globalization.locale;
    },
    isRtl: () => {
        return Globalization.locale.isRtl;
    }
}

export default Globalization;