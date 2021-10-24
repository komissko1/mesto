export class FormValidator {
  constructor(indexes, form) {
    this.formSelector = indexes.formSelector;
    this.inputSelector = indexes.inputSelector;
    this.submitButtonSelector = indexes.submitButtonSelector;
    this.inactiveButtonClass = indexes.inactiveButtonClass;
    this.inputErrorClass = indexes.inputErrorClass;
    this.errorClass = indexes.errorClass;
    this.form = form;
  }

  _checkInputValidity = (inputField) => {
    if (!inputField.validity.valid) {
      this._showInputError(inputField, inputField.validationMessage);
    } else {
      this._hideInputError(inputField);
    }
  };

  _showInputError = (inputField, errorMessage) => {
    const errorAlert = inputField.nextElementSibling;
    inputField.classList.add(this.inputErrorClass);
    errorAlert.textContent = errorMessage;
    errorAlert.classList.add(this.errorClass);
  };

  _hideInputError = (inputField) => {
    const errorAlert = inputField.nextElementSibling;
    inputField.classList.remove(this.inputErrorClass);
    errorAlert.classList.remove(this.errorClass);
    errorAlert.textContent = "";
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputField) => {
      return !inputField.validity.valid;
    });
  }

  setValidation() {
    const inputList = Array.from(
      this.form.querySelectorAll(this.inputSelector)
    );
    const buttonElement = this.form.querySelector(this.submitButtonSelector);
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    inputList.forEach((inputField) => {
      inputField.addEventListener("input", () => {
        this._checkInputValidity(inputField);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
}
