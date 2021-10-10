const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupImageView = document.querySelector(".popup_type_image");
const popups = document.querySelectorAll(".popup")

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close-button");
const closeButtonsArray = Array.from(closeButtons);
const saveEditButton = popupEdit.querySelector(".form__save-button");
const saveAddButton = popupAdd.querySelector(".form__save-button");

const userName = document.querySelector(".profile__user-name");
const userJob = document.querySelector(".profile__user-job");
const inputName = popupEdit.querySelector("#userName");
const inputJob = popupEdit.querySelector("#userJob");
const inputPlaceName = popupAdd.querySelector("#placeName");
const inputPlaceImg = popupAdd.querySelector("#placeImg");

const cardContainer = document.querySelector(".places");
const cardTemplate = document.querySelector("#card-template").content;

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closeModal);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closeModal);
}

function setPopupsEventListeners() {
  popups.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close-button");
    popup.addEventListener("click", closeModal);
    closeButton.addEventListener("click", closeModal);
  })
}

function closeModal(evt) {
  // evt.preventDefault();
  console.log(evt);
  const currentPopup = document.querySelector(".popup_opened");
  const checkCloseButton = closeButtonsArray.some( (button) => {return button === evt.target;})
  const checkSubmitButton = (evt.target === saveEditButton || evt.target === saveAddButton)
  if (evt.target === currentPopup || checkCloseButton || checkSubmitButton || evt.key === "Escape")  {
    closePopup(currentPopup);
  } else return
}

function createCard(placeName, placeImg) {
  const cardContent = cardTemplate.cloneNode(true);
  const placeCaption = cardContent.querySelector(".place__name");
  const placeImage = cardContent.querySelector(".place__image");
  placeImage.src = placeImg;
  placeImage.alt = placeName;
  placeCaption.textContent = placeName;
  cardContent
  .querySelector(".place__trash-button")
  .addEventListener("click", deleteCard);
  cardContent
  .querySelector(".place__like-button")
  .addEventListener("click", addLike);
  cardContent
  .querySelector(".place__image-button")
  .addEventListener("click", openViewImage);
  return cardContent;
}

function openForm (evt) {

  switch(evt.target) {
    case addButton:
      inputPlaceName.value = "";
      inputPlaceImg.value = "";
      toggleButtonState([inputPlaceName, inputPlaceImg] , saveAddButton, indexes);
      openPopup(popupAdd);
    break;
    case editButton:
      inputName.value = userName.textContent;
      inputJob.value = userJob.textContent;
      toggleButtonState([inputName, inputJob] , saveEditButton, indexes);
      openPopup(popupEdit);
    break;
  }
}

function openViewImage(evt) {
  // evt.preventDefault();
  const cardContent = evt.target.closest(".place");
  const cardImage = cardContent.querySelector(".place__image")
  const popupImage = popupImageView.querySelector(".popup__image")
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupImageView.querySelector(".popup__img-title").textContent = cardContent.querySelector(".place__name").textContent;
  openPopup(popupImageView);
}

function submitForm (evt) {
  // evt.preventDefault();
  const formElement = evt.target.closest(".form");
  switch(formElement.name) {
    case "add-form":
      const cardContent =  createCard(inputPlaceName.value, inputPlaceImg.value);
      cardContainer.prepend(cardContent);
    break;
    case "edit-form":
      userName.textContent = inputName.value;
      userJob.textContent = inputJob.value;
    break;
  }
  closeModal(evt);
}

function deleteCard(evt) {
  const currentCard = evt.target.closest(".place")
  currentCard.querySelector(".place__trash-button").removeEventListener("click", deleteCard)
  currentCard.querySelector(".place__like-button").removeEventListener("click", addLike)
  currentCard.querySelector(".place__image-button").removeEventListener("click", openViewImage)
  currentCard.remove();
}

function addLike(evt) {
  evt.preventDefault();
  evt.target.classList.toggle("place__like-button_active");
  evt.target.classList.toggle("place__like-button_inactive");
}

// ============== main body ===================

initialCards.forEach((card) => {
  const cardContent = createCard(card.name, card.link);
  cardContainer.append(cardContent);
})
setPopupsEventListeners();
editButton.addEventListener("click", openForm);
addButton.addEventListener("click", openForm);


