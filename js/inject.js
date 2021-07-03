const chromeInject = {
    sendMsgToContent(msg) {
        console.log('From Vue Page:  ', msg);
        window.postMessage(msg, '*')
    }
};
