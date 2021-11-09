import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(evt) {
    const thisCard = evt.target.closest(".place");
    const cardImage = thisCard.querySelector(".place__image");
    const popupImage = document.querySelector(".popup__image");
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    document.querySelector(".popup__img-title").textContent =
    thisCard.querySelector(".place__name").textContent;
    super.open();
  }
}
