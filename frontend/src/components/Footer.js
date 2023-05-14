import React from 'react';

function Footer() {
    // Дата с текущим годом для Footer 
    const date = new Date();
    const currentYearDate = date.getFullYear();

    return (
        <footer className="footer">
            <p className="footer__copyright">© {currentYearDate} Mesto by ©Webappmaster</p>
        </footer>
    );
}

export default Footer;