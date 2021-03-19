let popup = document.querySelector('.popup');
let openPopupBtn = document.querySelector('.profile__edit-button');
let closePopupBtn = document.querySelector('.popup__close-btn');
let saveFormButton = document.querySelector('.form__save-btn')
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.form__input_type_name');
let jobInput = document.querySelector('.form__input_type_job');
let nameProfile = document.querySelector('.profile__info-title');
let jobProfile = document.querySelector('.profile__info-subtitle');

function openPopup () {
   popup.classList.add ('popup_visible');
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

function closePopup () {
    popup.classList.remove('popup_visible');
}

function changeData (event) {
    event.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup();
}

openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', changeData);