const indexes = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const enableValidation = (indexes) => {
  const formList = Array.from(document.querySelectorAll(indexes.formSelector));
  formList.forEach((formElement) => {
    setFormEventListeners(formElement, indexes);
  });
};

const setFormEventListeners = (formElement, indexes) => {
  const inputList = Array.from(formElement.querySelectorAll(indexes.inputSelector));
  const buttonElement = formElement.querySelector(indexes.submitButtonSelector);
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
  switch (formElement.name) {
    case "add-form":
      buttonElement.addEventListener("click", submitAddCard);
    break;

    case "edit-form":
      buttonElement.addEventListener("click", submitEditProfile);
    break;
  }
  inputList.forEach((inputField) => {
    inputField.addEventListener("input", () => {
      checkInputValidity(inputField, indexes);
      toggleButtonState(inputList, buttonElement, indexes);
      });
    inputField.addEventListener("keydown", keyHandler)
    });
};

const checkInputValidity = (inputField, indexes) => {
  if (!inputField.validity.valid) {
    showInputError(inputField, inputField.validationMessage, indexes);
  } else {
    hideInputError(inputField, indexes);
  }
};

const showInputError = (inputField, errorMessage, indexes) => {
  const errorAlert = inputField.nextElementSibling;
  inputField.classList.add(indexes.inputErrorClass);
  errorAlert.textContent = errorMessage;
  errorAlert.classList.add(indexes.errorClass);
};

const hideInputError = (inputField, indexes) => {
  const errorAlert = inputField.nextElementSibling;
  inputField.classList.remove(indexes.inputErrorClass);
  errorAlert.classList.remove(indexes.errorClass);
  errorAlert.textContent = "";
};

function toggleButtonState(inputList, buttonElement, indexes) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(indexes.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(indexes.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputField) => {
    return !inputField.validity.valid;
  });
}

function keyHandler(evt, indexes) {
  if (evt.key === "Enter") {
    const currentForm = evt.target.closest(indexes.formSelector);
    const inputList = Array.from(currentForm.querySelectorAll(indexes.inputSelector));
    switch (hasInvalidInput(inputList)) {
      case false:
        if (currentForm.name === "add-form") {submitAddCard}
        else {submitEditProfile}
      break;
      case true:
        return;
    }
  }
}

enableValidation(indexes);

