import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import {addCardForm, editProfileForm, openEditPopupBtn, openAddCardPopupBtn, nameInput, jobInput, initialCards, config} from './utils.js'

//открытие фото по клику - 8
function handleCardClick(text, link) {
  popupWithImage.open(text, link);
}  

//экземпляр класса Section - 8
const cardList = new Section ({
  items: initialCards,
  renderer: (data) => {
    const card = new Card (data, '.place-grid-template', handleCardClick);
    const cardElement = card.getCard();
    cardList.addItem(cardElement);
  }
}, '.place-grid__list')

//вставляем карточки на страницу - 8
cardList.renderCards();

//экземпляры валидации
const addCardValidator = new FormValidator (config, addCardForm);
const editProfileValidator = new FormValidator (config, editProfileForm);

//проверка валидации форм
addCardValidator.enableValidation();
editProfileValidator.enableValidation();

//экземпляр класса UserInfo - 8
const userInfo = new UserInfo({userNameSelector: '.profile__info-title', userJobSelector: '.profile__info-subtitle'});

//меняем данные пользователя на странице - 8
const editPopupSubmitHandler = (data) => {
  userInfo.setUserInfo(data['input-name'], data['input-job']);
  editPopup.close();
}

//экземпляры класса PopupWithForm - 8
const addCardPopup = new PopupWithForm ('.popup_type_add-card', addCardPopupSubmitHandler);
const editPopup = new PopupWithForm ('.popup_type_edit', editPopupSubmitHandler);

//добавляем обработчики закрытия и сабмита формам - 8
addCardPopup.setEventListeners();
editPopup.setEventListeners();

//открытие попапа профиля со значениями со страницы - 8
openEditPopupBtn.addEventListener('click', () => {
  editPopup.open(); 
  const defaultInfo = userInfo.getUserInfo();
  nameInput.value = defaultInfo.name;
  jobInput.value = defaultInfo.job;
});

//отрытие попапа добаления карточки - 8
openAddCardPopupBtn.addEventListener('click', () => addCardPopup.open());

//создаем экземпляр класса PopupWithImage и подписываемся на клики - 8
const popupWithImage = new PopupWithImage('.popup_type_zoom-card')
popupWithImage.setEventListeners();

//обработчик сабмита добавления карточки - 8
function addCardPopupSubmitHandler(data) {
  console.log(data)
  const newData = { text: data['input-place'], link: data['input-link']}
  const newCard = new Card (newData, '.place-grid-template', handleCardClick);
  cardList.addItem(newCard.getCard());
  addCardPopup.close();
  addCardValidator.deactivateButton();
}