import Popup from './Popup.js';

class PopupWithConfirm extends Popup {

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler();
    });
  }

  setNewSubmitHandler(newSubmitHandler) {
    this._submitHandler = newSubmitHandler;
  }
}
export default PopupWithConfirm;