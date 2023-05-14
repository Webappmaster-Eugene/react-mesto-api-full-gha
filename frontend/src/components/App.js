/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from 'react'; //Основные хуки для взаимодействия

//Для работы навигации в приложении
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

// ProtectedRoute для защиты роутов от незаконного доступа
import ProtectedRouteElement from './ProtectedRoute.js';

// Компоненты для входа и регистрации пользователей
import Login from './Login.js';
import Register from './Register.js';

//Ошибка 404 - Страница не найдена при неправильном роуте
import Error from './Error.js';

// Header
import logoImage from '../images/svg_icons/logo.svg';
import Header from './Header.js';

// Footer
import Footer from './Footer.js';

// Spiner
import Spiner from './Spiner.js';

// Main
import profilePen from '../images/svg_icons/pen1.svg';
import profilePlus from '../images/svg_icons/plus1.svg';
import Main from './Main.js';

//Для работы с попапами c формами для изменений
import PopupWithForm from './PopupWithForm.js';

//Для работы с попапом изменения профиля пользователя
import EditProfilePopup from './EditProfilePopup.js';

//Для работы с попапом изменения аватара пользователя
import EditAvatarPopup from './EditAvatarPopup.js';

//Для работы с попапом карточки place
import ImagePopup from './ImagePopup.js';

//Для работы с попапом добавления новой карточки place в places
import AddPlacePopup from './AddPlacePopup.js';

//НОВЫЙ ПОПАП для работы с формой регистрации/логина
import InfoTooltip from './InfoTooltip.js';

//Для работы по API карточек places
import apiCall from '../utils/api.js';

//Для работы c API авторизации/регистрации
import apiCallAuthorize from '../utils/api-authorize.js';

//Для работы контекста "Текущего пользователя" - currentUser
import CurrentUserContext from '../contexts/CurrentUserContext.js';

// Header
let logoLink = '#';

