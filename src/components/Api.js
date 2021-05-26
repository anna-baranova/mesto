class Api {
    constructor({baseUrl, token}) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    getUserData() {
        return fetch (`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
        .then(result => result.ok ? result.json() : Promise.reject(result.status))
    }    

    getCards() {
        return fetch (`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._token
            }
        })
        .then(result => result.ok ? result.json() : Promise.reject(result.status))
    }

    changeUserData({data}) {
        return fetch (`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: '',  ////???
                about: ''
            })
        })
        .then(result => result.ok ? result.json() : Promise.reject(result.status))
    }

    changeAvatar() {
        return fetch (`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: ''  ////?
            })
        })
        .then(result => result.ok ? result.json() : Promise.reject(result.status))
    }

    createCard(data) {
        return fetch (`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: '', //откуда взять данные?
                link: ''
            })
        })
        .then(result => result.ok ? result.json() : Promise.reject(result.status))
    }

    removaCard() {
        return fetch (`${this._baseUrl}/cards/cardID`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(result => result.ok ? result.json() : Promise.reject(result.status))
    }

    likeCard() {
        return fetch (`${this._baseUrl}/cards/likes/cardID`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        })
        .then(result => result.ok ? result.json() : Promise.reject(result.status))
    }

    unlikeCard() {
        return fetch (`${this._baseUrl}/cards/likes/cardID`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(result => result.ok ? result.json() : Promise.reject(result.status))
    }


   

    
}

export default Api;