import { apiUrlAuthorizeOptions } from './apiAuthorizeData.js'; //Настройки для работы с API авторизации

class ApiAuthorize {
    constructor(options) {
        this._options = options;
    }

    //Общий метод для обработки запросов к серверу (success\error)
    async getApiResponse(result) {
        if (result.ok) {

            return result.json();

        } else {
            return Promise.reject(`Ошибка вызова API авторизации: ${result.status}`)
        }
    };

    //Общая функция для отправки запросов к серверу
    async commonAuthorizeFunction(path, method, additionalHeaders = {}, bodyObject) {
        let config = {
            method,
            headers: {
                "Content-Type": this._options.contentTypeAppJson,
                ...additionalHeaders
            }
        };

        if (bodyObject !== {}) {
            config.body = JSON.stringify(bodyObject);
        }

        return fetch(`${this._options.baseUrl}/${path}`, config)
        .then(res => this.getApiResponse(res));
    };

    // регистрация профиля
    async signUpProfile(body) {
        return this.commonAuthorizeFunction('signup', 'POST', {}, body);
    }

    // войти в систему под профилем
    async signInProfile(body) {
        return this.commonAuthorizeFunction('signin', 'POST', {}, body);
    }

    //проверить валидность токена
    async checkProfileToken(token) {
        return this.commonAuthorizeFunction('users/me', 'GET', {"Authorization": `Bearer ${token}`});
    }
}

const apiCallAuthorize = new ApiAuthorize(apiUrlAuthorizeOptions);

export default apiCallAuthorize;

// регистрация профиля
// apiCallAuthorize.signUpProfile(
// {
//     "password": "!qwertY32@",
//     "email": "james.hotmail@mail.ru"
// }
// );

// войти в систему под профилем
// apiCallAuthorize.signInProfile(
//     {
//         "password": "!qwertY32@",
//         "email": "james.hotmail@mail.ru"
//     }
// );

// проверить валидность токена
// apiCallAuthorize.checkProfileToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJjNGZhZGQ0NTY3YzAwMTMxZWFjM2EiLCJpYXQiOjE2ODA2MjgwMTJ9.wDacz1WSYP-U7YpoBEHBkS8YGNMjiqfu75VjxSbQ6vI");