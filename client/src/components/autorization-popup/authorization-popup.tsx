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
    <div className="auth-popup">
      <div className="auth-header">
        <h2>Authorization</h2>
        <button onClick={onClose}>X</button>
      </div>
      <div className="form">
        <input name="email" type="email" value={form.email} onChange={changeHandler} />
        <input name="password" type="password" value={form.password} onChange={changeHandler} />
        <button className="form-button" onClick={onLoginHandler}>
          login
        </button>
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
