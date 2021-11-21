export default class Api {
  constructor(apiConfig) {
    (this._cardsUrl = apiConfig.cardsUrl),
      (this._userUrl = apiConfig.userUrl),
      (this._headers = apiConfig.headers);
  }

  async getCardsData() {
    const res = await fetch(this._cardsUrl, { headers: this._headers });
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Server is not responding");
  }

  getUserData() {
    return fetch(this._userUrl, { headers: this._headers }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Server is not responding");
    });
  }

  async postCardData(newName, newLink) {
    const res = await fetch(this._cardsUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        link: newLink,
      }),
    });
    return await res.json();
  }

  patchUserData(newName, newJob) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newJob,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Server is not responding");
    });
  }

  deleteCardData(cardId) {
    console.log(`this._cardsUrl${cardId}`);
    return fetch(`this._cardsUrl${cardId}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newJob,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Server is not responding");
    });
  }
}
