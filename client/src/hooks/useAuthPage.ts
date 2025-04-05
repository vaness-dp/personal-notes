import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AuthService from '../services/auth.service'
import { useAuthStore } from '../store/useAuthStore'
import { IAuthFormLogin, IAuthFormRegister, IUser } from '../types/types'

export const useLoginMutation = () => {
	const queryClient = useQueryClient()
	const setUser = useAuthStore(state => state.setUser)

	return useMutation<IUser, Error, IAuthFormLogin>({
		mutationKey: ['login'],
		mutationFn: (data: IAuthFormLogin) => AuthService.login(data),
		onSuccess: async data => {
			const token = (data as any).accessToken
			localStorage.setItem('token', token)
			const user = await AuthService.getCurrentUser()
			setUser(user)
			queryClient.invalidateQueries({ queryKey: ['currentUser'] })
		},
	})
}

export const useRegisterMutation = () => {
	const queryClient = useQueryClient()
	const setUser = useAuthStore(state => state.setUser)

	return useMutation<IUser, Error, IAuthFormRegister>({
		mutationKey: ['register'],
		mutationFn: (data: IAuthFormRegister) => AuthService.register(data),
		onError: error => {
			if ((error as any)?.response?.status === 409) {
				alert('Пользователь с таким email уже зарегистрирован')
			}
		},
		onSuccess: async data => {
			const token = (data as any).accessToken
			localStorage.setItem('token', token)
			const user = await AuthService.getCurrentUser()
			setUser(user)
			queryClient.invalidateQueries({ queryKey: ['currentUser'] })
		},
	})
}

export const useLogoutMutation = () => {
	const queryClient = useQueryClient()
	const clearUser = useAuthStore(state => state.clearUser)

	return useMutation<void, Error, void>({
		mutationKey: ['logout'],
		mutationFn: () => AuthService.logout(),
		onSuccess: () => {
			clearUser()
			localStorage.removeItem('token')
			queryClient.invalidateQueries({ queryKey: ['currentUser'] })
		},
	})
}

export const useCurrentUser = () => {
	return useQuery<IUser, Error>({
		queryKey: ['currentUser'],
		queryFn: () => AuthService.getCurrentUser(),
		enabled: false,
	})
}
