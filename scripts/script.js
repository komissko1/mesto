const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupImageView = document.querySelector(".popup_type_image");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close-button");
const saveEditButton = popupEdit.querySelector(".popup__save-button");
const saveAddButton = popupAdd.querySelector(".popup__save-button");

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

for (var i = 0; i < initialCards.length; i++) {
  const cardContent = createCard(initialCards[i].name, initialCards[i].link);
  cardContainer.append(cardContent);
}

editButton.addEventListener("click", editProfile);
addButton.addEventListener("click", addCard);
closeButtons.forEach((button) => {
  button.addEventListener("click", closePopup);
});
saveEditButton.addEventListener("click", submitProfile);
saveAddButton.addEventListener("click", submitCard);

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(evt) {
  const openedPopup = evt.target.closest(".popup_opened")
  openedPopup.classList.remove("popup_opened");
}

function createCard(placeTitle, placeImageSrc) {
  const cardContent = cardTemplate.cloneNode(true);
  const placeName = cardContent.querySelector(".place__name");
  const placeImage = cardContent.querySelector(".place__image");
  placeName.textContent = placeTitle;
  placeImage.src = placeImageSrc;
  placeImage.alt = placeTitle;
  cardContent
  .querySelector(".place__trash-button")
  .addEventListener("click", deleteCard);
  cardContent
  .querySelector(".place__like-button")
  .addEventListener("click", addLike);
  cardContent
  .querySelector(".place__image-button")
  .addEventListener("click", viewImage);
  return cardContent;
}

function editProfile() {
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  openPopup(popupEdit);
}

function addCard() {
  inputPlaceName.value = "";
  inputPlaceImg.value = "";
  openPopup(popupAdd);
}

function viewImage(evt) {
  evt.preventDefault();
  const cardContent = evt.target.closest(".place");
  const cardImage = cardContent.querySelector(".place__image")
  const popupImage = popupImageView.querySelector(".popup__image")
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupImageView.querySelector(".popup__img-title").textContent = cardContent.querySelector(".place__name").textContent;
  openPopup(popupImageView);
}

function submitProfile(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  closePopup(evt);
}

function submitCard(evt) {
  evt.preventDefault();
  const cardContent =  createCard(inputPlaceName.value, inputPlaceImg.value);
  cardContainer.prepend(cardContent);
  closePopup(evt)
}

function deleteCard(evt) {
  evt.preventDefault();
  evt.target.closest(".place").remove();
}

function addLike(evt) {
  evt.preventDefault();
  evt.target.classList.toggle("place__like-button_active");
  evt.target.classList.toggle("place__like-button_inactive");
}


