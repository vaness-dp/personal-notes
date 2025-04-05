import { SubmitHandler, useForm } from 'react-hook-form'
import { useCreateNoteMutation } from '../../hooks/useNoteMutations'
import { IFormNote } from '../../types/types'
import { Button } from '../Button'
import { FormField } from '../FormField'
import './NoteForm.css'

export const NoteForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormNote>()

	const {
		mutate: createNote,
		isPending: isLoading,
		isError,
		error,
	} = useCreateNoteMutation()

	const onSubmit: SubmitHandler<IFormNote> = formData => {
		createNote(formData, {
			onSuccess: () => {
				reset()
			},
		})
	}

	return (
		<form className='note-form' onSubmit={handleSubmit(onSubmit)}>
			<FormField
				label='Заголовок'
				register={register('title', {
					required: 'Заголовок обязателен к заполнению',
					minLength: { value: 5, message: 'Минимум 5 символов' },
				})}
				error={errors.title}
			/>
			<FormField
				label='Текст'
				register={register('text', {
					required: 'Текст обязателен к заполнению',
					minLength: { value: 10, message: 'Минимум 10 символов' },
					maxLength: { value: 300, message: 'Максимум 300 символов' },
				})}
				error={errors.text}
			>
				<textarea />
			</FormField>
			{isError && <div className='error'>{(error as Error)?.message}</div>}
			<Button type='submit' isLoading={isLoading}>
				Сохранить
			</Button>
		</form>
	)
}
