import { auth } from '@/firebase'
import { useUserState } from '@/store/user.store'
import { ReactNode, useEffect, useState } from 'react'
import Filloader from '../shared/filloader'

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { setUser } = useUserState()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			user && setUser(user)
		})
		setIsLoading(false)
	}, [])
	return isLoading ? <Filloader /> : <>{children}</>
}

export default AuthProvider
