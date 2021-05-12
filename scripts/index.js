import FormValidator from './FormValidator.js';
import Card from './Card.js';
import {closePopup, openPopup, zoomCardPopup} from './utils.js';

//селекторы для валидации
const config = {  
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
}

//формы добавления карточки и редактирования профиля
const addCardForm = document.querySelector('.form_type_add-card');
const editProfileForm = document.querySelector('.form_type_edit');

//экземпляры валидации
const addCardValidator = new FormValidator (config, addCardForm);
const editProfileValidator = new FormValidator (config, editProfileForm);

//проверка валидации форм
addCardValidator.enableValidation();
editProfileValidator.enableValidation();

const initialCards = [
  {
    text: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    text: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    text: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    text: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    text: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    text: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_job');
const nameProfile = document.querySelector('.profile__info-title');
const jobProfile = document.querySelector('.profile__info-subtitle');

const photoCards = document.querySelector('.place-grid__list');
const listItemTemplate = document.querySelector('.place-grid-template').content.querySelector('.place-grid__list-item');

const addCardTitleInput = addCardForm.querySelector('.form__input_type_place');
const addCardImgInput = addCardForm.querySelector('.form__input_type_link');

//модалки
const editPopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_add-card');


//оверлеи
const editPopupOverlay = editPopup.querySelector('.popup__overlay');
const addCardOverlay = addCardPopup.querySelector('.popup__overlay');
const zoomCardPopupOverlay = zoomCardPopup.querySelector('.popup__overlay');

//кнопки открытия
const openEditPopupBtn = document.querySelector('.profile__edit-button');
const openAddCardPopupBtn = document.querySelector('.profile__add-button');

//кнопки закрытия
const closeEditPopupBtn = editPopup.querySelector('.popup__close-btn');
const closeAddCardPopupBtn = addCardPopup.querySelector('.popup__close-btn');
const closeZoomCardPopupBtn = zoomCardPopup.querySelector('.popup__close-btn');

//кнопка сохранения формы добавления карточки

const addCardFormSubmitButton = addCardForm.querySelector('.form__save-btn')


function reset(form){
  form.reset();
}

function changeData (event) {
    event.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(editPopup);
 
};


function openEditPopup() {
  openPopup(editPopup);
  nameInput.value = nameProfile.textContent; 
  jobInput.value = jobProfile.textContent;
}

function createCard (data) {
  const card = new Card (data, '.place-grid-template');
  return card.getCard();
};

function addCard (data) {
  photoCards.prepend(createCard(data));
}

initialCards.forEach (addCard);

const addCardFormSubmitHandler = event => {
    event.preventDefault();
    const inputTitleValue = addCardTitleInput.value;
    const inputImgValue = addCardImgInput.value; 
    addCard({text: inputTitleValue, link: inputImgValue});
    closePopup(addCardPopup);
    reset(addCardForm);
    addCardValidator.deactivateButton();
};

addCardForm.addEventListener('submit', addCardFormSubmitHandler);
editProfileForm.addEventListener('submit', changeData);

openEditPopupBtn.addEventListener('click', () => openEditPopup(editPopup));
openAddCardPopupBtn.addEventListener('click', () => openPopup(addCardPopup));
closeEditPopupBtn.addEventListener('click', () => closePopup(editPopup));
closeAddCardPopupBtn.addEventListener('click', () => closePopup(addCardPopup));
closeZoomCardPopupBtn.addEventListener('click', () => closePopup(zoomCardPopup));

editPopupOverlay.addEventListener('click', () => closePopup(editPopup));
addCardOverlay.addEventListener('click', () => closePopup(addCardPopup));
zoomCardPopupOverlay.addEventListener('click', () => closePopup(zoomCardPopup));