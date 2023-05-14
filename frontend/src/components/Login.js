import {React} from 'react';
import AuthForm from './AuthForm.js';

function Login ({handleLogin}) {
    return <AuthForm handleFunction={handleLogin} headerForm="Войти" />
}

export default Login;