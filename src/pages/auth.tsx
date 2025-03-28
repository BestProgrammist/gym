import Login from '@/components/auth/login'
import Register from '@/components/auth/register'
import Social from '@/components/auth/social'
import { Card } from '@/components/ui/card'
import { useAuthStore } from '@/store/auth.store'

export default function Auth() {
	const { authState } = useAuthStore()

	return (
		<div className='w-full h-screen bg-gradient-to-t from-foreground to-background flex items-center justify-center'>
			<Card className='w-1/3 p-5 relative'>
				{authState === 'login' && <Login />}
				{authState === 'register' && <Register />}
				<Social />
			</Card>
		</div>
	)
}
