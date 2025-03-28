import { auth } from '@/firebase'
import {
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth'
import { useState } from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import Filloader from '../shared/filloader'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

export default function Social() {
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const onGoogle = () => {
		setIsLoading(true)
		const googleProvider = new GoogleAuthProvider()
		signInWithPopup(auth, googleProvider)
			.then(() => {
				navigate('/')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}
	const onGithub = () => {
		setIsLoading(true)
		const githubProvider = new GithubAuthProvider()
		signInWithPopup(auth, githubProvider)
			.then(() => {
				navigate('/')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<>
			{isLoading && <Filloader />}
			<Separator className='my-3' />
			<div className='grid grid-cols-2 gap-3'>
				<Button variant={'secondary'} onClick={onGithub}>
					<FaGithub className='mr-2' />
					<span>Sign in with Github</span>
				</Button>
				<Button variant={'destructive'} onClick={onGoogle}>
					<FaGoogle className='mr-2' />
					<span>Sign in with Google</span>
				</Button>
			</div>
		</>
	)
}
