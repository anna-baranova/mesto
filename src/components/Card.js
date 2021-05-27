class Card {
    constructor({name, link, owner, _id, likes}, cardTemplateSelector, handleCardClick, currentUSerId, handleDeleteCardClick, handleLikeIconClick) {
        this._text = name;
        this._link = link;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardClick;
        this._cardOwnerID = owner._id
        this._currentUSerId = currentUSerId
        this._cardId = _id
        this._likes = likes
        this._handleDeleteCardClick = handleDeleteCardClick
        this._handleLikeIconClick = handleLikeIconClick
    }

    setLikes(newCardInfo) {
        if(newCardInfo) {
            this._likes = newCardInfo.likes
        }
        const likesCount = this._likes.length
        this._listItem.querySelector('.place-grid__like-count').textContent = likesCount

        //проверяем есть ли твой лайк на карточке
        this.isLiked = this._likes.find(person => person._id === this._currentUSerId)
            if(this.isLiked) {
                 this._likeIcon.classList.add('place-grid__like-liked')
          } else {
            this._likeIcon.classList.remove('place-grid__like-liked') 
          }
    }

    getId() {
        return this._cardId
    }

    handleDeleteCard () {
        this._listItem.remove();
        this._listItem = null;
    }

    _handleLikeButton(evt) {
        evt.target.classList.toggle('place-grid__like-liked')
    }

    _setEventListeners() {
        const likeButton = this._listItem.querySelector('.place-grid__like-btn');
        const delButton = this._listItem.querySelector('.place-grid__delete');
        const listItemPhoto = this._listItem.querySelector('.place-grid__item');

        delButton.addEventListener('click', () => this._handleDeleteCardClick(this));
        likeButton.addEventListener('click', () => this._handleLikeIconClick(this));
        listItemPhoto.addEventListener('click', () => {
            this._handleCardClick(this._text, this._link)
          });
    }

    getCard() {
        const listItemTemplate = document.querySelector(this._cardTemplateSelector)
            .content.querySelector('.place-grid__list-item');
        this._listItem = listItemTemplate.cloneNode(true);
        const listItemTitle = this._listItem.querySelector('.place-grid__title');
        const listItemPhoto = this._listItem.querySelector('.place-grid__item');
        this._likeIcon = this._listItem.querySelector('.place-grid__like-btn');

        listItemTitle.textContent = this._text;
        listItemPhoto.src = this._link;
        listItemPhoto.alt = this._text;

        this.setLikes()

        //если ты владелец карточки, показать иконку удаления
        if(this._cardOwnerID === this._currentUSerId) {
            this._listItem.querySelector('.place-grid__delete').classList.remove('place-grid__delete_hidden')
        }
        
        this._setEventListeners();

        return this._listItem;
    }
}

export default Card;