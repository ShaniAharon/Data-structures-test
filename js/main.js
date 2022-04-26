
var secs = 0;

setInterval(() => {
    secs++;
    document.querySelector('h5 span').innerHTML = secs;
}, 1000)

