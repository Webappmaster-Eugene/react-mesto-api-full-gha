import {useState, useContext, useEffect, React} from 'react';

import PopupWithForm from "./PopupWithForm.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditProfilePopup({onClose, isOpen, onUpdateUser}) {
    const currentUserContext = useContext(CurrentUserContext);

    const [description, setDescription] = useState('');
    const [name, setName] = useState('');

    //функция для изменения имени пользователя при изменении
    function changeName (event) {
        setName(event.target.value);
    };

    function changeDescription (event) {
        setDescription(event.target.value);
    };

    function handleSubmitProfile (event) {
        // Запрещаем браузеру переходить по адресу формы
        event.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({ userName: name, userStatus: description });
    };

    // Нужно следить за isOpen (за состоянием открытия), 
    // чтобы вставлять в инпуты данные пользователя, иначе, 
    // если мы удалим информацию из инпутов и просто закроем попап, 
    // то при следующем открытии инпуты будут пустые (без данных пользователя)
    // Это своего рода сброс формы

    //Хук для изменения профиля при изменении имени и описания пользователя 
    useEffect(() => {
        setName(currentUserContext.userName);
        setDescription(currentUserContext.userDescription);
    }, [currentUserContext, isOpen]);

    
    return (
        <PopupWithForm 
            onClose={onClose} 
            isOpen={isOpen}
            onSubmit={handleSubmitProfile}
            title='Редактировать профиль' 
            name='change-profile'
        >
            <>
                <input 
                    type="text"
                    name="userName"
                    className=" popup__input popup__input_type_name"
                    id="popup__input-error_name"
                    placeholder="Иван Иванович"
                    required
                    minLength="2"
                    maxLength="40"
                    value={name || ''}
                    onChange={changeName}
                />
                <span className="popup__input-error popup__input-error_name-error">Some text</span>
                <input 
                    type="text"
                    name="userStatus"
                    className="popup__input popup__input_type_info"
                    id="popup__input-error_info"
                    placeholder="Покоритель пустоши"
                    required
                    minLength="2"
                    maxLength="200"
                    value={description || ''}
                    onChange={changeDescription}
                />
                <span className="popup__input-error popup__input-error_info-error">Some text</span>
            </>
        </PopupWithForm>
    )
}

export default EditProfilePopup;