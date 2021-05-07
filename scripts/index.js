import FormValidator from './FormValidator.js';
import Card from './Card.js';
import {closePopup, closeByEscape, openPopup, zoomCardPopup, zoomPhoto, zoomPhotoCaption} from './utils.js';

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

//перенесли в utils.js
//const zoomCardPopup = document.querySelector('.popup_type_zoom-card');
// const zoomPhoto = zoomCardPopup.querySelector('.popup__image');
// const zoomPhotoCaption = zoomCardPopup.querySelector('.popup__caption');

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


function changeData (event) {
    event.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(editPopup);
};


//перенесли в Card.js
// const handleDeleteCard = (evt) => {
//   evt.target.closest('.place-grid__list-item').remove();
// };

// const handleLikeButton = (evt) => {
//   evt.target.classList.toggle('place-grid__like-liked')
// };

// const handleZoomPhoto = (str) => {
//   zoomPhoto.src = str.link;
//   zoomPhoto.alt = str.name;
//   zoomPhotoCaption.textContent = str.name;
//   openPopup(zoomCardPopup);
// }



// function createCard (str) {
//   const listItem = listItemTemplate.cloneNode(true);
//   const listItemTitle = listItem.querySelector('.place-grid__title');
//   const listItemPhoto = listItem.querySelector('.place-grid__item');
//   listItemTitle.textContent = str.name;
//   listItemPhoto.src = str.link;
//   listItemPhoto.alt = str.name;

//   const delButton = listItem.querySelector('.place-grid__delete');
//   const likeButton = listItem.querySelector('.place-grid__like');

//   delButton.addEventListener('click', handleDeleteCard);
//   likeButton.addEventListener('click', handleLikeButton);
//   listItemPhoto.addEventListener('click', () => handleZoomPhoto(str));

//   return listItem;
// };

function addCard (data) {
  const card = new Card (data, '.place-grid-template');
  photoCards.prepend(card.getCard());
};

initialCards.forEach (addCard);

//перенесли в utils.js
// function openPopup (popup) {
//   popup.classList.add('popup_visible');
//   document.addEventListener('keydown', closeByEscape);
// };

// function closePopup (popup) {
//   popup.classList.remove('popup_visible');
//   document.removeEventListener('keydown', closeByEscape);
// };

// function closeByEscape (event) {
//   if (event.key === "Escape") {
//     const openedPupup = document.querySelector('.popup_visible');
//     closePopup(openedPupup);
//   }
// };

const addCardFormSubmitHandler = e => {
    e.preventDefault();
    const inputTitleValue = addCardTitleInput.value;
    const inputImgValue = addCardImgInput.value; 
    addCard({text: inputTitleValue, link: inputImgValue});
    closePopup(addCardPopup)
};

addCardForm.addEventListener('submit', addCardFormSubmitHandler);
editProfileForm.addEventListener('submit', changeData);

openEditPopupBtn.addEventListener('click', () => openPopup(editPopup));
openAddCardPopupBtn.addEventListener('click', () => openPopup(addCardPopup));
closeEditPopupBtn.addEventListener('click', () => closePopup(editPopup));
closeAddCardPopupBtn.addEventListener('click', () => closePopup(addCardPopup));
closeZoomCardPopupBtn.addEventListener('click', () => closePopup(zoomCardPopup));

editPopupOverlay.addEventListener('click', () => closePopup(editPopup));
addCardOverlay.addEventListener('click', () => closePopup(addCardPopup));
zoomCardPopupOverlay.addEventListener('click', () => closePopup(zoomCardPopup));