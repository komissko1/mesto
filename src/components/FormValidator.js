export default class FormValidator {
  constructor(indexes, form) {
    this._form = form;
    this._inputSelector = indexes.inputSelector;
    this._submitButtonSelector = this._form.querySelector(indexes.submitButtonSelector);
    this._inactiveButtonClass = indexes.inactiveButtonClass;
    this._inputErrorClass = indexes.inputErrorClass;
    this._errorClass = indexes.errorClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  }

  _checkInputValidity = (inputField) => {
    if (!inputField.validity.valid) {
      this._showInputError(inputField, inputField.validationMessage);
    } else {
      this._hideInputError(inputField);
    }
  };

  _showInputError = (inputField, errorMessage) => {
    const errorAlert = this._form.querySelector(`#${inputField.id}-alert`);
    inputField.classList.add(this._inputErrorClass);
    errorAlert.textContent = errorMessage;
    errorAlert.classList.add(this._errorClass);
  };

  _hideInputError = (inputField) => {
    const errorAlert = this._form.querySelector(`#${inputField.id}-alert`);
    inputField.classList.remove(this._inputErrorClass);
    errorAlert.textContent = "";
    errorAlert.classList.remove(this._errorClass);
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
    this._submitButtonSelector.classList.add(this._inactiveButtonClass);
    this._submitButtonSelector.disabled = true;
    } else {
      this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
      this._submitButtonSelector.disabled = false;
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputField) => {
      return !inputField.validity.valid;
    });
  }

  setValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._inputList.forEach((inputField) => {
      inputField.addEventListener("input", () => {
        this._checkInputValidity(inputField);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputField) => {
      this._hideInputError(inputField);
    });
  }
}
