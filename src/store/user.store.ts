import { User } from 'firebase/auth'
import { create } from 'zustand'

type UserType = User | null

interface IUserStateStore {
	isLoading: boolean
	user: UserType
	setUser: (user: UserType) => void
}

export const useUserState = create<IUserStateStore>(set => ({
	isLoading: true,
	user: null,
	setUser: user => set({ user, isLoading: false }),
}))
