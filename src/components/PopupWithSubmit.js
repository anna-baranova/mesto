import Popup from './Popup.js';

class PopupWithSubmit extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
    }

    setEventListeners() {

    }

}

export default PopupWithSubmit;