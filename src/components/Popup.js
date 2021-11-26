import { formSelectorsConfig } from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    (this._popup = popupSelector),
      (this._escClose = this._handleEscClose.bind(this)),
      (this._saveButton = popupSelector.querySelector(
        formSelectorsConfig.submitButtonSelector
      ));
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._escClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._escClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close-button")
      ) {
        this.close();
      }
    });
  }

  renderLoading(buttonState, method) {
    if (buttonState) {
      switch (method) {
        case "save":
          this._saveButton.textContent = "Сохранить...";
          break;
        case "delete":
          this._saveButton.textContent = "Удаление...";
          break;
      }
    } else {
      switch (method) {
        case "save":
          this._saveButton.textContent = "Сохранить";
          break;
        case "delete":
          this._saveButton.textContent = "Да";
          break;
      }
    }
  }
}
