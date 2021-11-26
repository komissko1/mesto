import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector),
    this._title = this._popup.querySelector(".popup__img-title"),
    this._image = this._popup.querySelector(".popup__image")
  }

  open(card) {
    this._image.src = card._src;
    this._image.alt = card._title;
    this._title.textContent = card._title;;
    super.open();
  }
}
