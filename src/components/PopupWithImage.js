import Popup from './Popup.js';

class PopupWithImage extends Popup {
    constructor(popupSelector, photoCaptionSelector, zoomImageSelector) {
        super(popupSelector);
        this._photoCaptionSelector = photoCaptionSelector;
        this._zoomImageSelector = zoomImageSelector;
    }
    open(text, link) {
        this._popup.querySelector(this._photoCaptionSelector).textContent = text;
        this._popup.querySelector(this._zoomImageSelector).src = link;
        this._popup.querySelector(this._zoomImageSelector).alt = text;
        super.open();
    }
}

export default PopupWithImage;