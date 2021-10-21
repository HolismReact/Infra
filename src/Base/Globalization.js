const Globalization = {
    translations: [],
    setTranslations: (translations) => {
        Globalization.translations = translations;
    },
    t: (text) => {
        if (Globalization.translations.hasOwnProperty(text)) {
            return Globalization.translations[text];
        }
        return text;
    }
}

export default Globalization;