const chromeInject = {
    init() {
        this.getMsgFromContent();
    },

    sendMsgToContent(msg) {
        console.log('From Vue Page:  ', msg);
        window.postMessage(msg, '*')
    },

    getMsgFromContent() {
        window.addEventListener('message', e => {
            if (e.data && e.data.cmd === 'cb') {
                console.log('From Content.js: ', e.data);
                const event = new CustomEvent('screenshot', {
                    detail: e.data
                });
                window.dispatchEvent(event)
            }
        }, false)
    }
};

chromeInject.init();
