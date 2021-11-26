import Popup from "./Popup.js";
import { formSelectorsConfig } from "../utils/constants.js";

export default class PopupWithWarning extends Popup {
  constructor({ popupSelector, submitForm }) {
    super(popupSelector),
      (this._submitForm = submitForm),
      (this._form = this._popup.querySelector(
        formSelectorsConfig.formSelector
      ));
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm();
    });
    super.setEventListeners();
  }
}
