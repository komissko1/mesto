import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithimage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

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

export {indexes};

const cardContainer = document.querySelector(".places");
const cardTemplate = document.querySelector("#card-template").content;
const popupImageView = document.querySelector(".popup_type_image");

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const editButton = document.querySelector(".profile__edit-button");
const editForm = popupEdit.querySelector(".form");
const addButton = document.querySelector(".profile__add-button");
const addForm = popupAdd.querySelector(".form");

const userNameSelector = document.querySelector(".profile__user-name");
const userJobSelector = document.querySelector(".profile__user-job");
const inputName = popupEdit.querySelector("#userName");
const inputJob = popupEdit.querySelector("#userJob");

// ====Initial cards rendering========

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(
        {card: item,
        handleCardClick: (evt) => {
          const popup = new PopupWithImage(popupImageView);
          popup.setEventListeners();
          popup.open(evt);
        }},
        cardTemplate
        );
      const cardElement = card.generateCard();
      cardList.appendItem(cardElement);
    }
  },
  cardContainer
);
cardList.renderItems();

// ====Popup with Add form ========

const popupWithAddForm = new PopupWithForm({
  popupSelector: popupAdd,
  submitForm: () => {
    const cardInfo = popupWithAddForm.getCardInfo();
    const card = new Card(
      {card: cardInfo,
      handleCardClick: (evt) => {
        const popup = new PopupWithImage(popupImageView);
        popup.setEventListeners();
        popup.open(evt);
      }},
      cardTemplate
      );
    const cardElement = card.generateCard();
    cardList.prependItem(cardElement);
    popupWithAddForm.close();
  }
});

const addFormValidation = new FormValidator(indexes, addForm);
addFormValidation.setValidation();

addButton.addEventListener("click", () => {
  addFormValidation.resetValidation();
  popupWithAddForm.open()});
popupWithAddForm.setEventListeners();



// ====Popup with Edit form ========

const user = new UserInfo (userNameSelector, userJobSelector);

const popupWithEditForm = new PopupWithForm({
  popupSelector: popupEdit,
  submitForm: () =>{
    user.setUserInfo(inputName.value, inputJob.value);
    user.updateUserInfo();
    popupWithEditForm.close();
  }
});

editButton.addEventListener("click", () => {
  const userData = user.getUserInfo();
  inputName.value = userData.name;
  inputJob.value = userData.job;
  popupWithEditForm.open()
});
popupWithEditForm.setEventListeners();

const editFormValidation = new FormValidator(indexes, editForm);
editFormValidation.setValidation();


