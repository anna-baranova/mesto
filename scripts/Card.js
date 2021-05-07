import {zoomPhoto, zoomPhotoCaption, openPopup, zoomCardPopup} from './utils.js'


class Card {
    constructor({text, link}, cardTemplateSelector) {
        this._text = text;
        this._link = link;
        this._cardTemplateSelector = cardTemplateSelector;
    }

    _handleDeleteCard () {
        this._listItem.remove();
        console.log("123")
    }

    _handleLikeButton(evt) {
        evt.target.classList.toggle('place-grid__like-liked')
    }

    _handleZoomPhoto() {
        zoomPhoto.src = str.link;
        zoomPhoto.alt = str.name;
        zoomPhotoCaption.textContent = str.name;
        openPopup(zoomCardPopup);
    }

    _setEventListeners() {
        const likeButton = this._listItem.querySelector('.place-grid__like');
        const delButton = this._listItem.querySelector('.place-grid__delete');
        const listItemPhoto = this._listItem.querySelector('.place-grid__item');

        delButton.addEventListener('click', this._handleDeleteCard);
        likeButton.addEventListener('click', this._handleLikeButton);
        listItemPhoto.addEventListener('click', () => this._handleZoomPhoto(str));
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

        return this._listItem;
    }
}

export default Card;