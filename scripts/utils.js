export function closePopup (popup) {
    popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', closeByEscape);
  };

export function closeByEscape (event) {
    if (event.key === "Escape") {
      const openedPupup = document.querySelector('.popup_visible');
      closePopup(openedPupup);
    }
  };

export function openPopup (popup) {
    popup.classList.add('popup_visible');
    document.addEventListener('keydown', closeByEscape);
  };  

export const zoomCardPopup = document.querySelector('.popup_type_zoom-card');
export const zoomPhoto = zoomCardPopup.querySelector('.popup__image');
export const zoomPhotoCaption = zoomCardPopup.querySelector('.popup__caption');