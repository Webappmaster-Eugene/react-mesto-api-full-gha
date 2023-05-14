import {React, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import burgerLine from "../images/auth_images/line-burger.svg";
import burgerClose from "../images/auth_images/closeic.svg";

function Header({ logoLink, logoImage, loggedIn, email, handleAccounLogout}) {

    const location = useLocation();
    const [mobileView, setMobileView] = useState([true, false]);

    function cbBurgerToggle () {
        setMobileView([!mobileView[0], !mobileView[1]]);
    }

    return (
        <header className="header">
            {loggedIn &&
            <div className="header__block-signed-in header__block-signed-in_mobile">
                <div className={`header__inner-block-signed-mobile ${mobileView[1] && 'header__inner-block-signed-mobile_visible'}`}>
                    <p className="header__profile">{email}</p> 
                    <button className="header__sign" onClick={handleAccounLogout}>Выйти</button>
                </div>
            </div>
            }

            <div className="header-section header-section_signed">
                <a className="logo" href={logoLink}><img className="logo__image" src={logoImage} alt="Фотография логотипа" /></a>
                <div className="logo__info">

                
                
                {location.pathname === '/sign-in' && <Link to="/sign-up" className="header__sign">Регистрация</Link>}
                {location.pathname === '/sign-up' && <Link to="/sign-in" className="header__sign">Войти</Link>}
                

                {loggedIn &&
                <>
                    <div className="header__block-signed-in">
                        <div className="header__inner-block-signed">
                            <p className="header__profile">{email}</p> 
                            <button className="header__sign" onClick={handleAccounLogout}>Выйти</button>
                        </div>
                    </div>
                    
                    <div className="burger__menu">
                        <div className={`burger ${mobileView[0] && 'burger_visible'}`} onClick={cbBurgerToggle}>
                            <img src={burgerLine} className="burger__line" alt="бургер-меню" />
                            <img src={burgerLine} className="burger__line" alt="бургер-меню" />
                            <img src={burgerLine} className="burger__line" alt="бургер-меню" />
                        </div>
                        <img src={burgerClose} onClick={cbBurgerToggle} className={`burger__close ${mobileView[1] && 'burger__close_visible'}`} alt="закрыть меню"/>
                    </div>
                </>
                }

                    {/* <a className="logo__sign">Войти</a> */}
                    {/* <div className="burger">
                        <img src="./images/auth_images/line-burger.svg" className="burger__line" alt="бургер-меню" />
                        <img src="./images/auth_images/line-burger.svg" className="burger__line" alt="бургер-меню" />
                        <img src="./images/auth_images/line-burger.svg" className="burger__line" alt="бургер-меню" />
                    </div> */}
                    {/* <header className="header">
                            <a className="logo" href={logoLink}><img className="logo__image" src={logoImage} alt="Фотография логотипа" /></a>
                        </header> */
                    }
                    {/* <img src="./images/auth_images/closeic.svg" className="burger__close" alt="закрыть меню" /> */}
                </div>
            </div>
        </header>
    );
}

export default Header;