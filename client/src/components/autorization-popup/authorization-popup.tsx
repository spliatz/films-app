import React, { useContext, useState } from 'react';
import './authorization-popup.scss';
import { useAuth } from '../../hooks/auth.hook';
import { AuthPopupContext } from '../../context/AuthPopup';
import useHttp from '../../hooks/http.hook';

const AuthorizationPopup = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const { request } = useHttp();
    const { login } = useAuth();
    const { close } = useContext(AuthPopupContext);

    const [isNewUser, setIsNewUser] = useState(true);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const switchNewUserHandler = () => {
        setForm({
            email: '',
            password: '',
        });
        setIsNewUser((prev) => !prev);
    };

    const onClose = () => {
        close();
    };

    const onLoginHandler = async () => {
        if (!validateEmail(form.email)) {
            alert('invalid email address');
            return false;
        }

        if (form.password.length < 5) {
            alert('password min length is 6 symbols');
            return false;
        }

        const body = { email: form.email, password: form.password };

        if (isNewUser) {
            const response = await request('/api/auth/register', 'POST', body, {});
            if (!response.token) throw new Error('something going wrong');
            login(response.token);
            close();
        } else {
            const response = await request('/api/auth/login', 'POST', body, {});
            if (!response.token) throw new Error('something going wrong');
            login(response.token);
            close();
        }
    };

    return (
        <div className="auth-popup" onClick={onClose}>
            <div className="auth__content" onClick={(e) => e.stopPropagation()}>
                <div className="auth-header">
                    <h2>{isNewUser ? 'Registration' : 'Authorization'}</h2>
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
                    <div className="buttons">
                        <button className="form-button" onClick={onLoginHandler}>
                            {isNewUser ? 'sign up' : 'sing in'}
                        </button>
                        <button className="auth-btn" onClick={switchNewUserHandler}>
                            {isNewUser ? 'have an account? sign in!' : 'no account? sign up!'}
                        </button>
                    </div>
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
