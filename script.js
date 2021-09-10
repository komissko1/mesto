let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let saveButton = document.querySelector('.popup__save-button');
let closeButton = document.querySelector('.popup__close-button');


editButton.addEventListener('click', editProfile);
closeButton.addEventListener('click', closeForm);
saveButton.addEventListener('click', formSubmitHandler);

function editProfile() {
  let popup = document.querySelector('.popup');
  let inputs = document.querySelectorAll('input');
  let name = document.querySelector('.profile__user-name').textContent;
  let job = document.querySelector('.profile__user-job').textContent;
  popup.classList.add('popup_opened');
  inputs[0].value = name;
  inputs[1].value = job;
}

function closeForm() {
  let popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  let inputs = document.querySelectorAll('input');
  let name = document.querySelector('.profile__user-name');
  let job = document.querySelector('.profile__user-job');
  let popup = document.querySelector('.popup');
  evt.preventDefault();
  name.textContent = inputs[0].value;
  job.textContent = inputs[1].value;
  popup.classList.remove('popup_opened');
}
