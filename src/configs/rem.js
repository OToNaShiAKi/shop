((doc, win) => {
    const docEl = doc.documentElement;
    const resize = 'orientationchange' in win ? 'orientationchange' : 'resize';
    const resalc = () => {
        let clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 15 * (clientWidth / 320) + 'px';
    }
    if (!doc.addEventListener) return
    win.addEventListener(resize, resalc, false);
    doc.addEventListener('DOMContentLoaded', resalc, false);
})(document, window);

// 基本不做响应式这个就没有用