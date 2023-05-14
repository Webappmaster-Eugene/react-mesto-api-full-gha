import { useContext } from 'react';
import Card from './Card.js';

//Для работы контекста
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main({profilePen, profilePlus, onEditProfile, onAddPlace, onEditAvatar, handleCardPlaceClick, deleteCardClick, handleCardLikeClick, cards}) {

    //Достаем данные о пользователе из контекста
    const infoProfile = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" src={infoProfile.userAvatar} alt="Фотография пользователя" />
                    
                    <button className="profile__avatar-changer" type="button" onClick={onEditAvatar}></button>
                </div>

                <div className="profile__info">
                    <div className="profile__top-row">
                        <h1 className="profile__name">{infoProfile.userName}</h1>
                        
                        <button className="profile__changer" type="button" onClick={onEditProfile}>
                            <img className="profile__pen" src={profilePen} alt="Изменить профиль" />
                        </button>
                    </div>
                    <p className="profile__status">{infoProfile.userDescription}</p>
                </div>
                
                <button className="profile__new-post-add" type="button" onClick={onAddPlace}>
                    <img className="profile__plus" alt="Добавить новую публикацию" src={profilePlus} />
                </button>
            </section>

            <section className="places">
                <ul className="places__list">
                    {cards.map(elem => {
                        return <Card
                            key={elem._id}
                            dataCard={elem}
                            functionClick={handleCardPlaceClick}
                            functionDelete={deleteCardClick}
                            functionLikeCard={handleCardLikeClick}
                        />;
                    })}
                </ul>
            </section>
        </main>
    );
}

export default Main;