import React, { useContext } from 'react';
import { useAuth } from '../../hooks/auth.hook';
import { AuthPopupContext } from '../../context/AuthPopup';
import { ScreenContext } from '../../context/ScreenContext';
import './Header.scss';

const Header = () => {
    const { isAuth, logout } = useAuth();

    const { isMobile } = useContext(ScreenContext);

    const { open } = useContext(AuthPopupContext);

    const logHandler = () => {
        if (isAuth) {
            return logout();
        }

        open();
    };

    return (
        <nav className="header-nav">
            <div className="nav-wrapper">
                <div className="header-links">
                    <a href={'/home'}>Home</a>
                    {!isMobile && <a href={'/search'}>Pick Film</a>}
                </div>
                <button className="nav-btn" onClick={logHandler}>
                    {isAuth ? 'Logout' : 'Login'}
                </button>
            </div>
        </nav>
    );
};

export default Header;
