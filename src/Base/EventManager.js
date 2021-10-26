
var EventEmitter = require('eventemitter3');
const eventEmitter = new EventEmitter();

const EventManager = {
    on: (event, fn) => eventEmitter.on(event, fn),
    off: (event, fn) => eventEmitter.off(event, fn),
    emit: (event, payload) => eventEmitter.emit(event, payload),
    removeListener: (event, fn) => eventEmitter.removeListener(event, fn),
    listeners: (event) => eventEmitter.listeners(event),
    eventEmitter: eventEmitter,
    formSubmissionEvent: 'holism_form_submission_requested',
    componentLoaded: 'component_loaded',
    accountUpdated: 'account_updated',
    itemCreated: 'item_created',
    showMessage: 'show_message',
    reloadRequested: 'reload_requested',
    resetFilters: 'reset_filters',
    makeRoom: 'make_room',
    returnBackToNormalForm: 'return_back_to_normal_form',
    editRequested: 'edit_requested',
    entitySelected: 'entity_slected',
};
export default EventManager;