function App() {
  // Стейты для проверки появления\скрытия попапа
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isCardPhotoPopupOpen, setIsCardPhotoPopupOpen] = useState(false);

  // Попап удачного/неудачного входа в приложение
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipStatus, setInfoTooltipStatus] = useState(false);

  // Есть ли сейчас выбранная карточка, которая показывается в попапе просмотра place
  const [selectedCard, setSelectedCard] = useState({});

  // Неиспользуемый попап для подтверждения удаления
  // const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);

  //Стейт текущего пользователя в системе
  const [currentUser, setCurrentUser] = useState({});

  //Стейт для работы с карточками
  const [cards, setCards] = useState([]);

  // Стейты для работы авторизации/регистрации
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserMail, setCurrentUserMail] = useState('');

  // Стейт для работы с заставкой - лоадером, чтобы пользователь не видел процесс загрузки
  const [isAppLoading, setIsAppLoading] = useState(true);

  // Хук useEffect для проверки - есть ли в localStorage jwt-токен для автоматического входа в приложение при загрузке сайта
  useEffect(() => {
    checkToken();
  }, []);

  // Хуки useEffect для изменения состояний state в процессе
  useEffect(() => {
    if (isLoggedIn) {
      apiCall
        .getInitialCards()
        // тут деструктурируется ответ от сервера, чтобы было понятнее, что пришло
        .then((cardsArray) => {
          setCards(cardsArray);
        })
        .catch((err) => {
          console.log(
            `Ошибка при получении данных о пользователе или генерации карточек по умолчанию с сервера: ${err}`,
          );
        });
    }
  }, [isLoggedIn]);

  //Автоматическое обновление данных о профиле через API
  useEffect(() => {
    if (isLoggedIn) {
      apiCall
        .getInfoProfile()
        // тут деструктурируется ответ от сервера, чтобы было понятно, что пришло
        .then((userData) => {
          setCurrentUser({
            userName: userData.name,
            userDescription: userData.about,
            userAvatar: userData.avatar,
            currentUserId: userData._id,
          });
        })
        .catch((err) => {
          console.log(`Ошибка при получении данных о пользователе от сервера: ${err}`);
        });
    }
  }, [isLoggedIn]);

  // Записываем сюда функцию для навигации по страницам приложения
  const navigate = useNavigate();

  // Функция для закрытия всех открытых попапов
  function closePopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsCardPhotoPopupOpen(false);
    // setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);

    setSelectedCard({});
  }

  // Открыть попап изменения аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // Открыть попап изменения имя профиля и статуса
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // Открыть попап добавления новой карточки с местом
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // Открыть попап просмотра карточки place
  function handleCardPlaceClick({ name, srcImg }) {
    setSelectedCard({ name, srcImg });
    setIsCardPhotoPopupOpen(true);
  }

  // Открыть попап уверенности в удалении карточки
  function handleDeleteCardClick() {
    // setIsDeleteCardPopupOpen(true);
  }

  //Обработка удаления карточки place при нажатии на иконку корзины
  function deleteCardClick(cardId) {
    apiCall
      .deleteCard(cardId)
      .then((message) => {
        console.log(message);
        setCards((cards) => cards.filter((card) => card._id !== cardId));
      })
      .catch((err) => {
        console.log(`Ошибка при удалении карточки с сервера: ${err}`);
      });
  }

  //Обработка лайка/дислайка карточки при нажатии на иконку
  function handleCardLikeClick(card, isLiked) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    apiCall
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((cardFromState) =>
            cardFromState._id === newCard._id ? newCard : cardFromState,
          ),
        );
      })
      .catch((err) => {
        console.log(`Ошибка при при постановке/удалении лайка: ${err}`);
      });
  }

  //Функция обработки обновления имени и описания пользователя через попап - служит для обновления currentUser контекста
  function handleUpdateUser(newInfoObject) {
    apiCall
      .changeInfoProfile(newInfoObject)
      //тут деструктурируется ответ от сервера, чтобы было понятнее, что пришло
      .then((userData) => {
        setCurrentUser({
          ...currentUser,
          userName: userData.name,
          userDescription: userData.about,
        });
        closePopups();
      })
      .catch((err) => {
        console.log(`Ошибка при изменении данных пользователя (имя, статус) от сервера: ${err}`);
      });
  }

  //Обработка изменения аватара пользователя
  function handleUpdateAvatar(newAvatarObject) {
    apiCall
      .changeAvatarProfile(newAvatarObject)
      //тут деструктурируется ответ от сервера, чтобы было понятнее, что пришло
      .then((userData) => {
        setCurrentUser({
          ...currentUser,
          userAvatar: userData.avatar,
        });
        closePopups();
      })
      .catch((err) => {
        console.log(`Ошибка при изменении аватара пользователя на сервера: ${err}`);
      });
  }

  //Обработка добавления новой карточки place
  function handleAddPlaceSubmit(name, link) {
    apiCall
      .addNewCard({ name, link })
      //тут деструктурируется ответ от сервера, чтобы было понятнее, что пришло
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closePopups();
      })
      .catch((err) => {
        console.log(`Ошибка при добавлении новой публикации - карточки place на сервер: ${err}`);
      });
    // .finally(() => {
    // });
  }

  // регистрация профиля
  async function handleRegisterForm(email, password) {
    try {
      const dataRes = await apiCallAuthorize.signUpProfile({ email: email, password: password });
      if (dataRes) {
        setInfoTooltipStatus(true);
        navigate('/sign-in', { replace: true });
      } else {
        setInfoTooltipStatus(false);
        throw new Error('Ошибка регистрации');
      }
    } catch (error) {
      console.log(
        `Возникла ощибка при попытке входа. Вы ввели неверный логин/пароль, повторите попытку или зарегистрируйте новый аккаунт: ${error}`,
      );
    } finally {
      setIsInfoTooltipOpen(true);
    }
  }

  // войти в систему под профилем
  async function handleLoginForm(email, password) {
    try {
      const dataRes = await apiCallAuthorize.signInProfile({ email: email, password: password });
      if (dataRes) {
        localStorage.setItem('token', dataRes.token);
        setCurrentUserMail(email);
        setIsLoggedIn(true);
        navigate('/main', { replace: true });
      } else {
        throw new Error('Ошибка авторизации');
      }
    } catch (error) {
      console.log(
        `Возникла ошибка при попытке входа. Вы ввели неверный логин/пароль, повторите попытку или зарегистрируйте новый аккаунт: ${error}`,
      );
    }
  }

  // Функция для выхода из профиля в приложении
  function handleSignout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCurrentUserMail('');
    navigate('/sign-in', { replace: true });
  }

  async function checkToken() {
    try {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        const response = await apiCallAuthorize.checkProfileToken(token);

        if (response) {
          setCurrentUserMail(response.data.email);
          setIsLoggedIn(true);
          navigate('/main', { replace: true });
        } else {
          throw new Error('Ошибка проверки токена в localstorage');
        }
      }
    } catch (error) {
      console.log(
        `Возникла ощибка при сверке токена с локальным хранилищем. Авторизуйтесь заново или зарегистрируйтесь: ${error}`,
      );
    } finally {
      setIsAppLoading(false);
    }
  }

  return (
    <div className="html">
      {isAppLoading ? (
        <Spiner />
      ) : (
        <body className="page">
          <CurrentUserContext.Provider value={currentUser}>
            <Header
              logoLink={logoLink}
              logoImage={logoImage}
              loggedIn={isLoggedIn}
              email={currentUserMail}
              handleAccounLogout={handleSignout}
            />

            <Routes>
              <Route
                path="/"
                element={
                  isLoggedIn ? <Navigate to="/main" replace /> : <Navigate to="/sign-in" replace />
                }
              />
              <Route
                path="/main"
                element={
                  <ProtectedRouteElement
                    element={Main}
                    profilePen={profilePen}
                    profilePlus={profilePlus}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    handleCardPlaceClick={handleCardPlaceClick}
                    deleteCardClick={deleteCardClick}
                    handleCardLikeClick={handleCardLikeClick}
                    cards={cards}
                    loggedIn={isLoggedIn}
                  />
                }
              />
              <Route path="/sign-up" element={<Register handleRegister={handleRegisterForm} />} />
              <Route path="/sign-in" element={<Login handleLogin={handleLoginForm} />} />
              <Route path="*" element={<Error />} />
            </Routes>

            <Footer />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closePopups}
              onUpdateUser={handleUpdateUser}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closePopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <PopupWithForm
              onClose={closePopups}
              isOpen={false}
              title="Вы уверены?"
              name="type_sure"
              buttonText="Да"
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closePopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <ImagePopup
              onClose={closePopups}
              isOpen={isCardPhotoPopupOpen}
              name={selectedCard.name}
              srcImg={selectedCard.srcImg}
            />

            <InfoTooltip
              onClose={closePopups}
              isOpen={isInfoTooltipOpen}
              status={infoTooltipStatus}
            />
          </CurrentUserContext.Provider>
        </body>
      )}
    </div>
  );
}

export default App;
