import { useEffect, useState } from 'react'
import './App.css'
import { AuthForm } from './components/AuthForm'
import { Layout } from './components/Layout'
import { Loader } from './components/Loader'
import { LogoutButton } from './components/LogoutButton'
import { NoteForm } from './components/NoteForm'
import { NotesListView } from './components/NotesListView'
import { UserView } from './components/UserView'
import AuthService from './services/auth.service'
import { useAuthStore } from './store/useAuthStore'

function App() {
	const setUser = useAuthStore(state => state.setUser)
	const user = useAuthStore(state => state.user)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			AuthService.getCurrentUser()
				.then(fetchedUser => {
					setUser(fetchedUser)
				})
				.catch(err => {
					console.error('Ошибка получения пользователя:', err)
					localStorage.removeItem('token')
				})
				.finally(() => {
					setLoading(false)
				})
		} else {
			setLoading(false)
		}
	}, [setUser])

	if (loading) {
		return <Loader />
	}

	return (
		<div className='app'>
			{user ? (
				<Layout>
					<UserView />
					<NoteForm />
					<NotesListView />
					<LogoutButton />
				</Layout>
			) : (
				<AuthForm />
			)}
		</div>
	)
}

export default App
