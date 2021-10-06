const Messaging = {
    success: (message, action) => {
        Holism.message(message, action, 'success');
    },
    info: (message, action) => {
        Holism.message(message, action, 'info');
    },
    warning: (message, action) => {
        Holism.message(message, action, 'warning');
    },
    error: (message, action) => {
        Holism.message(message, action, 'error');
    },
    message: (message, action, type) => {
        if (message && message.message) {
            message = message.message;
        }
        Holism.emit(Holism.showMessage, { message: message, action: action, type: type });
    }
}

export default Messaging;