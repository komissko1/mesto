
export default class UserInfo {
  constructor(userNameSelector, userJobSelector, userPicSelector) {
    this._userName = userNameSelector,
    this._userJob = userJobSelector
    this._userPic = userPicSelector
  }

  getUserInfo() {
    return {name: this._userName.textContent, job: this._userJob.textContent};
  }

  setUserInfo(newName, newJob) {
    this._userName.textContent = newName;
    this._userJob.textContent = newJob;
  }

  setUserAvatar(newAvatar) {
    this._userPic.src = newAvatar;
  }
}
