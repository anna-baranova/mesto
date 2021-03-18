// открытие-закрытие popup

let popup = document.querySelector('.popup');
let openPopupBtn = document.querySelector('.profile__edit-button');
let closePopupBtn = document.querySelector('.form__close-btn');
let popupOverlay = document.querySelector('.popup__overlay')

function openPopup () {
   popup.classList.add ('popup_visible');
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

function closePopup () {
    popup.classList.remove('popup_visible');
}

openPopupBtn.addEventListener('click', function() {openPopup(); });
closePopupBtn.addEventListener('click', function() {closePopup(); });
popupOverlay.addEventListener('click', function() {closePopup(); });

// изменение данных профиля

let saveFormButton = document.querySelector('.form__save-btn')
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__input-name');
let jobInput = document.querySelector('.form__input-job');
let nameProfile = document.querySelector('.profile__info-title');
let jobProfile = document.querySelector('.profile__info-subtitle');

function changeData (event) {
    event.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
}

formElement.addEventListener('submit', changeData);

saveFormButton.addEventListener('click', function() {closePopup(); });