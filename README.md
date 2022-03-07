# screenshot-crx

### Description:

This is a Chrome Extension for developers, which realizes the screenshot of page designated area.

### Use:

It is very simple to use, just call the API in the crx, and pass the size of the specified area element and its position relative to the viewport.

```
chromeInject.sendMsgToContent({
    cmd: 'screenshot', value: getPageSize()
});

getPageSize() {
    const rect = document.getElementById('eleId').getBoundingClientRect();
    return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height
    };
}

```

### Principle:

The crx calls the API to get the complete view in Chrome, then cuts and draws it on the canvas according to the coordinate parameters.

```

chrome.tabs.captureVisibleTab({format: 'png', quality: 100}, data => {
    drawImage(data);
})


drawImage(data) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let img = new Image();
    img.src = this.screenData;
    img.onload = () => {
        ctx.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
    };
}

```

### Demo:

Here is a Vue project using this crx, see more: https://github.com/liduo-d/vue-screenshot
