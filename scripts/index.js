import { Card } from "./Card.js";
import { openPopup, closePopup } from "./utils.js";
import { FormValidator } from "./FormValidator.js";

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

const indexes = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const cardContainer = document.querySelector(".places");
const cardTemplate = document.querySelector("#card-template").content;

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popups = document.querySelectorAll(".popup");
const editButton = document.querySelector(".profile__edit-button");
const editForm = popupEdit.querySelector(".form");
const addButton = document.querySelector(".profile__add-button");
const addForm = popupAdd.querySelector(".form");

const userName = document.querySelector(".profile__user-name");
const userJob = document.querySelector(".profile__user-job");
const inputName = popupEdit.querySelector("#userName");
const inputJob = popupEdit.querySelector("#userJob");
const inputPlaceName = popupAdd.querySelector("#placeName");
const inputPlaceImg = popupAdd.querySelector("#placeImg");

function submitAddForm() {
  const cardInfo = { name: inputPlaceName.value, link: inputPlaceImg.value };
  const card = new Card(cardInfo, cardTemplate);
  const cardElement = card.generateCard();
  cardContainer.prepend(cardElement);
  closePopup(popupAdd);
}

function submitEditForm() {
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  closePopup(popupEdit);
}

function openAddForm() {
  inputPlaceName.value = "";
  inputPlaceImg.value = "";
  openPopup(popupAdd);
}

function openEditForm() {
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  openPopup(popupEdit);
}

// ============== main body ===================

initialCards.forEach((cardInfo) => {
  const card = new Card(cardInfo, cardTemplate);
  const cardElement = card.generateCard();
  cardContainer.append(cardElement);
});

const formList = Array.from(document.querySelectorAll(indexes.formSelector));
formList.forEach((formElement) => {
  const form = new FormValidator(indexes, formElement);
  form.setValidation();
});

editButton.addEventListener("click", openEditForm);
editForm.addEventListener("submit", submitEditForm);

addButton.addEventListener("click", openAddForm);
addForm.addEventListener("submit", submitAddForm);

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});
