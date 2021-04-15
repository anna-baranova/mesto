const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
}

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
}

const checkInputValidity = (formElement, inputElement) => {
    const isInputElementValid = inputElement.validity.valid;

    if (!isInputElementValid) {
        const errorMessage = inputElement.validationMessage;
        showInputError(formElement, inputElement, errorMessage, config)
    } else {
        hideInputError(formElement, inputElement, config)
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
  }; 
  
const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
}

const setEventListeners = (formElement) => {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    })

    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector)

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', (evt) => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement, config);
        })
    })
};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach(setEventListeners);
};

const config = {  
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-btn',
    inactiveButtonClass: '.form__save-btn_disabled',
    inputErrorClass: '.form__input_type_error',
    errorClass: '.form__input-error_visible'
}

enableValidation(config); 
