const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 


const formElement = document.querySelector('.form_type_edit');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_job');
const nameProfile = document.querySelector('.profile__info-title');
const jobProfile = document.querySelector('.profile__info-subtitle');

const photoCards = document.querySelector('.place-grid__list');
const ListItemTemplate = document.querySelector('.place-grid-template').content.querySelector('.place-grid__list-item');
const addCardForm = document.querySelector('.form_type_add-card');
const addCardTitleInput = addCardForm.querySelector('.form__input_type_place');
const addCardImgInput = addCardForm.querySelector('.form__input_type_link');

const editPopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_add-card');
const zoomCardPopup = document.querySelector('.popup_type_zoom-card');

const openEditPopupBtn = document.querySelector('.profile__edit-button');
const openAddCardPopupBtn = document.querySelector('.profile__add-button');

const closeEditPopupBtn = editPopup.querySelector('.popup__close-btn');
const closeAddCardPopupBtn = addCardPopup.querySelector('.popup__close-btn');
const closeZoomCardPopupBtn = zoomCardPopup.querySelector('.popup__close-btn');

const zoomImage = zoomCardPopup.querySelector('.popup__image');
const zoomImageCaption = zoomCardPopup.querySelector('.popup__caption');

function changeData (event) {
    event.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    togglePopup(editPopup);
};

function createCard (str) {
  const listItem = ListItemTemplate.cloneNode(true);
  const listItemTitle = listItem.querySelector('.place-grid__title');
  const listItemPhoto = listItem.querySelector('.place-grid__item');
  listItemTitle.textContent = str.name;
  listItemPhoto.src = str.link;

  const delButton = listItem.querySelector('.place-grid__delete');
  delButton.addEventListener('click', e =>  listItem.remove());
  const likeButton = listItem.querySelector('.place-grid__like');
  likeButton.addEventListener('click', () => {
  likeButton.classList.toggle('place-grid__like-liked')
  });
  const zoomPhoto = zoomCardPopup.querySelector('.popup__image');
  const zoomPhotoCaption = zoomCardPopup.querySelector('.popup__caption');

  listItemPhoto.addEventListener('click', function(){
    zoomPhoto.src = str.link;
    zoomPhotoCaption.textContent = str.name;
    togglePopup(zoomCardPopup);
  })
  
  photoCards.prepend(listItem);
};

function togglePopup (popup) {
  popup.classList.toggle('popup_visible');
};

const addCardFormSubmitHandler = e => {
    e.preventDefault();
    const inputTitleValue = addCardTitleInput.value;
    const inputImgValue = addCardImgInput.value; 
    createCard ({name: inputTitleValue, link: inputImgValue});
    togglePopup(addCardPopup);
};

initialCards.forEach(createCard);
addCardForm.addEventListener('submit', addCardFormSubmitHandler);
formElement.addEventListener('submit', changeData);
openEditPopupBtn.addEventListener('click', () => togglePopup(editPopup));
openAddCardPopupBtn.addEventListener('click', () => togglePopup(addCardPopup));
closeEditPopupBtn.addEventListener('click', () => togglePopup(editPopup));
closeAddCardPopupBtn.addEventListener('click', () => togglePopup(addCardPopup));
closeZoomCardPopupBtn.addEventListener('click', () => togglePopup(zoomCardPopup));