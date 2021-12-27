let fieldsCache;

const Form = {
    addFieldToFormContext: (formContext, id, value, isValid) => {
        if (!formContext) {
            return;
        }
        if (!id) {
            return;
        }
        const { fields, setFields } = formContext;
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].id === id) {
                return;
            }
        }
        setFields((previousFields) => {
            return [{
                id: id,
                value: value,
                isValid: isValid
            }, ...previousFields]
        });
    },
    setFieldsCache: (fields) => {
        fieldsCache = fields;
    },
    getFields: () => {
        return fieldsCache;
    },
    setField: (formContext, id, value, isValid) => {
        if (!formContext) {
            return;
        }
        const { setFields } = formContext;
        setFields((previousFields) => {
            for (var i = 0; i < previousFields.length; i++) {
                if (previousFields[i].id === id) {
                    previousFields[i].value = value;
                    previousFields[i].isValid = isValid;
                }
            }
            return [...previousFields];
        });
    },
    formMode: {
        creation: 1,
        edition: 2
    },
}

export default Form;