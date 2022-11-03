class UserInfo {
    constructor({userNameSelector, userJobSelector, userAvatarSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userJob = document.querySelector(userJobSelector);
        this._userAvatar = document.querySelector(userAvatarSelector)
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            job: this._userJob.textContent,
            avatar: this._userAvatar.src,     
        }
    }

    setUserInfo(name, job, avatar, id) {
        this._userName.textContent = name
        this._userJob.textContent = job
        this._userAvatar.src = avatar
        this._id = id
    }    

    getUserId() {
        return this._id
    }
}

export default UserInfo;