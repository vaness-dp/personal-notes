import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLoginMutation } from '../../hooks/useAuthPage'
import { IAuthFormLogin } from '../../types/types'
import { Button } from '../Button'
import { FormField } from '../FormField'
import './LoginForm.css'

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IAuthFormLogin>()
	const {
		mutate: login,
		isPending: isLoading,
		isError,
		error,
	} = useLoginMutation()

	const onSubmit: SubmitHandler<IAuthFormLogin> = formData => {
		login(formData)
	}

	useEffect(() => {
		if (isError && error) {
			alert('Неверный email или пароль')
			reset()
		}
	}, [isError, error, reset])

	return (
		<form className='login-form' onSubmit={handleSubmit(onSubmit)}>
			<FormField
				label='Email'
				type='email'
				register={register('email', {
					required: 'Email обязателен',
					minLength: { value: 5, message: 'Минимум 5 символов' },
					pattern: {
						value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
						message: 'Неверный формат email',
					},
				})}
				error={errors.email}
			/>

			<FormField
				label='Пароль'
				type='password'
				register={register('password', {
					required: 'Пароль обязателен',
					minLength: { value: 8, message: 'Минимум 8 символов' },
				})}
				error={errors.password}
			/>
			<Button type='submit' isLoading={isLoading}>
				Войти
			</Button>
		</form>
	)
}
