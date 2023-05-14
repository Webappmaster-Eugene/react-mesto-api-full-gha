import {useEffect, useRef, React} from 'react';

import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup({onClose, isOpen, onUpdateAvatar}) {

    const linkImageAvatar = useRef();

    //функция для изменения аватара пользователя при изменении
    function handleSubmitAvatar (event) {
        // Запрещаем браузеру переходить по адресу формы
        event.preventDefault();
        // Передаём значение рефа во внешний обработчик
        onUpdateAvatar({link: linkImageAvatar.current.value});
    };

    // Хук для изменения аватара профиля при изменении рефа
    // Нужен для обнуления input-а при открытии попапа
    useEffect(() => {
        if (isOpen) {
            linkImageAvatar.current.value = '';
        }
    }, [isOpen]);

    return (
        <PopupWithForm
            onClose={onClose} 
            isOpen={isOpen}
            onSubmit={handleSubmitAvatar}
            title='Обновить аватар' 
            name='change-avatar'
            buttonText='Создать' 
        >
            <>
                <input
                    ref={linkImageAvatar}
                    type="url" 
                    name="link" 
                    className="popup__input popup__input_type_photo" 
                    id="popup__input-error_photo-avatar" 
                    placeholder="Ссылка на картинку" 
                    required 
                />
                <span className="popup__input-error popup__input-error_photo-error">Some text</span>
            </>
        </PopupWithForm>
    )
}

export default EditProfilePopup;