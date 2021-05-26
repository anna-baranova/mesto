class Card {
    constructor({name, link, owner, _id, likes}, cardTemplateSelector, handleCardClick, currentUSerId, handleDeleteCardClick) {
        // console.log('owner', owner)
        this._text = name;
        this._link = link;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardClick;
        this._cardOwnerID = owner._id
        this._currentUSerId = currentUSerId
        this._cardId = _id
        this._likes =  likes
        this._handleDeleteCardClick = handleDeleteCardClick

        // console.log('this._cardOwnerID', this._cardOwnerID)
        // console.log('this._currentUSerId', this._currentUSerId)
        // cardOwnderID - 
        // currentUSerId - твой id
       // console.log('this._likes', this._likes)
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
        likeButton.addEventListener('click', this._handleLikeButton);

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

        listItemTitle.textContent = this._text;
        listItemPhoto.src = this._link;
        listItemPhoto.alt = this._text;

        
        // this._cardOwnerID = owner._id
        // this._currentUSerId = currentUSerId
        console.log(this._cardOwnerID === this._currentUSerId)
        if(this._cardOwnerID === this._currentUSerId) {
            this._listItem.querySelector('.place-grid__delete').classList.remove('place-grid__delete_hidden')
        }

        // this.isLiked = this._likes.find(person => person._id === this._currentUSerId) // true null
        // if(isLiked) { // темное сердечко}

        this.isCardLiked
        
        this._setEventListeners();

        return this._listItem;
    }
}

export default Card;