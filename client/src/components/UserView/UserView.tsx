import React from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import './UserView.css'

export const UserView: React.FC = () => {
	const user = useAuthStore(state => state.user)
	console.log('User:', user)
	if (!user) return null

	const initial = user.username ? user.username.charAt(0).toUpperCase() : ''

	return (
		<div className='user-view'>
			<div className='user-view__logo'>{initial}</div>
			<span className='user-view__name'>{user.username || 'Unknown'}</span>
		</div>
	)
}
