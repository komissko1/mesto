import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithWarning from "../components/PopupWithWarning.js";
import "./index.css";
import { formSelectorsConfig } from "../utils/constants.js";

const cardContainer = document.querySelector(".places");
const cardTemplate = document.querySelector("#card-template").content;
const popupImageView = document.querySelector(".popup_type_image");

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupDelete = document.querySelector(".popup_type_delete");
const popupAvatar = document.querySelector(".popup_type_avatar");
const editButton = document.querySelector(".profile__edit-button");
const editForm = popupEdit.querySelector(".form");
const addButton = document.querySelector(".profile__add-button");
const addForm = popupAdd.querySelector(".form");
const avatarButton = document.querySelector(".profile__avatar-button");
const avatarForm = popupAvatar.querySelector(".form");

const userNameSelector = document.querySelector(".profile__user-name");
const userJobSelector = document.querySelector(".profile__user-job");
const userPicSelector = document.querySelector(".profile__user-foto");
const inputName = popupEdit.querySelector("#name");
const inputJob = popupEdit.querySelector("#job");

const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-30/",
  headers: {
    authorization: "885c2761-9e20-4ba5-8dc0-769b8411ad33",
    "Content-Type": "application/json",
  },
};
let sectionWithCards;
let cardForDelete;

// ====Initial user and cards request=========

function apiRequest() {
  api
    .getUserData()
    .then((res) => {
      currentUser.setUserInfo(res);
      currentUser.renderUserInfo();
      initialCardsRendering(currentUser.id);
    })
    .catch((err) => console.log(err));
}

// ====Initial cards rendering=========

function initialCardsRendering(userId) {
  api
    .getCardsData()
    .then((cards) => {
      sectionWithCards = new Section(
        {
          data: cards,
          renderer: (item) => {
            sectionWithCards.appendItem(cardRenderer(item, userId));
          },
        },
        cardContainer
      );
      sectionWithCards.renderItems();
    })
    .catch((err) => console.log(err));
}

// ====Сards rendering function=========

function cardRenderer(item, userId) {
  const cardItem = new Card(
    {
      card: item,
      handleCardClick: () => {
        popupWithImage.open(cardItem);
      },
      handleLikeClick: () => {
        if (cardItem.checkCurrentLikeState(userId)) {
          api
            .deleteLike(cardItem.getCardId())
            .then((res) => {
              cardItem.setLikesState(res.likes);
            })
            .catch((err) => console.log(err));
        } else {
          api
            .addLike(cardItem.getCardId())
            .then((res) => {
              cardItem.setLikesState(res.likes);
            })
            .catch((err) => console.log(err));
        }
      },
      handleDeleteIconClick: () => {
        cardForDelete = cardItem;
        popupWithDeleteWarning.open();
      },
    },
    cardTemplate
  );
  const cardElement = cardItem.generateCard(userId);
  return cardElement;
}

//============MAIN CONTROLLER CODE===============

// ====Api item statement=========

const api = new Api(apiConfig);
const currentUser = new UserInfo(
  userNameSelector,
  userJobSelector,
  userPicSelector
);
apiRequest();

// ====Popup with Add Card form ========

const popupWithAddForm = new PopupWithForm({
  popupSelector: popupAdd,
  submitForm: (inputs) => {
    popupWithAddForm.renderLoading(true, "save");
    api
      .postCardData(inputs['cardName'], inputs['cardLink'])
      .then((res) => {
        sectionWithCards.prependItem(cardRenderer(res, res.owner._id));
        popupWithAddForm.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupWithAddForm.renderLoading(false, "save"));
  },
});

const addFormValidation = new FormValidator(formSelectorsConfig, addForm);
addFormValidation.setValidation();

popupWithAddForm.setEventListeners();

// ==== Add Card button listener ========

addButton.addEventListener("click", () => {
  addFormValidation.resetValidation();
  popupWithAddForm.open();
});

// ====Popup with User Edit form ========

const popupWithEditForm = new PopupWithForm({
  popupSelector: popupEdit,
  submitForm: (inputs) => {
    popupWithEditForm.renderLoading(true, "save");
    api
    .patchUserData(inputs['name'], inputs['job'])
    .then((res) => {
        currentUser.setUserInfo(res);
        currentUser.renderUserInfo();
        popupWithEditForm.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupWithEditForm.renderLoading(false, "save"));
  },
});
const editFormValidation = new FormValidator(formSelectorsConfig, editForm);
editFormValidation.setValidation();

popupWithEditForm.setEventListeners();

// ==== User Edit button listener ========

editButton.addEventListener("click", () => {
  inputName.value = currentUser.name;
  inputJob.value = currentUser.about;
  popupWithEditForm.open();
});

// ====Popup with image ========

const popupWithImage = new PopupWithImage(popupImageView);
popupWithImage.setEventListeners();

// ====Popup with avatar edit form ========

const popupWithAvatar = new PopupWithForm({
  popupSelector: popupAvatar,
  submitForm: (inputs) => {
    popupWithAvatar.renderLoading(true, "save");
    api
      .patchAvatar(inputs['avatarLink'])
      .then((res) => {
        currentUser.setUserInfo(res);
        currentUser.renderUserInfo();
        popupWithAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupWithAvatar.renderLoading(false, "save"));
  },
});
const avatarFormValidation = new FormValidator(formSelectorsConfig, avatarForm);
avatarFormValidation.setValidation();
popupWithAvatar.setEventListeners();

// ==== Edit avatar button listener ========

avatarButton.addEventListener("click", () => {
  avatarFormValidation.resetValidation();
  popupWithAvatar.open();
});


// ==== Popup with Delete Warning Form ========

const popupWithDeleteWarning = new PopupWithWarning({
  popupSelector: popupDelete,
  submitForm: () => {
    popupWithDeleteWarning.renderLoading(true, "delete");
    api
      .deleteCardData(cardForDelete.getCardId())
      .then(() => {
        cardForDelete.deleteCard();
        popupWithDeleteWarning.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupWithDeleteWarning.renderLoading(false, "delete"));
  },
});
popupWithDeleteWarning.setEventListeners();
