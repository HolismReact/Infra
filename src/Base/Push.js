const Push = {
    configPusher: () => {
        window.Pusher.logToConsole = true;

        var pusher = new window.Pusher(process.env.REACT_APP_PUSHER_KEY, {
            cluster: process.env.REACT_APP_PUSHER_CLUSTER
        });
        window.pusher = pusher;
    }
}

export default Push;