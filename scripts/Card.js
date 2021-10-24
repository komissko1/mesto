import { openPopup } from "./utils.js";

export class Card {
  constructor(card, cardTemplate) {
    this._src = card.link;
    this._title = card.name;
    this._cardTemplate = cardTemplate;
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.cloneNode(true);
    return cardElement;
  }

  _addLike() {
    this.classList.toggle("place__like-button_active");
    this.classList.toggle("place__like-button_inactive");
  }

  _setEventListeners() {
    this._element
      .querySelector(".place__like-button")
      .addEventListener("click", this._addLike);
    this._element
      .querySelector(".place__trash-button")
      .addEventListener("click", this._deleteCard);
    this._element
      .querySelector(".place__image-button")
      .addEventListener("click", this._openViewImage);
  }

  _deleteCard() {
    const thisCard = this.closest(".place");
    thisCard
      .querySelector(".place__trash-button")
      .removeEventListener("click", this._deleteCard);
    thisCard
      .querySelector(".place__like-button")
      .removeEventListener("click", this._addLike);
    thisCard
      .querySelector(".place__image-button")
      .removeEventListener("click", this._openViewImage);
    thisCard.remove();
  }

  _openViewImage() {
    const thisCard = this.closest(".place");
    const cardImage = thisCard.querySelector(".place__image");
    const popupImageView = document.querySelector(".popup_type_image");
    const popupImage = popupImageView.querySelector(".popup__image");
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupImageView.querySelector(".popup__img-title").textContent =
      thisCard.querySelector(".place__name").textContent;
    openPopup(popupImageView);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".place__image").src = this._src;
    this._element.querySelector(".place__image").alt = this._title;
    this._element.querySelector(".place__name").textContent = this._title;
    this._setEventListeners();
    return this._element;
  }
}
