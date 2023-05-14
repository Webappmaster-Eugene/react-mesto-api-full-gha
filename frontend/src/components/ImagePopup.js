import React from 'react';

function ImagePopup({onClose, isOpen, name, srcImg}) {
    let altPhoto = `Photocard ${name}`;

    return (
        <div className={`popup popup_type_place ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_place">
                <img className="popup__photo" alt={altPhoto} src={srcImg} />
                <h2 className="popup__description">{name}</h2>
                <button className="popup__close" type="button" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default ImagePopup;