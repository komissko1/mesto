import Popup from "./Popup.js";
import { formSelectorsConfig } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitForm }) {
    super(popupSelector),
      (this._submitForm = submitForm),
      (this._form = this._popup.querySelector(
        formSelectorsConfig.formSelector
      )),
      (this._inputs = this._popup.querySelectorAll(
        formSelectorsConfig.inputSelector
      ));
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.id] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    this._form.addEventListener("submit", () =>
      this._submitForm(this._getInputValues())
    );
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
