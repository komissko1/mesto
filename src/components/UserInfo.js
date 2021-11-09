
export default class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userName = userNameSelector,
    this._userJob = userJobSelector,
    this._name,
    this._job
  }
  getUserInfo() {
    return {name: this._userName.textContent, job: this._userJob.textContent};
  }

  setUserInfo(newName, newJob) {
    this._name = newName;
    this._job = newJob
  }

  updateUserInfo() {
    this._userName.textContent = this._name;
    this._userJob.textContent = this._job;
  }
}
