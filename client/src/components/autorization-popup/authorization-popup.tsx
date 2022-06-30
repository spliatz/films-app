import React, { useContext, useState } from 'react';
import './authorization-popup.scss';
import { useAuth } from '../../hooks/auth.hook';
import { AuthPopupContext } from '../../context/AuthPopup';

const AuthorizationPopup = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const { login } = useAuth();

    const { close } = useContext(AuthPopupContext);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onClose = () => {
        close();
    };

    const onLoginHandler = () => {
        if (!validateEmail(form.email)) {
            alert('invalid email address');
            return false;
        }

        if (form.password.length < 5) {
            alert('password min length is 6 symbols');
            return false;
        }

        login();
        close();
    };

    return (
        <div className="auth-popup" onClick={onClose}>
            <div className="auth__content" onClick={(e) => e.stopPropagation()}>
                <div className="auth-header">
                    <h2>Authorization</h2>
                    <button onClick={onClose} />
                </div>
                <div className="form">
                    <label htmlFor="email">Email:</label>
                    <input name="email" type="email" value={form.email} onChange={changeHandler} />
                    <label htmlFor="password">Password:</label>
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={changeHandler}
                    />
                    <button className="form-button" onClick={onLoginHandler}>
                        login
                    </button>
                </div>
            </div>
        </div>
    );
};

function validateEmail(email: string) {
    const re =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
}

export default AuthorizationPopup;
