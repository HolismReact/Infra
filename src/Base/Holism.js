var EventEmitter = require('eventemitter3');
const eventEmitter = new EventEmitter();

const Holism = {
    isSomething: value => {
        return !isNothing(value);
    },
    isNothing: value => {
        return value === undefined || value === null || (/^\s*$/g.test(value));
    },
    on: (event, fn) => eventEmitter.on(event, fn),
    off: (event, fn) => eventEmitter.off(event, fn),
    emit: (event, payload) => eventEmitter.emit(event, payload),
    eventEmitter: eventEmitter,
    formSubmissionEvent: 'holism_form_submission_requested',
    randomId: () => {
        return Math.random().toString(36).replace(/[^a-z]+/g, '');
    }
};

export default Holism;