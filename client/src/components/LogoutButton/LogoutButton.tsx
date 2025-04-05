import { useLogoutMutation } from '../../hooks/useAuthPage'
import { Button } from '../Button'
import './LogoutButton.css'

export const LogoutButton = () => {
	const { mutate: logout, isPending: isLoading } = useLogoutMutation()

	return (
		<div className='logout-button'>
			<Button kind='secondary' isLoading={isLoading} onClick={() => logout()}>
				Выйти
			</Button>
		</div>
	)
}
