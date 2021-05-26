class Card {
    constructor({name, link}, cardTemplateSelector, handleCardClick) {
        this._text = name;
        this._link = link;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardClick;
    }

    _handleDeleteCard () {
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

        delButton.addEventListener('click', () => this._handleDeleteCard());
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
        
        this._setEventListeners();

        return this._listItem;
    }
}

export default Card;