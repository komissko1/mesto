import Popup from "./Popup.js";
import {formSelectorsConfig} from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitForm }) {
    super(popupSelector),
    this._submitForm = submitForm,
    this._form = this._popup.querySelector(formSelectorsConfig.formSelector)
  }

  _getInputValues() {
    this._inputs = this._popup.querySelectorAll(formSelectorsConfig.inputSelector);
    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.id] = input.value});
    return this._inputValues;
  }

  getCardInfo() {
    this._getInputValues();
    this._cardInfo = {
      name: this._inputValues['placeName'],
      link: this._inputValues['placeImg'],
      likes: {}
    };
    return this._cardInfo;
  }

  getAvatarInfo() {
    this._getInputValues();
    this._avatarInfo = {
      link: this._inputValues['avatar'],
    };
    return this._avatarInfo;
  }


  setEventListeners() {
    this._form.addEventListener("submit", this._submitForm);
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}