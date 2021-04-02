const _defaultSwap = (newVideo, oldVideo) => {
    if (!(newVideo in document.body))
        document.body.append(newVideo)

    oldVideo.controls = false;
    oldVideo.pause();
    oldVideo.setAttribute('hidden', '');

    newVideo.playbackRate = oldVideo.playbackRate;
    newVideo.muted = oldVideo.muted;
    newVideo.controls = false;
    newVideo.play();
    newVideo.removeAttribute('hidden');
    newVideo.controls = true;
}

function DLV(videoElement, newSrc, seconds, attributes = {}, onEnded = () => { }, defaultSwap = _defaultSwap) {
    /*
        `videoElement` must be an `HTMLVideoElement`
        `newSrc` must be `string` or array of strings
        `seconds` must be a number
        `attributes` must be an object (dict)
    */
    if (!(videoElement instanceof HTMLVideoElement))
        throw new TypeError(`\`videoElement\` must be instance of \`HTMLVideoElement\`, got ${typeof videoElement}`);
    if (typeof newSrc !== 'string' || (Array.isArray(newSrc) && newSrc.some(val => typeof val !== 'string')))
        throw new TypeError(`\`newSrc\` must be a string or array of strings, got ${typeof newSrc}`);
    else if (typeof newSrc === 'string')
        newSrc = [newSrc];
    if (typeof seconds !== 'number')
        throw new TypeError(`\`seconds\` must be an integer, got ${typeof seconds}`);
    if (attributes.constructor !== Object)
        throw new TypeError(`\`attributes\` must be a dict, got ${typeof attributes}`);


    const newVideoElement = document.createElement('video');
    const swap = (newVideo, oldVideo, ended = false) => {
        defaultSwap(newVideo, oldVideo);



        onEnded(videoElement, newVideoElement, timeUpdatepdateListener, endEventListener);
    };
    const timeUpdatepdateListener = () => {
        const time = Math.floor(videoElement.currentTime);

        if (time === seconds) {
            swap(newVideoElement, videoElement);
            videoElement.currentTime = Math.ceil(videoElement.currentTime);
        }
    };
    const endEventListener = swap.bind(this, videoElement, newVideoElement, true);

    // Setting given attributes on `newVideoElement`
    Object.entries(attributes).forEach(([key, val]) => {
        if (typeof key !== 'string')
        throw new TypeError(`\`newVideo\` attribute keys must be strings, got ${typeof key}`);
        
        newVideoElement.setAttribute(key, val);
    });
    
    // Formatting the given source's
    newSrc = newSrc.reduce((_, curr) => `<source src="${curr}">`, '');
    newVideoElement.innerHTML = newSrc;
    newVideoElement.controls = true;

    // Adding EL's
    videoElement.addEventListener('timeupdate', timeUpdatepdateListener);
    newVideoElement.addEventListener('ended', endEventListener);
};

window.addEventListener('load', () => {
    DLV(document.querySelector('video'), 'videos/ForBiggerEscapes.mp4', 5);
    DLV(document.querySelector('video'), 'videos/ForBiggerFun.mp4', 10);
});