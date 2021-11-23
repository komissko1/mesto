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
const editButton = document.querySelector(".profile__edit-button");
const editForm = popupEdit.querySelector(".form");
const addButton = document.querySelector(".profile__add-button");
const addForm = popupAdd.querySelector(".form");

const userNameSelector = document.querySelector(".profile__user-name");
const userJobSelector = document.querySelector(".profile__user-job");
const userPicSelector = document.querySelector(".profile__user-foto");
const inputName = popupEdit.querySelector("#userName");
const inputJob = popupEdit.querySelector("#userJob");

const apiConfig = {
  cardsUrl: "https://mesto.nomoreparties.co/v1/cohort-30/cards/",
  userUrl: "https://mesto.nomoreparties.co/v1/cohort-30/users/me",
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
          .deleteLike(item._id)
          .then(() => {
            cardItem.setLikesState(userId)
          })
          .catch((err) => console.log(err));
        }
        else {
        api
          .addLike(item._id)
          .then(() => {
            cardItem.setLikesState(userId)
          })
          .catch((err) => console.log(err));
        }
      },
      handleDeleteIconClick: () => {
        const popupWithDeleteWarning = new PopupWithWarning({
          popupSelector: popupDelete,
          submitForm: () => {
            api
              .deleteCardData(item._id)
              .then(() => {
                cardItem.deleteCard(cardItem);
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
    const cardInfo = popupWithAddForm.getCardInfo();
    api
      .postCardData(cardInfo.name, cardInfo.link)
      .then((res) => {
        sectionWithCards.prependItem(cardRenderer(res, res.owner._id));
        popupWithAddForm.close();
      })
      .catch((err) => console.log(err));
  },
});

const addFormValidation = new FormValidator(formSelectorsConfig, addForm);
addFormValidation.setValidation();

popupWithAddForm.setEventListeners();

// ====Popup with User Edit form ========

const user = new UserInfo(userNameSelector, userJobSelector);

const popupWithEditForm = new PopupWithForm({
  popupSelector: popupEdit,
  submitForm: () => {
    const patchUserResult = api
      .patchUserData(inputName.value, inputJob.value)
      .then(() => {
        user.setUserInfo(inputName.value, inputJob.value);
        popupWithEditForm.close();
      })
      .catch((err) => console.log(err));
  },
});
const editFormValidation = new FormValidator(formSelectorsConfig, editForm);
editFormValidation.setValidation();

popupWithEditForm.setEventListeners();

// ====Popup with image ========

const popupWithImage = new PopupWithImage(popupImageView);
popupWithImage.setEventListeners();

// ==== Edit button listener ========

editButton.addEventListener("click", () => {
  const userData = user.getUserInfo();
  inputName.value = userData.name;
  inputJob.value = userData.job;
  popupWithEditForm.open();
});

// ==== Add card button listener ========

addButton.addEventListener("click", () => {
  addFormValidation.resetValidation();
  popupWithAddForm.open();
});
