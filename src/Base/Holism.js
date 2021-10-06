var EventEmitter = require('eventemitter3');
const eventEmitter = new EventEmitter();

const Holism = {
    isSomething: value => {
        return !Holism.isNothing(value);
    },
    isNothing: value => {
        return value === undefined || value === null || (/^\s*$/g.test(value));
    },
    randomId: () => {
        return Math.random().toString(36).replace(/[^a-z]+/g, '');
    },
    addItemToSelectedItems: (listContext, id) => {
        if (!id) {
            return;
        }
        const { selectedItems, setSelectedItems } = listContext;
        if (selectedItems.indexOf(id) > -1) {
            return;
        }
        setSelectedItems((previousSelectedItems) => {
            return [id, ...selectedItems];
        });
    },
    removeItemFromSelectedItems: (listContext, id) => {
        if (!id) {
            return;
        }
        const { selectedItems, setSelectedItems } = listContext;
        if (selectedItems.indexOf(id) === -1) {
            return;
        }
        setSelectedItems((previousSelectedItems) => {
            selectedItems.splice(selectedItems.indexOf(id), 1);
            return [...selectedItems];
        });
    },
    addFieldToFormContext: (formContext, id, value, isValid) => {
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
    setField: (formContext, id, value, isValid) => {
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
    ensure: (items) => {
        for (let i = 0; i < items.length; i++) {
            if (!items[i]) {
                throw new Error(`Required parameter is not specified`);
            }
        }
    },
    breakpoints: {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        xxl: 1536
    },
    goTo: (url) => {
        //history.push(url);
    }
};

export default Holism;
export { Holism };