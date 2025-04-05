import { axiosClassic } from '../api/axios'
import { IAuthFormLogin, IAuthFormRegister, IUser } from '../types/types'

class AuthService {
	async login(data: IAuthFormLogin) {
		const response = await axiosClassic.post<IUser>('login', data)
		return response.data
	}

	async register(data: IAuthFormRegister) {
		const response = await axiosClassic.post<IUser>('register', data)
		return response.data
	}

	async getCurrentUser() {
		const response = await axiosClassic.get<IUser>('users/me')
		return response.data
	}

	async logout() {
		await axiosClassic.post<boolean>('logout')
	}
}

export default new AuthService()
