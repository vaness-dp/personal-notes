import { create } from 'zustand'
import { IUser } from '../types/types'

interface IAuthState {
	user: IUser | null
	setUser: (user: IUser) => void
	clearUser: () => void
}

export const useAuthStore = create<IAuthState>(set => ({
	user: null,
	setUser: (user: IUser) => set({ user }),
	clearUser: () => set({ user: null }),
}))
