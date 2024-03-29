import { apiUrlOptions } from './apiData.js'; //Настройки для работы с API 

class Api {
    constructor(options) {
        this._options = options;
    }

    //Общий метод для обработки запросов к серверу (success\error)
    async getApiResponse(result) {
        if (result.ok) {
            return result.json();
        } else {
            return Promise.reject(`Ошибка вызова API: ${result.status}`)
        }
    };

    //Получить имя и статус для профиля при обновлении страницы
    async getInfoProfile() {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this._options.authorizationToken,
                'Content-Type': this._options.contentTypeAppJson
            },
        })
        .then(res => this.getApiResponse(res));
    }

    //Изменить статус и имя профиля при отправке попапа
    async changeInfoProfile(newInfoObject) {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._options.authorizationToken,
                'Content-Type': this._options.contentTypeAppJson
            },
            body: JSON.stringify({
                name: newInfoObject.userName,
                about: newInfoObject.userStatus
            })
        })
        .then(res => this.getApiResponse(res));
    }

    //Сделать изначальные карточки с сервера
    async getInitialCards() {
        return fetch(`${this._options.baseUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: this._options.authorizationToken,
                'Content-Type': this._options.contentTypeAppJson
            },
        })
        .then(res => this.getApiResponse(res));
    }

    //Добавить одну новую карточку на сервер и в профиль
    async addNewCard(cardData) {
        return fetch(`${this._options.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._options.authorizationToken,
                'Content-Type': this._options.contentTypeAppJson
            },
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link
            })
        })
        .then(res => this.getApiResponse(res));
    }

    //Удалить карточку (можно тольку свою)
    async deleteCard(idCard) {
        return fetch(`${this._options.baseUrl}/cards/${idCard}`, {
            method: 'DELETE',
            headers: {
                authorization: this._options.authorizationToken,
                'Content-Type': this._options.contentTypeAppJson
            },
        })
        .then(res => this.getApiResponse(res));
    }

    //Поставить лайк карточке place
    async makeLikeToCard(idCard) {
        return fetch(`${this._options.baseUrl}/cards/${idCard}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._options.authorizationToken,
                'Content-Type': this._options.contentTypeAppJson
            },
        })
        .then(res => this.getApiResponse(res));
    }

    //Снять лайк с карточки place
    async deleteLikeFromCard(idCard) {
        return fetch(`${this._options.baseUrl}/cards/${idCard}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._options.authorizationToken,
                'Content-Type': this._options.contentTypeAppJson
            },
        })
        .then(res => this.getApiResponse(res));
    }

    //Функция для быстрого toggle лайка карточки
    async changeLikeCardStatus(idCard, isLiked) {
        if (isLiked) {
            return this.deleteLikeFromCard(idCard);
        }
        else {
            return this.makeLikeToCard(idCard);
        }
    }

    //Поменять аватарку для пользователя
    async changeAvatarProfile(newAvatarObject) {
        return fetch(`${this._options.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._options.authorizationToken,
                'Content-Type': this._options.contentTypeAppJson
            },
            body: JSON.stringify({
                avatar: newAvatarObject.link
            })
        })
        .then(res => this.getApiResponse(res));
    }
}

//Обращение к API для операций
const apiCall = new Api(apiUrlOptions);

export default apiCall;