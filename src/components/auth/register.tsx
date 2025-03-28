import { auth } from '@/firebase'
import { registerSchema } from '@/lib/validation'
import { useAuthStore } from '@/store/auth.store'
import { useUserState } from '@/store/user.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUserWithEmailAndPassword } from 'firebase/auth'
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

export default function Register() {
	const { setAuth } = useAuthStore()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const { setUser } = useUserState()

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: '',
			password: '',
			repassword: '',
		},
	})
	const onSubmit = async (values: z.infer<typeof registerSchema>) => {
		const { email, password } = values
		setIsLoading(true)
		try {
			const res = await createUserWithEmailAndPassword(auth, email, password)
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
			<h2 className='text-xl font-bold'>Sign up</h2>
			<p className='text-muted-foreground'>
				Do you have an account?{' '}
				<span
					className='text-blue-500 cursor-pointer hover:underline'
					onClick={() => setAuth('login')}
				>
					Sign in
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
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder='example@gmail.com'
										disabled={isLoading}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='grid grid-cols-2 gap-3'>
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
						<FormField
							control={form.control}
							name='repassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm password</FormLabel>
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
					</div>
					<Button className='w-full h-10' type='submit'>
						Login
					</Button>
				</form>
			</Form>
		</div>
	)
}
