import React from 'react';

function PopupWithForm({onClose, isOpen, onSubmit, title, name, buttonText='Сохранить', children}) {

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close" type="button" onClick={onClose}></button>
                <h2 className="popup__header">{title}</h2>
                <form className="popup__inputs" name={name} method="post" onSubmit={onSubmit}>
                    {children}
                    <button className="popup__button" type="submit">{buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;