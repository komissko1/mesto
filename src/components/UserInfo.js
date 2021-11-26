export default class UserInfo {
  constructor(userNameSelector, userJobSelector, userPicSelector) {
    (this._userNameSelector = userNameSelector),
      (this._userJobSelector = userJobSelector),
      (this._userPicSelector = userPicSelector),
      this.name,
      this.about,
      this.avatar,
      this.id;
  }

  setUserInfo(user) {
    this.name = user.name;
    this.about = user.about;
    this.avatar = user.avatar;
    this.id = user._id;
  }

  renderUserInfo() {
    this._userNameSelector.textContent = this.name;
    this._userJobSelector.textContent = this.about;
    this._userPicSelector.src = this.avatar;
  }
}
