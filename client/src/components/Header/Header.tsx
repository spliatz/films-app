import React, { useContext } from 'react';
import { useAuth } from '../../hooks/auth.hook';
import './Header.scss';
import { AuthPopupContext } from '../../context/AuthPopup';

const Header = () => {
    const { isAuth, logout } = useAuth();

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
                <a href={'/home'}>Home</a>
                <button className="nav-btn" onClick={logHandler}>
                    {isAuth ? 'Logout' : 'Login'}
                </button>
            </div>
        </nav>
    );
};

export default Header;
