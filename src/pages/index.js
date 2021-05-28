import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js'
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {addCardFormPopup,       
        editProfileFormPopup, 
        avatarFormPopup, 
        confirmDeletePopup, 
        addCardForm, 
        editProfileForm, 
        avatarForm, 
        openEditPopupBtn, 
        openAddCardPopupBtn, 
        avatarImage, 
        nameInput, 
        jobInput, 
        config} from '../utils/utils.js';


//-------ЭКЗЕМПЛЯРЫ КЛАССОВ------

// экземпляр Api - 9
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  token: 'c7246450-eb40-44a5-8abb-048e9d2f61cc'
})

//экземпляры валидации форм
const addCardValidator = new FormValidator(config, addCardForm);
const editProfileValidator = new FormValidator(config, editProfileForm);
const avatarFormValidator = new FormValidator(config, avatarForm);

//экземпляры попапов
const editPopup = new PopupWithForm('.popup_type_edit', editPopupSubmitHandler);
const avatarPopup = new PopupWithForm('.popup_type_avatar', avatarPopupSubmitHandler);
const confirmDeleteCard = new PopupWithConfirm('.popup_type_confirm-delete');
const addCardPopup = new PopupWithForm('.popup_type_add-card', addCardPopupSubmitHandler);

//экземпляр класса увеличения фото
const popupWithImage = new PopupWithImage('.popup_type_zoom-card', '.popup__caption', '.popup__image')

//экземпляр класса UserInfo
const userInfo = new UserInfo({ 
  userNameSelector: '.profile__info-title', 
  userJobSelector: '.profile__info-subtitle', 
  userAvatarSelector: '.profile__image'});

//экземпляр класса Section
const cardList = new Section ({
  
  renderer: (item) => {
    createCard(item)
  }
}, '.place-grid__list'
);

//--------ФУНКЦИИ---------

//открытие фото по клику
function handleCardClick(text, link) {
  popupWithImage.open(text, link);
}

//изменение надписи на кнопке во время сохранения
function isLoading (loading, popup) {
  if (loading) {
    popup.querySelector('.form__save-btn').textContent = 'Сохранение...';
  } else {
    if (popup.classList.contains('popup_type_add-card')) {
      popup.querySelector('.form__save-btn').textContent = "Cоздать"
    } 
    else if (popup.classList.contains('popup_type_confirm-delete')) {
      popup.querySelector('.form__save-btn').textContent = "Да"
    }
    else {
      popup.querySelector('.form__save-btn').textContent = "Cохранить"
    }
  }
}

//изменение данных пользователя на странице
function editPopupSubmitHandler(data) {
  isLoading(true, editProfileFormPopup)
  api.changeUserData(data)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about, res.avatar)
      editPopup.close();
    })
    .catch(e => console.log(`Ошибка при получении данных пользователя: ${e}`))
    .finally(() => {
      isLoading(false, editProfileFormPopup)
    })
}

//изменение аватара
function avatarPopupSubmitHandler(data) {
  isLoading(true, avatarFormPopup)
  api.changeAvatar(data)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar)
      avatarPopup.close();
    })
    .catch(e => console.log(`Ошибка при загрузке аватара: ${e}`))
    .finally(() => {
      isLoading(false, avatarFormPopup)
    })
}

//удаление карточки
function handleDeleteCardClick(card) {
  function deleteCardHandler() {
    isLoading(true, confirmDeletePopup)
    api.removeCard(card.getId())
      .then(res => {
        confirmDeleteCard.close()
        card.handleDeleteCard()
      })
      .catch(e => console.log(`Ошибка при удалении карточки: ${e}`))
      .finally(() => {
        isLoading(false, confirmDeletePopup)
      })
  }
  confirmDeleteCard.setNewSubmitHandler(deleteCardHandler)
  confirmDeleteCard.open()
}

//постановка/удаление лайка
function handleLikeIconClick(card) {
  if (card.isLiked) {
    api.unlikeCard(card.getId())
    .then((res) => {
      card.setLikes(res);
    })
    .catch(e => console.log(`Ошибка при удалении лайка: ${e}`))
  } else {
    api.likeCard(card.getId())
    .then((res) => {
      card.setLikes(res);
    })
    .catch(e => console.log(`Ошибка при клике лайка: ${e}`))
  }
}

//новая карточка
function createCard (data) {
  const card = new Card(data, '.place-grid-template', handleCardClick, userInfo.getUserId(), handleDeleteCardClick, handleLikeIconClick)
  const cardElement = card.getCard();
  cardList.addItem(cardElement);
};

//добавление карточки на страницу через форму
function addCardPopupSubmitHandler(data) {
  isLoading(true, addCardFormPopup)
  api.createCard(data)
    .then(res => {
      //создание карточки
      createCard (res)
      //закрытие попапа
      addCardPopup.close();
    })
    .catch(e => console.log(`Ошибка при клике лайка: ${e}`))
    .finally(() => {
      isLoading(false, addCardFormPopup)
    })
}


// ------МЕТОДЫ КЛАССОВ-------

//проверка валидации форм
addCardValidator.enableValidation();
editProfileValidator.enableValidation();
avatarFormValidator.enableValidation();

//обработчики закрытия и сабмита форм
popupWithImage.setEventListeners();
avatarPopup.setEventListeners();
editPopup.setEventListeners();
confirmDeleteCard.setEventListeners()
addCardPopup.setEventListeners();

//получение начальных данных пользователя и карточек с сервера
api.getFullData()
  .then(([userData, cardsData]) => {
    //данные пользователя
    userInfo.setUserInfo(userData.name, userData.about, userData.avatar, userData._id)
    //дефолтные карточки
    cardList.renderCards(cardsData);

  })
  .catch(e => console.log(`Ошибка при полуении карточек: ${e}`))

//--------СЛУШАТЕЛИ---------

//отрытие попапа добаления карточки
openAddCardPopupBtn.addEventListener('click', () => {
  addCardPopup.open();
  addCardValidator.resetValidation();
});

// открытие попапа профиля со значениями со страницы
openEditPopupBtn.addEventListener('click', () => {
  editPopup.open();
  const defaultInfo = userInfo.getUserInfo();
  nameInput.value = defaultInfo.name;
  jobInput.value = defaultInfo.job;
  editProfileValidator.resetValidation();
});

//открытие попапа редактирования аватара
avatarImage.addEventListener('click', () => {
  avatarPopup.open();
  avatarFormValidator.resetValidation();
})

