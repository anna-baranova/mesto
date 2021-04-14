const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_visible');
}

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.textContent = '';
    errorElement.classList.remove('form__input-error_visible');
}

const checkInputValidity = (formElement, inputElement) => {
    const isInputElementValid = inputElement.validity.valid;

    if (!isInputElementValid) {
        const errorMessage = inputElement.validationMessage;
        showInputError(formElement, inputElement, errorMessage)
    } else {
        hideInputError(formElement, inputElement)
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
  }; 
  
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add('form__save-btn_disabled');
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove('form__save-btn_disabled');
    }
}

const setEventListeners = (formElement) => {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    })

    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__save-btn')

    toggleButtonState(inputList, buttonElement);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', (evt) => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
        })
    })
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach(setEventListeners);
};

enableValidation();
