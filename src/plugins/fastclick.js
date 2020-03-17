import FastCLick from 'fastclick'
if ('addEventListener' in document)
    document.addEventListener('DOMContentLoad', () => {
        FastCLick.attach(document.body);
    }, false);