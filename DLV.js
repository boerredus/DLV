function DLV(videoElement, newSrc, seconds, attributes = [], onEnded = () => {}) {
    if (!(videoElement instanceof HTMLVideoElement))
        throw new TypeError(`\`videoElement\` must be instance of \`HTMLVideoElement\`, got ${typeof videoElement}`);
    if (typeof newSrc !== 'string' || (Array.isArray(newSrc) && newSrc.some(val => typeof val !== 'string')))
        throw new TypeError(`\`newSrc\` must be a string or array of strings, got ${typeof newSrc}`);
    else if (typeof newSrc === 'string')
        newSrc = [newSrc];
    if (typeof seconds !== 'number')
        throw new TypeError(`\`seconds\` must be an integer, got ${typeof seconds}`);
    if (Array.isArray(attributes) && attributes.some(val => val.constructor !== Object))
        throw new TypeError(`\`attributes\` must be an array of objects, got ${typeof attributes}`);

    return new Promise((res, rej) => {
        try {
            const swap = (newVideo, oldVideo, endend = false) => {
                if(!(newVideo in document.body))
                    document.body.append(newVideo)

                oldVideo.controls = false;
                oldVideo.pause();
                oldVideo.setAttribute('hidden', '');

                newVideo.playbackRate = oldVideo.playbackRate;
                newVideo.volume = oldVideo.volume;
                newVideo.controls = false;
                newVideo.play();
                newVideo.removeAttribute('hidden');
                newVideo.controls = true;

                if(endend) {
                    onEnded();
                    res();
                }
            }

            let newVideoElement = document.createElement('video');
            newVideoElement.controls = true;
            
            attributes.forEach(attr => {
                const [[key, val]] = Object.entries(attr);
                if (typeof key !== 'string')
                    throw new TypeError(`\`newVideo\` attribute keys must be strings, got ${typeof key}`);

                newVideoElement.setAttribute(key, val);
            });

            newSrc = newSrc.reduce((acc, curr) => acc += `<source src="${curr}">`, '');
            newVideoElement.innerHTML = newSrc;

            videoElement.addEventListener('timeupdate', () => {
                const time = Math.floor(videoElement.currentTime);

                if(time === seconds) {
                    swap(newVideoElement, videoElement);
                    videoElement.currentTime = Math.ceil(videoElement.currentTime);
                }
            });

            newVideoElement.addEventListener('ended', swap.bind(this, videoElement, newVideoElement, true));
        } catch (e) {
            rej(e);
        }
    });
}

window.addEventListener('load', () => {
    DLV(document.querySelector('video'), 'videos/ElephantsDream.mp4', 5).then(console.log.bind(this, 'ended elephantsdream'));
    DLV(document.querySelector('video'), 'videos/ForBiggerBlazes.mp4', 10).then(console.log.bind(this, 'ended forbiggerblazes'));
});