import {useRef, useEffect, React} from 'react';
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup ({onClose, isOpen, onAddPlace}) {

    //рефы инпутов формы - название публикации и ссылка на изображение карточки place
    const nameCard = useRef();
    const linkCard = useRef();

    //функция для изменения аватара пользователя при изменении
    function handleSubmitCardForm (event) {
        // Запрещаем браузеру переходить по адресу формы
        event.preventDefault();
        // Передаём значение рефа во внешний обработчик
        onAddPlace(nameCard.current.value, linkCard.current.value);
    };

    useEffect(() => {
        if (isOpen) {
            nameCard.current.value = '';
            linkCard.current.value = '';
        }
    }, [isOpen]);

    return (
        <PopupWithForm
            onClose={onClose} 
            isOpen={isOpen}
            onSubmit={handleSubmitCardForm}
            title='Новое место' 
            name='add-publication'
            buttonText='Создать'
        > 
            <>
                <input
                    ref={nameCard}
                    type="text"
                    name="name"
                    className=" popup__input popup__input_type_place" 
                    id="popup__input-error_place"
                    placeholder="Название"
                    required
                    minLength="2"
                    maxLength="30"
                />
                <span className="popup__input-error popup__input-error_place-error">Some text</span>
                <input
                    ref={linkCard}
                    type="url"
                    name="link"
                    className="popup__input popup__input_type_photo"
                    id="popup__input-error_photo"
                    placeholder="Ссылка на картинку"
                    required
                />
                <span className="popup__input-error popup__input-error_photo-error">Some text</span>
            </>
        </PopupWithForm>
    )
}

export default AddPlacePopup;