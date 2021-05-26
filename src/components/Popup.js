class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_visible');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_visible');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (event) => {
        if (event.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.querySelector('.popup__close-btn').addEventListener('click', () => {
            this.close();
        })
        this._popup.querySelector('.popup__overlay').addEventListener('click', () => {
            this.close();
        })

    }
}

export default Popup;