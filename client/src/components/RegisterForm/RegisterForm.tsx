import { SubmitHandler, useForm } from 'react-hook-form'
import { useRegisterMutation } from '../../hooks/useAuthPage'
import { IAuthFormRegister } from '../../types/types'
import { Button } from '../Button'
import { FormField } from '../FormField'
import './RegisterForm.css'

export const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IAuthFormRegister>()
	const { mutate: registerUser, isPending: isLoading } = useRegisterMutation()

	const onSubmit: SubmitHandler<IAuthFormRegister> = formData => {
		registerUser(formData)
	}

	return (
		<form className='register-form' onSubmit={handleSubmit(onSubmit)}>
			<FormField
				label='Имя'
				register={register('username', {
					required: 'Имя пользователя обязательно',
					minLength: { value: 5, message: 'Минимум 5 символов' },
				})}
				error={errors.username}
			/>
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
				Зарегистрироваться
			</Button>
		</form>
	)
}
