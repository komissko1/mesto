export default class Card {
  constructor({ card, handleCardClick, handleDeleteIconClick }, cardTemplate) {
    (this._src = card.link),
      (this._title = card.name),
      (this._cardTemplate = cardTemplate),
      (this._handleCardClick = handleCardClick),
      (this._handleDeleteIconClick = handleDeleteIconClick),
      (this._likes = card.likes);
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
      .addEventListener("click", this._handleCardClick);
  }

  // _deleteCardWarning( {

  // })

  _deleteCard() {
    this._handleDeleteIconClick;
    // console.log(this);
    const thisCard = this.closest(".place");
    thisCard
      .querySelector(".place__trash-button")
      .removeEventListener("click", this._deleteCard);
    thisCard
      .querySelector(".place__like-button")
      .removeEventListener("click", this._addLike);
    thisCard
      .querySelector(".place__image-button")
      .removeEventListener("click", this._handleCardClick);
    thisCard.remove();
  }

  generateCard(deleteButtonStyle) {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".place__image");
    this._cardDeleteButton = this._element.querySelector(
      ".place__trash-button"
    );
    this._cardLikeCount = this._element.querySelector(".place__like-counter");
    this._cardImage.src = this._src;
    this._cardImage.alt = this._title;
    this._cardLikeCount.textContent = this._likes.length;
    if (deleteButtonStyle === "deletButtonInvisible") {
      this._cardDeleteButton.classList.add("place__trash-button_inactive");
    }
    this._element.querySelector(".place__name").textContent = this._title;
    this._setEventListeners();
    return this._element;
  }
}
