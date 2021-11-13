import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import { formSelectorsConfig, initialCards } from "../utils/constants.js";

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

// ====Сards rendering function=========

function cardRenderer(item, cardInsertionType) {
  const card = new Card(
    {
      card: item,
      handleCardClick: (evt) => {
        popupWithImage.open(card);
      },
    },
    cardTemplate
  );
  const cardElement = card.generateCard();
  if (cardInsertionType === "append") {
    cardList.appendItem(cardElement);
  } else {
    cardList.prependItem(cardElement);
  }
}

// ====Initial cards rendering========

const popupWithImage = new PopupWithImage(popupImageView);
popupWithImage.setEventListeners();

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      cardRenderer(item, "append");
    },
  },
  cardContainer
);
cardList.renderItems();

// ====Popup with Add form ========

const popupWithAddForm = new PopupWithForm({
  popupSelector: popupAdd,
  submitForm: () => {
    const cardInfo = popupWithAddForm.getCardInfo();
    cardRenderer(cardInfo, "prepend");
    popupWithAddForm.close();
  },
});

const addFormValidation = new FormValidator(formSelectorsConfig, addForm);
addFormValidation.setValidation();

addButton.addEventListener("click", () => {
  addFormValidation.resetValidation();
  popupWithAddForm.open();
});
popupWithAddForm.setEventListeners();

// ====Popup with Edit form ========

const user = new UserInfo(userNameSelector, userJobSelector);

const popupWithEditForm = new PopupWithForm({
  popupSelector: popupEdit,
  submitForm: () => {
    user.setUserInfo(inputName.value, inputJob.value);
    popupWithEditForm.close();
  },
});

editButton.addEventListener("click", () => {
  const userData = user.getUserInfo();
  inputName.value = userData.name;
  inputJob.value = userData.job;
  popupWithEditForm.open();
});
popupWithEditForm.setEventListeners();

const editFormValidation = new FormValidator(formSelectorsConfig, editForm);
editFormValidation.setValidation();
