import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
// import "./index.css";
import { formSelectorsConfig } from "../utils/constants.js";

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
      initialCardsRendering(user);
    })
    .catch((err) => console.log(err));
}

// ====Initial cards rendering=========

function initialCardsRendering(user) {
  api
    .getCardsData()
    .then((cards) => {
      sectionWithCards = new Section(
        {
          data: cards,
          renderer: (item) => {
            if (user._id !== item.owner._id) {
              sectionWithCards.appendItem(
                cardRenderer(item, "deletButtonInvisible")
              );
            } else {
              sectionWithCards.appendItem(
                cardRenderer(item, "deletButtonVisible")
              );
            }
          },
        },
        cardContainer
      );
      sectionWithCards.renderItems();
    })
    .catch((err) => console.log(err));
}

// ====Сards rendering function=========

function cardRenderer(item, deleteButtonStyle) {
  const cardItem = new Card(
    {
      card: item,
      handleCardClick: () => {
        popupWithImage.open(cardItem);
      },
      // handleLikeClick: (card) => {

      // },
      handleDeleteIconClick: () => {
        console.log(item._id)
        console.log(cardItem._id)
        api
          .deleteCardData(cardItem._id)
          .then((res) => {return res})
          .catch((err) => console.log(err));
      }
    },
    cardTemplate
  );
  const cardElement = cardItem.generateCard(deleteButtonStyle);
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
      .then(() => {
        sectionWithCards.prependItem(
          cardRenderer(cardInfo, "deletButtonVisible")
        );
        popupWithAddForm.close();
      })
      .catch((err) => console.log(err));
  },
});

const addFormValidation = new FormValidator(formSelectorsConfig, addForm);
addFormValidation.setValidation();

addButton.addEventListener("click", () => {
  addFormValidation.resetValidation();
  popupWithAddForm.open();
});
popupWithAddForm.setEventListeners();

// ====Popup with User Edit form ========

const user = new UserInfo(userNameSelector, userJobSelector);

const popupWithEditForm = new PopupWithForm({
  popupSelector: popupEdit,
  submitForm: () => {
    // const patchUserResult = api.patchUserData(inputName.value, inputJob.value);
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

const popupWithImage = new PopupWithImage(popupImageView);
popupWithImage.setEventListeners();

const editFormValidation = new FormValidator(formSelectorsConfig, editForm);
editFormValidation.setValidation();
