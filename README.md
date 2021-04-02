# DLV

JavaScript library for dynamic linking videos.

### Usage

```javascript
const _defaultSwap: Function = () => {};
DLV(videoElement: HTMLVideoElement, newSrc: String, seconds: Number, attributes: Object = {}, onEnded: Function = () => {}, defaultSwap: Function = _defaultSwap) -> void;
```

The `DLV` function takes a video element and, internally, binds a `ontimeupdate` event listener to the element. When `seconds` have passed, the function replaces the given `videoElement` on the DOM with a new one - which source is the given `newSrc`.<br>
It's also possible to pass in an `attributes` dictionary with attributes that will be bound to the created video element.<br>
Finally, when the new video ends, the function calls the given `onEnded` method - an passes in the (given) `videoElement`, the (created) `newVideoElement`, the `timeUpdateListener` function and `endEventListener` (function called when the `newVideoElement` ended) - in case the programmer wants to `removeEventListeners` from the new and old videos.

That's basically it. The repository also includes a `test` folder where I've done some tests with included copyright-free videos (on the `test/videos` folder).

### ToDo

* Add option to interrupt `newVideoElement`'s video before it's over;
* Fix `removeEventListener` on `onEnded` function call bug;