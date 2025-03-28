import { auth } from '@/firebase'
import { loginSchema } from '@/lib/validation'
import { useAuthStore } from '@/store/auth.store'
import { useUserState } from '@/store/user.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import Filloader from '../shared/filloader'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Button } from '../ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'

export default function Login() {
	const { setAuth } = useAuthStore()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const { setUser } = useUserState()

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		const { email, password } = values
		setIsLoading(true)
		try {
			const res = await signInWithEmailAndPassword(auth, email, password)
			setUser(res.user)
			navigate('/')
		} catch (error) {
			const result = error as Error
			setError(result.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='flex flex-col'>
			<h2 className='text-xl font-bold'>Sign in</h2>
			<p className='text-muted-foreground'>
				Do you have not an account?{' '}
				<span
					className='text-blue-500 cursor-pointer hover:underline'
					onClick={() => setAuth('register')}
				>
					Sign up
				</span>
			</p>
			<Separator className='my-3' />
			{isLoading && <Filloader />}
			{error && (
				<Alert variant='destructive'>
					<AlertCircle className='h-4 w-4' />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										disabled={isLoading}
										placeholder='example@gmail.com'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										disabled={isLoading}
										placeholder='****'
										type='password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className='w-full h-10' type='submit'>
						Login
					</Button>
				</form>
			</Form>
		</div>
	)
}
