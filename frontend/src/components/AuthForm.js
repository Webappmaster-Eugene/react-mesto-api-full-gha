import { React, useState } from 'react';
import { Link } from 'react-router-dom';

function AuthForm({ handleFunction, headerForm }) {
  const [inputValues, setInputValues] = useState({ email: '', password: '' });

  function onChangeInputs(event) {
    const currentInput = event.target;
    setInputValues({
      ...inputValues,
      [currentInput.name]: currentInput.value,
    });
  }

  function handleFunctionForm(event) {
    event.preventDefault();
    handleFunction(inputValues.email, inputValues.password);
  }

  return (
    <div className="sign-block">
      <div className="sign">
        <h2 className="sign__header">{headerForm}</h2>
        <form className="sign__form" onSubmit={handleFunctionForm}>
          <div className="sign__inputs">
            <input
              type="email"
              name="email"
              className="sign__input sign__input_type_email"
              id="sign__input_error_email"
              placeholder="standardmail@mail.com"
              required
              minLength="5"
              maxLength="50"
              onChange={onChangeInputs}
              value={inputValues.email}
            />
            <input
              type="password"
              name="password"
              className="sign__input sign__input_type_password"
              id="sign__input_error_password"
              placeholder="qwerty"
              required
              minLength="6"
              maxLength="30"
              onChange={onChangeInputs}
              value={inputValues.password}
            />
          </div>
          <div className="sign__button-group">
            <button className="sign__button" type="submit">
              {headerForm === 'Регистрация' ? 'Зарегистрироваться' : 'Войти'}
            </button>
            {headerForm === 'Регистрация' && (
              <Link to="/sign-in" className="sign__bottom-text">
                Уже зарегистрированы? Войти
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
