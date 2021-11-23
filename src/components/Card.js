export default class Card {
  constructor(
    { card, handleCardClick, handleLikeClick, handleDeleteIconClick },
    cardTemplate
  ) {
    (this._src = card.link),
      (this._title = card.name),
      (this._card = card),
      (this._cardTemplate = cardTemplate),
      (this._handleCardClick = handleCardClick),
      (this._handleDeleteIconClick = handleDeleteIconClick),
      (this._handleLikeClick = handleLikeClick),
      (this._likes = card.likes);
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    const card = this;
    this._element
      .querySelector(".place__image-button")
      .addEventListener("click", this._handleCardClick);
    this._element
      .querySelector(".place__like-button")
      .addEventListener("click", this._handleLikeClick);
    this._element
      .querySelector(".place__trash-button")
      .addEventListener("click", this._handleDeleteIconClick);
  }

  deleteCard(cardItem) {
    const thisCard = cardItem._cardDeleteButton.closest(".place");
    thisCard
      .querySelector(".place__trash-button")
      .removeEventListener("click", this._handleDeleteIconClick);
    thisCard
      .querySelector(".place__like-button")
      .removeEventListener("click", this._handleLikeClick);
    thisCard
      .querySelector(".place__image-button")
      .removeEventListener("click", this._handleCardClick);
    thisCard.remove();
  }

  _setDeleteButtonStyle(userId) {
    this._cardDeleteButton = this._element.querySelector(".place__trash-button"
    );
    if (this._card.owner._id !== userId) {
      this._cardDeleteButton.classList.add("place__trash-button_inactive");
    }
  }

  checkCurrentLikeState(userId) {
    this._arrayOfLikerIds = this._likes.map((like)=> {return like._id});
    return this._arrayOfLikerIds.includes(userId);
  }

  setLikesState(userId) {
    this._cardLikeButton = this._element.querySelector(".place__like-button");
    this._cardLikeCount = this._element.querySelector(".place__like-counter");
    this._cardLikeCount.textContent = this._likes.length;
    if (!this.checkCurrentLikeState(userId)) {
      this._cardLikeButton.classList.toggle("place__like-button_inactive");
    }
  }

  generateCard(userId) {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".place__image");
    this._cardImage.src = this._src;
    this._cardImage.alt = this._title;
    this._element.querySelector(".place__name").textContent = this._title;
    this._setDeleteButtonStyle(userId);
    this.setLikesState(userId);
    this._setEventListeners();
    return this._element;
  }
}
