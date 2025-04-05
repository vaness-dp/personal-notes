import { useState } from 'react'
import { LoginForm } from '../LoginForm'
import { RegisterForm } from '../RegisterForm'
import './AuthForm.css'

type AuthType = 'register' | 'auth'

export const AuthForm = () => {
	const [authType, setAuthType] = useState<AuthType>('register')

	const handleClick = () => {
		setAuthType(prevState => (prevState === 'register' ? 'auth' : 'register'))
	}

	const title = authType === 'register' ? 'Регистрация' : 'Авторизация'
	const switchQuestion =
		authType === 'register' ? 'Уже есть аккаунт?' : 'Ещё нет аккаунта?'
	const switchButtonText = authType === 'register' ? 'Войти' : 'Создать аккаунт'

	return (
		<div className='auth-form'>
			<p className='auth-form__title'>{title}</p>
			{authType === 'register' ? <RegisterForm /> : <LoginForm />}
			<div className='auth-form__info'>
				<span>{switchQuestion}</span>
				<button className='auth-form__button' onClick={handleClick}>
					{switchButtonText}
				</button>
			</div>
		</div>
	)
}
