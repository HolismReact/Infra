var EventEmitter = require('eventemitter3');
const eventEmitter = new EventEmitter();

const Holism = {
    isSomething: value => {
        return !Holism.isNothing(value);
    },
    isNothing: value => {
        return value === undefined || value === null || (/^\s*$/g.test(value));
    },
    on: (event, fn) => eventEmitter.on(event, fn),
    off: (event, fn) => eventEmitter.off(event, fn),
    emit: (event, payload) => eventEmitter.emit(event, payload),
    removeListener: (event, fn) => eventEmitter.removeListener(event, fn),
    listeners: (event) => eventEmitter.listeners(event),
    eventEmitter: eventEmitter,
    formSubmissionEvent: 'holism_form_submission_requested',
    randomId: () => {
        return Math.random().toString(36).replace(/[^a-z]+/g, '');
    },
    addFieldToFormContext: (field, formContext, isValid) => {
        if (!field) {
            return;
        }
        const [fields, setFields] = formContext.fields;
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].field === field) {
                return;
            }
        }
        setFields([{
            field: field,
            state: '',
            isValid: isValid
        }, ...fields]);
    }
};

export default Holism;