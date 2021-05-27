import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {addCardFormPopup, editProfileFormPopup, avatarFormPopup, confirmDeletePopup, addCardForm, editProfileForm, avatarForm, openEditPopupBtn, openAddCardPopupBtn, avatarImage, nameInput, jobInput, config} from '../utils/utils.js';
import './index.css';



//-------ЭКЗЕМПЛЯРЫ КЛАССОВ------

// экземпляр Api - 9
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  token: 'c7246450-eb40-44a5-8abb-048e9d2f61cc'
})

//экземпляры валидации форм - 8
const addCardValidator = new FormValidator(config, addCardForm);
const editProfileValidator = new FormValidator(config, editProfileForm);
const avatarFormValidator = new FormValidator(config, avatarForm);

//экземпляры попапов - 8
const editPopup = new PopupWithForm('.popup_type_edit', editPopupSubmitHandler);
const avatarPopup = new PopupWithForm('.popup_type_avatar', avatarPopupSubmitHandler);

//экземпляр класса увеличения фото
const popupWithImage = new PopupWithImage('.popup_type_zoom-card')

//экземпляр класса UserInfo - 8
const userInfo = new UserInfo({ 
  userNameSelector: '.profile__info-title', 
  userJobSelector: '.profile__info-subtitle', 
  userAvatarSelector: '.profile__image'});


//--------ФУНКЦИИ---------

//открытие фото по клику - 8
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
  const confirmDeleteCard = new PopupWithForm('.popup_type_confirm-delete', deleteCardHandler);
  confirmDeleteCard.setEventListeners()
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


// ------МЕТОДЫ КЛАССОВ-------

//проверка валидации форм
addCardValidator.enableValidation();
editProfileValidator.enableValidation();
avatarFormValidator.enableValidation();

//обработчики закрытия и сабмита форм
popupWithImage.setEventListeners();
avatarPopup.setEventListeners();
editPopup.setEventListeners();
avatarPopup.setEventListeners();

//получение начальных данных пользователя и карточек с сервера
api.getFullData()
  .then(([userData, cardsData]) => {
    const currentUserId = userData._id
    userInfo.setUserInfo(userData.name, userData.about, userData.avatar)

    const cardList = new Section({
      items: cardsData,
      renderer: (item) => {
        const card = new Card(item, '.place-grid-template', handleCardClick, currentUserId, handleDeleteCardClick, handleLikeIconClick);
        const cardElement = card.getCard();
        cardList.addItem(cardElement);
      }
    }, '.place-grid__list')
    cardList.renderCards();


    //обработчик сабмита добавления карточки
    function addCardPopupSubmitHandler(data) {
      isLoading(true, addCardFormPopup)
      api.createCard(data)
        .then(res => {
          const newCard = new Card(res, '.place-grid-template',handleCardClick, currentUserId, handleDeleteCardClick, handleLikeIconClick);
          cardList.addItem(newCard.getCard());
          addCardPopup.close();
        })
        .catch(e => console.log(`Ошибка при клике лайка: ${e}`))
        .finally(() => {
          isLoading(false, addCardFormPopup)
        })
    }

    const addCardPopup = new PopupWithForm('.popup_type_add-card', addCardPopupSubmitHandler);
    addCardPopup.setEventListeners();

    //отрытие попапа добаления карточки - 8
    openAddCardPopupBtn.addEventListener('click', () => {
      addCardPopup.open();
      addCardValidator.resetValidation();
    });

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

