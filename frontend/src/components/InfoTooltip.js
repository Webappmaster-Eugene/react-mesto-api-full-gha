import React from 'react';
import yes from '../images/auth_images/green_checkmark.svg';
import no from '../images/auth_images/red_cross.svg';

function InfoTooltip({onClose, isOpen, status}) {

    return (
        <div className={`popup popup_type_authorize ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close" type="button" onClick={onClose}></button>
                <img src={status ? yes : no} alt={status ? 'Успех' : 'Неудача'} className="popup__authorize-image" />
                <h2 className="popup__authorize-description">{status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
            </div>
        </div>
    );
}

export default InfoTooltip;