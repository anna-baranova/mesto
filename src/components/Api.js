class Api {
    constructor({baseUrl, token}) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    getFullData() {
        return Promise.all([this.getUserData(), this.getCards()])
    }

    getUserData() {
        return fetch (`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
        .then(res => this._getResponseData(res))
    }    

    getCards() {
        return fetch (`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._token
            }
        })
        .then(res => this._getResponseData(res))
    }

    changeUserData(data) {
        return fetch (`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data['input-name'],
                about: data['input-job']
            })
        })
        .then(res => this._getResponseData(res))
    }

    changeAvatar(data) {
        return fetch (`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data['input-avatar']
            })
        })
        .then(res => this._getResponseData(res))
    }

    createCard(data) {
        return fetch (`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data['input-place'],
                link: data['input-link']
            })
        })
        .then(res => this._getResponseData(res))
    }

    removeCard(id) {
        return fetch (`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(res => this._getResponseData(res))
    }

    likeCard(id) {
        return fetch (`${this._baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        })
        .then(res => this._getResponseData(res))
    }

    unlikeCard(id) {
        return fetch (`${this._baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(res => this._getResponseData(res))
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`${res.status}`); 
        }
        return res.json();
      }
    
}

export default Api;