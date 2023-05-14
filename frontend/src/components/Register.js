import {React} from 'react';
import AuthForm from './AuthForm.js';

function Register ({handleRegister}) {
    return <AuthForm handleFunction={handleRegister} headerForm="Регистрация" />
}

export default Register;