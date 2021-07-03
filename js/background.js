const chromeBg = {
    init() {
        this.eventInit();
    },

    eventInit() {
        this.getMsgFromContent();
    },

    getMsgFromContent() {
        chrome.runtime.onMessage.addListener((request, sender, callback) => {
            console.log('From Content-script.js: ', request, callback);
            new AreaCapture(request, callback);
            return true;
        })
    },

    sendMsgToContent(msg) {
        chrome.tabs.query({active: true, currentWindow: true}, (tab) => {
            tab[0] && chrome.tabs.sendMessage(tab[0].id, msg)
        })
    }
};


function AreaCapture(v, callback) {

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.vw = v.width;
    this.vh = v.height;
    this.cw = v.clientWidth;
    this.ch = v.clientHeight;
    this.offsetX = v.x;
    this.offsetY = v.y;
    this.tabId = 0;
    this.screenData = '';
    this.captureImgData = '';
    this.callback = callback;

    this.init();
}

AreaCapture.prototype = {
    constructor: AreaCapture,
    init() {
        this.getTabId();
        this.initWH();
    },
    getTabId() {
        chrome.tabs.getSelected((tab) => {
            this.tabId = tab.id;
            this.captureWebPage();
        })
    },
    initWH() {
        this.canvas.width = this.cw;
        this.canvas.height = this.ch;
    },
    // core api
    captureWebPage() {
        chrome.tabs.captureVisibleTab({format: 'png', quality: 100}, data => {
            this.screenData = data;
            this.drawImage();
        })
    },

    drawImage() {
        let img = new Image();
        img.src = this.screenData;

        img.onload = () => {
            this.ctx.drawImage(img, this.offsetX, this.offsetY, this.vw, this.vh, 0, 0, this.cw, this.ch);
            this.getImage();
        };
    },

    getImage() {
        this.captureImgData = this.canvas.toDataURL('image/png');
        this.callback(this.captureImgData);
    }
};

chromeBg.init();
