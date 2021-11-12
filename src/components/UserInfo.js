
export default class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userName = userNameSelector,
    this._userJob = userJobSelector
  }
  
  getUserInfo() {
    return {name: this._userName.textContent, job: this._userJob.textContent};
  }

  setUserInfo(newName, newJob) {
    this._userName.textContent = newName;
    this._userJob.textContent = newJob;
  }
}
