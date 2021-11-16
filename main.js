(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n){var r=e.card,o=e.handleCardClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._src=r.link,this._title=r.name,this._cardTemplate=n,this._handleCardClick=o}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return this._cardTemplate.cloneNode(!0)}},{key:"_addLike",value:function(){this.classList.toggle("place__like-button_active"),this.classList.toggle("place__like-button_inactive")}},{key:"_setEventListeners",value:function(){this._element.querySelector(".place__like-button").addEventListener("click",this._addLike),this._element.querySelector(".place__trash-button").addEventListener("click",this._deleteCard),this._element.querySelector(".place__image-button").addEventListener("click",this._handleCardClick)}},{key:"_deleteCard",value:function(){var e=this.closest(".place");e.querySelector(".place__trash-button").removeEventListener("click",this._deleteCard),e.querySelector(".place__like-button").removeEventListener("click",this._addLike),e.querySelector(".place__image-button").removeEventListener("click",this._handleCardClick),e.remove()}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._cardImage=this._element.querySelector(".place__image"),this._cardImage.src=this._src,this._cardImage.alt=this._title,this._element.querySelector(".place__name").textContent=this._title,this._setEventListeners(),this._element}}])&&e(n.prototype,r),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){var r=t.data,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderedItems=r,this._renderer=o,this._container=n}var t,r;return t=e,(r=[{key:"renderItems",value:function(){var e=this;this.clear(),this._renderedItems.forEach((function(t){e._renderer(t)}))}},{key:"appendItem",value:function(e){this._container.append(e)}},{key:"prependItem",value:function(e){this._container.prepend(e)}},{key:"clear",value:function(){this._container.innerHTML=""}}])&&n(t.prototype,r),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a=function(){function e(t,n){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),i(this,"_checkInputValidity",(function(e){e.validity.valid?r._hideInputError(e):r._showInputError(e,e.validationMessage)})),i(this,"_showInputError",(function(e,t){var n=r._form.querySelector("#".concat(e.id,"-alert"));e.classList.add(r._inputErrorClass),n.textContent=t,n.classList.add(r._errorClass)})),i(this,"_hideInputError",(function(e){var t=r._form.querySelector("#".concat(e.id,"-alert"));e.classList.remove(r._inputErrorClass),t.textContent="",t.classList.remove(r._errorClass)})),this._form=n,this._inputSelector=t.inputSelector,this._submitButtonSelector=this._form.querySelector(t.submitButtonSelector),this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._inputList=Array.from(this._form.querySelectorAll(this._inputSelector))}var t,n;return t=e,(n=[{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?(this._submitButtonSelector.classList.add(this._inactiveButtonClass),this._submitButtonSelector.disabled=!0):(this._submitButtonSelector.classList.remove(this._inactiveButtonClass),this._submitButtonSelector.disabled=!1)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"setValidation",value:function(){var e=this;this._form.addEventListener("submit",(function(e){e.preventDefault()})),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))}))}},{key:"resetValidation",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){e._hideInputError(t)}))}}])&&o(t.prototype,n),e}();function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=t,this._escClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._escClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._escClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("click",(function(t){(t.target.classList.contains("popup_opened")||t.target.classList.contains("popup__close-button"))&&e.close()}))}}])&&u(t.prototype,n),e}();function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e,t,n){return p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=_(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}},p(e,t,n||e)}function f(e,t){return f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},f(e,t)}function d(e,t){if(t&&("object"===s(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function _(e){return _=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},_(e)}var h=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=_(r);if(o){var n=_(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return d(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._title=t._popup.querySelector(".popup__img-title"),t._image=document.querySelector(".popup__image"),t}return t=a,(n=[{key:"open",value:function(e){this._image.src=e._src,this._image.alt=e._title,this._title.textContent=e._title,p(_(a.prototype),"open",this).call(this)}}])&&l(t.prototype,n),a}(c),y={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__save-button",inactiveButtonClass:"form__save-button_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"};function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(e,t,n){return b="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=S(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}},b(e,t,n||e)}function g(e,t){return g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},g(e,t)}function k(e,t){if(t&&("object"===v(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function S(e){return S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},S(e)}var w=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=S(r);if(o){var n=S(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return k(this,e)});function a(e){var t,n=e.popupSelector,r=e.submitForm;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,n))._submitForm=r,t._form=t._popup.querySelector(y.formSelector),t}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this._inputs=this._popup.querySelectorAll(y.inputSelector),this._inputValues={},this._inputs.forEach((function(t){e._inputValues[t.id]=t.value})),this._inputValues}},{key:"getCardInfo",value:function(){return this._getInputValues(),this._cardInfo={name:this._inputValues.placeName,link:this._inputValues.placeImg},this._cardInfo}},{key:"setEventListeners",value:function(){this._form.addEventListener("submit",this._submitForm),b(S(a.prototype),"setEventListeners",this).call(this)}},{key:"close",value:function(){b(S(a.prototype),"close",this).call(this),this._form.reset()}}])&&m(t.prototype,n),a}(c);function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var E=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userName=t,this._userJob=n}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._userName.textContent,job:this._userJob.textContent}}},{key:"setUserInfo",value:function(e,t){this._userName.textContent=e,this._userJob.textContent=t}}])&&C(t.prototype,n),e}(),L=document.querySelector(".places"),O=document.querySelector("#card-template").content,j=document.querySelector(".popup_type_image"),I=document.querySelector(".popup_type_edit"),q=document.querySelector(".popup_type_add"),P=document.querySelector(".profile__edit-button"),B=I.querySelector(".form"),x=document.querySelector(".profile__add-button"),R=q.querySelector(".form"),T=document.querySelector(".profile__user-name"),V=document.querySelector(".profile__user-job"),N=I.querySelector("#userName"),D=I.querySelector("#userJob");function F(e,n){var r=new t({card:e,handleCardClick:function(e){J.open(r)}},O),o=r.generateCard();"append"===n?U.appendItem(o):U.prependItem(o)}var J=new h(j);J.setEventListeners();var U=new r({data:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:function(e){F(e,"append")}},L);U.renderItems();var A=new w({popupSelector:q,submitForm:function(){F(A.getCardInfo(),"prepend"),A.close()}}),M=new a(y,R);M.setValidation(),x.addEventListener("click",(function(){M.resetValidation(),A.open()})),A.setEventListeners();var z=new E(T,V),H=new w({popupSelector:I,submitForm:function(){z.setUserInfo(N.value,D.value),H.close()}});P.addEventListener("click",(function(){var e=z.getUserInfo();N.value=e.name,D.value=e.job,H.open()})),H.setEventListeners(),new a(y,B).setValidation()})();