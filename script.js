let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let saveButton = document.querySelector('.popup__save-button');
let closeButton = document.querySelector('.popup__close-button');


editButton.addEventListener('click', editProfile);
closeButton.addEventListener('click', closeForm);
saveButton.addEventListener('click', formSubmitHandler);

function editProfile() {
  let popup = document.querySelector('.popup');
  let name = document.querySelector('.profile__user-name').textContent;
  let job = document.querySelector('.profile__user-job').textContent;
  popup.classList.add('popup_opened');
  document.querySelector('.input__field_name').value = name;
  document.querySelector('.input__field_job').value = job;
}

function closeForm() {
  let popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  let nameInput = document.querySelector('.input__field_name').value;
  let jobInput = document.querySelector('.input__field_job').value;
  let name = document.querySelector('.profile__user-name');
  let job = document.querySelector('.profile__user-job');
  let popup = document.querySelector('.popup');
  evt.preventDefault();
  name.textContent = nameInput;
  job.textContent = jobInput;
  popup.classList.remove('popup_opened');
}
