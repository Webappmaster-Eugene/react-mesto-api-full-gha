import React, { useContext } from 'react';

import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card({ dataCard, functionClick, functionDelete, functionLikeCard }) {
  //Определяем параметры (характеристики) карточки
  const idCard = dataCard._id;
  const name = dataCard.name;
  //Для того, чтобы задать изображение по умолчанию для карточки
  const srcPhoto =
    /jpeg|webp|jpg|png$/.test(dataCard.link) && dataCard.link !== undefined
      ? dataCard.link
      : 'https://oir.mobi/uploads/posts/2019-12/1576383100_7-8.jpg';
  const altPhoto = srcPhoto.replace(/.*/, `Photocard ${name}`);
  const cardOwner = dataCard.owner;
  //const createdDate = dataCard.createdAt;
  const likes = dataCard.likes;

  //Достаем данные о пользователе из контекста
  const infoProfile = useContext(CurrentUserContext);
  const currentUserId = infoProfile.currentUserId;

  //Для определения, можно ли показать иконку корзины на данной публикации
  const isOwner = cardOwner._id === currentUserId;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  let isLiked = likes.some((likeOfUser) => likeOfUser._id === currentUserId);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `place__like ${isLiked && 'place__like_active'}`;

  //Функция для просмотра публикации при нажатии на карточку (передаем в верхнюю функцию характеристики карточки)
  const handleClickCard = () => {
    functionClick({ name: name, srcImg: srcPhoto });
  };

  //Функция для удаления публикации (карточки Card) при нажатии на иконку корзины
  const handleDeleteClickCard = (event) => {
    event.stopPropagation();
    functionDelete(idCard);
  };

  //Функция для постановки лайка карточке
  function handleClickLikeCard(event) {
    event.stopPropagation();
    functionLikeCard(dataCard, isLiked);
  }

  return (
    <li className="place" onClick={handleClickCard}>
      <img className="place__photo" src={srcPhoto} alt={altPhoto} />
      {isOwner && (
        <button className="place__delete" type="button" onClick={handleDeleteClickCard}></button>
      )}
      <div className="place__info">
        <h2 className="place__name">{name}</h2>
        <div className="place__like-container">
          <p className="place__like-count">{likes.length}</p>
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleClickLikeCard}></button>
        </div>
      </div>
    </li>
  );
}

export default Card;
