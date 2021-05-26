import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import Api from '../components/Api.js';
import {addCardForm, editProfileForm, avatarForm, openEditPopupBtn, openAddCardPopupBtn, avatarImage, nameInput, jobInput, initialCards, config} from '../utils/utils.js';
import './index.css';




//-------ЭКЗЕМПЛЯРЫ КЛАССОВ------

// экземпляр Api - 9
const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  token: 'c7246450-eb40-44a5-8abb-048e9d2f61cc'
})

//экземпляры валидации форм - 8
const addCardValidator = new FormValidator (config, addCardForm);
const editProfileValidator = new FormValidator (config, editProfileForm);
const avatarFormValidator = new FormValidator(config, avatarForm);

//экземпляры попапов - 8
const addCardPopup = new PopupWithForm ('.popup_type_add-card', addCardPopupSubmitHandler);
const editPopup = new PopupWithForm ('.popup_type_edit', editPopupSubmitHandler);
const avatarPopup = new PopupWithForm('.popup_type_avatar', avatarPopupSubmitHandler)

//экземпляр класса UserInfo - 8
const userInfo = new UserInfo({userNameSelector: '.profile__info-title', userJobSelector: '.profile__info-subtitle', userAvatarSelector: '.profile__image'});
userInfo.setUserInfo()

//экземпляр класса PopupWithSubmit - 9
// const confirmDeleteCard = new PopupWithSubmit ('.popup_type_confirm_delete', confirmDeleteCardHandler);

//создаем экземпляр класса PopupWithImage  - 8
const popupWithImage = new PopupWithImage('.popup_type_zoom-card')


//--------ФУНКЦИИ---------

//открытие фото по клику - 8
function handleCardClick(text, link) {
  popupWithImage.open(text, link);
}

//меняем данные пользователя на странице - 8
const editPopupSubmitHandler = (data) => {
  userInfo.setUserInfo(data['input-name'], data['input-job']);
  api.changeUserData(data)
  .then((data) => {
    // console.log(data)
  })  
  editPopup.close();
}

//изменение аватара - 9
function avatarPopupSubmitHandler(data) {  
  avatarImage.src = data['input-avatar']
  api.changeAvatar()
    .then((res) => {
      console.log(res)
    })
    .catch(e => console.log(`Ошибка при загрузке аватара: ${e}`))
  avatarPopup.close();
}

//обработчик сабмита добавления карточки - 8
function addCardPopupSubmitHandler(data) {
  const newData = { text: data['input-place'], link: data['input-link']}
  const newCard = new Card (newData, '.place-grid-template', handleCardClick);
  cardList.addItem(newCard.getCard());
  addCardPopup.close();
}


// ------МЕТОДЫ КЛАССОВ-------

//проверка валидации форм - 8
addCardValidator.enableValidation();
editProfileValidator.enableValidation();
avatarFormValidator.enableValidation();


//добавляем обработчики закрытия и сабмита формам - 8
addCardPopup.setEventListeners();
editPopup.setEventListeners();
popupWithImage.setEventListeners();
avatarPopup.setEventListeners();

//получаем данные пользователя с сервера - 9
api.getUserData()
  .then((res)=>{
    // console.log(res)
    const userName = document.querySelector('.profile__info-title');
    const userJob = document.querySelector('.profile__info-subtitle');
    const userAvatar = document.querySelector('.profile__image');
    userName.textContent = res.name;
    userJob.textContent = res.about;
    userAvatar.src = res.avatar;
  })
  .catch(e => console.log(`Ошибка при полуении данных пользователя: ${e}`))

//получаем карточки с сервера - 9
api.getCards()
  .then((res)=>{
    console.log(res)
    const cardList = new Section ({
      items: res,
      renderer: (item) => {
        const card = new Card (item, '.place-grid-template', handleCardClick);
        const cardElement = card.getCard();
        cardList.addItem(cardElement);
      }
    }, '.place-grid__list')
    cardList.renderCards();
  })
  .catch(e => console.log(`Ошибка при полуении карточек: ${e}`))


//--------СЛУШАТЕЛИ---------

// открытие попапа профиля со значениями со страницы - 8
openEditPopupBtn.addEventListener('click', () => {
  editPopup.open(); 
  const defaultInfo = userInfo.getUserInfo();
  nameInput.value = defaultInfo.name;
  jobInput.value = defaultInfo.job;
  editProfileValidator.resetValidation();
});

//открытие попапа редактирования аватара - 9
avatarImage.addEventListener('click', () => {
  avatarPopup.open();
  avatarFormValidator.resetValidation();
})

//отрытие попапа добаления карточки - 8
openAddCardPopupBtn.addEventListener('click', () => {
  addCardPopup.open();
  addCardValidator.resetValidation();
});