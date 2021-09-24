let popupEdit = document.querySelector('.popup_type_edit');
let popupAdd = document.querySelector('.popup_type_add');
let popupImage = document.querySelector('.popup_type_image');

let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let closeButtons = document.querySelectorAll('.popup__close-button');
let saveEditButton = popupEdit.querySelector('.popup__save-button');
let saveAddButton = popupAdd.querySelector('.popup__save-button');



let userName = document.querySelector('.profile__user-name');
let userJob = document.querySelector('.profile__user-job');
let inputName = popupEdit.querySelector('#userName');
let inputJob = popupEdit.querySelector('#userJob');
let inputPlaceName = popupAdd.querySelector('#placeName');
let inputPlaceImg = popupAdd.querySelector('#placeImg');

const cardContainer = document.querySelector('.places');
const cardTemplate = document.querySelector('#card-template').content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

for (var i=0; i<initialCards.length; i++) {
    let cardElement = cardTemplate.querySelector('.place').cloneNode(true);
    let placeName = cardElement.querySelector('.place__name');
    let placeImage = cardElement.querySelector('.place__image');
    placeName.textContent = initialCards[i].name;
    placeImage.src = initialCards[i].link;
    placeImage.alt = initialCards[i].name;
    cardContainer.append(cardElement);
    cardElement.querySelector('.place__trash-button').addEventListener('click',deleteCard);
    cardElement.querySelector('.place__like-button').addEventListener('click',addLike);
    cardElement.querySelector('.place__image-button').addEventListener('click',imageView);
  }

editButton.addEventListener('click', editProfileForm);
addButton.addEventListener('click', addCardForm);
closeButtons.forEach((button) => {button.addEventListener('click', closeForm);});
saveEditButton.addEventListener('click', formSubmitProfile);
saveAddButton.addEventListener('click', formSubmitCard);

function editProfileForm(evt) {
  evt.preventDefault();
  popupEdit.classList.add('popup_opened');
  inputName.value = userName.textContent;
  inputDescription.value = userJob.textContent;
}

function addCardForm(evt) {
  evt.preventDefault();
  popupAdd.classList.add('popup_opened');
  }

function closeForm(evt) {
  evt.preventDefault();
  evt.target.closest('.popup_opened').classList.remove('popup_opened');
}

function formSubmitProfile(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  evt.target.closest('.popup_opened').classList.remove('popup_opened');
}

function formSubmitCard(evt) {
  evt.preventDefault();
  let cardElement = cardTemplate.querySelector('.place').cloneNode(true);
  let placeName = cardElement.querySelector('.place__name');
  let placeImage = cardElement.querySelector('.place__image');
  placeName.textContent = inputPlaceName.value;
  placeImage.src = inputPlaceImg.value;
  placeImage.alt = inputPlaceName.value;
  cardContainer.prepend(cardElement);
  cardElement.querySelector('.place__trash-button').addEventListener('click',deleteCard);
  cardElement.querySelector('.place__like-button').addEventListener('click',addLike);
  cardElement.querySelector('.place__image-button').addEventListener('click',imageView);
  evt.target.closest('.popup_opened').classList.remove('popup_opened');
}

function deleteCard(evt) {
  evt.preventDefault();
  evt.target.closest('.place').remove();
}

function addLike(evt) {
  evt.preventDefault();
  evt.target.classList.toggle('place__like-button_active');
  evt.target.classList.toggle('place__like-button_inactive');
}

function imageView(evt) {
  evt.preventDefault();
  let cardContent = evt.target.closest('.place');
  popupImage.classList.add('popup_opened');
  popupImage.querySelector('.popup__image').src = cardContent.querySelector('.place__image').src;
  popupImage.querySelector('.popup__image').alt = cardContent.querySelector('.place__image').alt;
  popupImage.querySelector('.popup__img-title').textContent = cardContent.querySelector('.place__name').textContent;
}
