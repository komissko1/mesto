import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithWarning from "../components/PopupWithWarning.js";
// import "./index.css";
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
const inputName = popupEdit.querySelector("#userName");
const inputJob = popupEdit.querySelector("#userJob");

const apiConfig = {
  cardsUrl: "https://mesto.nomoreparties.co/v1/cohort-30/cards/",
  userUrl: "https://mesto.nomoreparties.co/v1/cohort-30/users/me/",
  headers: {
    authorization: "885c2761-9e20-4ba5-8dc0-769b8411ad33",
    "Content-Type": "application/json",
  },
};
var sectionWithCards;

// ====Initial user and cards request=========

function apiRequest() {
  api
    .getUserData()
    .then((user) => {
      currentUser.setUserInfo(user.name, user.about);
      currentUser.setUserAvatar(user.avatar);
      initialCardsRendering(user._id);
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
            .deleteLike(cardItem._card._id)
            .then((res) => {
              cardItem.setLikesState(res.likes);
            })
            .catch((err) => console.log(err));
        } else {
          api
            .addLike(cardItem._card._id)
            .then((res) => {
              cardItem.setLikesState(res.likes);
            })
            .catch((err) => console.log(err));
        }
      },
      handleDeleteIconClick: () => {
        const popupWithDeleteWarning = new PopupWithWarning({
          popupSelector: popupDelete,
          submitForm: () => {
            toggleLoader(popupDelete, true, "delete");
            api
              .deleteCardData(item._id)
              .then(() => {
                cardItem.deleteCard();
                toggleLoader(popupDelete, false, "delete");
                popupWithDeleteWarning.close();
              })
              .catch((err) => console.log(err));
          },
        });
        popupWithDeleteWarning.setEventListeners();
        popupWithDeleteWarning.open();
      },
    },
    cardTemplate
  );
  const cardElement = cardItem.generateCard(userId);
  return cardElement;
}

// ==== Loader effect switcher ========

function toggleLoader(popupSelector, buttonState, method) {
  const saveButton = popupSelector.querySelector(".form__save-button");
  if (buttonState) {
    switch (method) {
      case "save":
        saveButton.textContent = "Сохранить...";
        break;
      case "delete":
        saveButton.textContent = "Удаление...";
        break;
    }
  } else {
    switch (method) {
      case "save":
        saveButton.textContent = "Сохранить";
        break;
      case "delete":
        saveButton.textContent = "Да";
        break;
    }
  }
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
  submitForm: () => {
    toggleLoader(popupAdd, true, "save");
    const cardInfo = popupWithAddForm.getCardInfo();
    api
      .postCardData(cardInfo.name, cardInfo.link)
      .then((res) => {
        sectionWithCards.prependItem(cardRenderer(res, res.owner._id));
        toggleLoader(popupAdd, false, "save");
        popupWithAddForm.close();
      })
      .catch((err) => console.log(err));
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

const user = new UserInfo(userNameSelector, userJobSelector);

const popupWithEditForm = new PopupWithForm({
  popupSelector: popupEdit,
  submitForm: () => {
    toggleLoader(popupEdit, true, "save");
    api
      .patchUserData(inputName.value, inputJob.value)
      .then(() => {
        user.setUserInfo(inputName.value, inputJob.value);
        toggleLoader(popupEdit, false, "save");
        popupWithEditForm.close();
      })
      .catch((err) => console.log(err));
  },
});
const editFormValidation = new FormValidator(formSelectorsConfig, editForm);
editFormValidation.setValidation();

popupWithEditForm.setEventListeners();

// ==== User Edit button listener ========

editButton.addEventListener("click", () => {
  const userData = user.getUserInfo();
  inputName.value = userData.name;
  inputJob.value = userData.job;
  popupWithEditForm.open();
});

// ====Popup with image ========

const popupWithImage = new PopupWithImage(popupImageView);
popupWithImage.setEventListeners();

// ====Popup with avatar ========

const popupWithAvatar = new PopupWithForm({
  popupSelector: popupAvatar,
  submitForm: () => {
    toggleLoader(popupAvatar, true, "save");
    const avatarInfo = popupWithAvatar.getAvatarInfo();
    api
      .patchAvatar(avatarInfo.link)
      .then((res) => {
        currentUser.setUserAvatar(res.avatar);
        toggleLoader(popupAvatar, false, "save");
        popupWithAvatar.close();
      })
      .catch((err) => console.log(err));
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
