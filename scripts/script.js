const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupImageView = document.querySelector(".popup_type_image");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close-button");
const saveEditButton = popupEdit.querySelector(".popup__save-button");
const saveAddButton = popupAdd.querySelector(".popup__save-button");

let userName = document.querySelector(".profile__user-name");
let userJob = document.querySelector(".profile__user-job");
let inputName = popupEdit.querySelector("#userName");
let inputJob = popupEdit.querySelector("#userJob");
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
  let cardElement = cardTemplate.querySelector(".place").cloneNode(true);
  let placeName = cardElement.querySelector(".place__name");
  let placeImage = cardElement.querySelector(".place__image");
  placeName.textContent = initialCards[i].name;
  placeImage.src = initialCards[i].link;
  placeImage.alt = initialCards[i].name;
  cardElement
  .querySelector(".place__trash-button")
  .addEventListener("click", deleteCard);
  cardElement
  .querySelector(".place__like-button")
  .addEventListener("click", addLike);
  cardElement
  .querySelector(".place__image-button")
  .addEventListener("click", viewImage);
  cardContainer.append(cardElement);
}

editButton.addEventListener("click", editProfile);
addButton.addEventListener("click", addCard);
closeButtons.forEach((button) => {
  button.addEventListener("click", closeForm);
});
saveEditButton.addEventListener("click", submitProfile);
saveAddButton.addEventListener("click", submitCard);

function editProfile(evt) {
  evt.preventDefault();
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  popupEdit.classList.add("popup_opened");
}

function addCard(evt) {
  evt.preventDefault();
  popupAdd.classList.add("popup_opened");
}

function closeForm(evt) {
  evt.preventDefault();
  evt.target.closest(".popup_opened").classList.remove("popup_opened");
}

function submitProfile(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  evt.target.closest(".popup_opened").classList.remove("popup_opened");
}

function submitCard(evt) {
  evt.preventDefault();
  let cardElement = cardTemplate.querySelector(".place").cloneNode(true);
  let placeName = cardElement.querySelector(".place__name");
  let placeImage = cardElement.querySelector(".place__image");
  placeName.textContent = inputPlaceName.value;
  placeImage.src = inputPlaceImg.value;
  placeImage.alt = inputPlaceName.value;
  cardElement
  .querySelector(".place__trash-button")
  .addEventListener("click", deleteCard);
  cardElement
  .querySelector(".place__like-button")
  .addEventListener("click", addLike);
  cardElement
  .querySelector(".place__image-button")
  .addEventListener("click", viewImage);
  evt.target.closest(".popup_opened").classList.remove("popup_opened");
  cardContainer.prepend(cardElement);
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

function viewImage(evt) {
  evt.preventDefault();
  let cardContent = evt.target.closest(".place");
  let cardImage = cardContent.querySelector(".place__image")
  let popupImage = popupImageView.querySelector(".popup__image")
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupImageView.querySelector(".popup__img-title").textContent = cardContent.querySelector(".place__name").textContent;
  popupImageView.classList.add("popup_opened");
}
