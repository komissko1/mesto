import Popup from "./Popup.js";
import {indexes} from "../pages/index.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitForm }) {
    super(popupSelector),
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this._inputs = Array.from(this._popup.querySelectorAll(indexes.inputSelector));
    this._inputValues = { input0: this._inputs[0].value, input1: this._inputs[1].value };
    return this._inputValues;
  }

  getCardInfo() {
    this._getInputValues();
    this._cardInfo = {
      name: this._inputValues.input0,
      link: this._inputValues.input1
    };
    return this._cardInfo;
  }


  setEventListeners() {
    this._popup
      .querySelector(indexes.formSelector)
      .addEventListener("submit", this._submitForm);
    super.setEventListeners();
  }

  close() {
    this._popup.querySelector(indexes.formSelector).reset();
    super.close();
  }
}
