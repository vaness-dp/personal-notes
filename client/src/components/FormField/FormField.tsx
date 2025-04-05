import { cloneElement, FC, ReactNode } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import './FormField.css'

interface IFormFieldProps {
	label: string
	error?: FieldError
	register: UseFormRegisterReturn
	type?: string
	children?: ReactNode
}

export const FormField: FC<IFormFieldProps> = ({
	type = 'text',
	label,
	error,
	register,
	children,
}) => {
	return (
		<div className='form-field'>
			<label className='form-field__label'>{label}</label>
			{children ? (
				cloneElement(children as React.ReactElement, { ...register })
			) : (
				<input type={type} {...register} />
			)}
			{error && <span className='form-field__error-text'>{error.message}</span>}
		</div>
	)
}
