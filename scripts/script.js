let editButton = document.querySelector('.profile__edit-button');
let saveButton = document.querySelector('.popup__save-button');
let closeButton = document.querySelector('.popup__close-button');

let popup = document.querySelector('.popup');
let userName = document.querySelector('.profile__user-name');
let userJob = document.querySelector('.profile__user-job');
let inputName = document.getElementById('name');
let inputJob = document.getElementById('job');


editButton.addEventListener('click', editProfile);
closeButton.addEventListener('click', closeForm);
saveButton.addEventListener('click', formSubmitHandler);

function editProfile() {
  popup.classList.add('popup_opened');
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
}

function closeForm() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  popup.classList.remove('popup_opened');
}
