const Globalization = {
    translations: [],
    t: (text) => {
        if (Globalization.translations.hasOwnProperty(text))
        {
            return Globalization.translations[text];
        }
        return text;
    }
}

export default Globalization;