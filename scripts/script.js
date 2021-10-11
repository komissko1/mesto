const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupImageView = document.querySelector(".popup_type_image");
const popups = document.querySelectorAll(".popup")

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
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
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}

function createCard(placeName, placeImg) {
  const cardContent = cardTemplate.cloneNode(true);
  const placeCaption = cardContent.querySelector('.place__name');
  const placeImage = cardContent.querySelector('.place__image');
  placeImage.src = placeImg;
  placeImage.alt = placeName;
  placeCaption.textContent = placeName;
  cardContent
  .querySelector('.place__trash-button')
  .addEventListener("click", deleteCard);
  cardContent
  .querySelector('.place__like-button')
  .addEventListener("click", addLike);
  cardContent
  .querySelector('.place__image-button')
  .addEventListener("click", openViewImage);
  return cardContent;
}

function openAddForm () {
  inputPlaceName.value = "";
  inputPlaceImg.value = "";
  toggleButtonState([inputPlaceName, inputPlaceImg] , saveAddButton, indexes);
  openPopup(popupAdd);
}

function openEditForm () {
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  toggleButtonState([inputName, inputJob] , saveEditButton, indexes);
  openPopup(popupEdit);
}

function openViewImage(evt) {
  const cardContent = evt.target.closest('.place');
  const cardImage = cardContent.querySelector('.place__image')
  const popupImage = popupImageView.querySelector('.popup__image')
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupImageView.querySelector('.popup__img-title').textContent = cardContent.querySelector('.place__name').textContent;
  openPopup(popupImageView);
}

function submitForm (evt) {
  const formElement = evt.target.closest('.form');
  switch(formElement.name) {
    case "add-form":
      submitAddForm();
    break;
    case "edit-form":
      submitEditForm();
    break;
  }
}

function submitAddForm () {
  const cardContent =  createCard(inputPlaceName.value, inputPlaceImg.value);
  cardContainer.prepend(cardContent);
  closePopup(popupAdd);
}

function submitEditForm () {
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  closePopup(popupEdit);
}

function deleteCard(evt) {
  const currentCard = evt.target.closest('.place')
  currentCard.querySelector('.place__trash-button').removeEventListener("click", deleteCard)
  currentCard.querySelector('.place__like-button').removeEventListener("click", addLike)
  currentCard.querySelector('.place__image-button').removeEventListener("click", openViewImage)
  currentCard.remove();
}

function addLike(evt) {
  evt.preventDefault();
  evt.target.classList.toggle('place__like-button_active');
  evt.target.classList.toggle('place__like-button_inactive');
}

// ============== main body ===================

initialCards.forEach((card) => {
  const cardContent = createCard(card.name, card.link);
  cardContainer.append(cardContent);
});
editButton.addEventListener("click", openEditForm);
addButton.addEventListener("click", openAddForm);
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup)
        }
    })
})




