class FormValidator {
    constructor (config, form) {
        this._config = config;
        this._form = form;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._config.errorClass);
    }

    _checkInputValidity(inputElement) {
        const isInputElementValid = inputElement.validity.valid;

        if (!isInputElementValid) {
            const errorMessage = inputElement.validationMessage;
            this._showInputError(inputElement, errorMessage)
        } else {
            this._hideInputError(inputElement)
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.setAttribute('disabled', true);
            buttonElement.classList.add(this._config.inactiveButtonClass);
        } else {
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove(this._config.inactiveButtonClass);
        }
    }

    _setEventListeners() {
        this._form.addEventListener('submit', evt => evt.preventDefault());
    
        const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        const buttonElement = this._form.querySelector(this._config.submitButtonSelector)
    
        this._toggleButtonState(inputList, buttonElement);
    
        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', (evt) => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState(inputList, buttonElement);
            })
        })
    }

    deactivateButton(buttonElement, inactiveButtonClass) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(inactiveButtonClass);
    };

    enableValidation() {
        this._setEventListeners();
    }

}

export default FormValidator;