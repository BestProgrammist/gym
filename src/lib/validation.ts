import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string().email('Please enetr your email address'),
	password: z.string().min(8),
})

export const registerSchema = z
	.object({
		email: z.string().email('Please enetr your email address'),
		password: z.string().min(8),
		repassword: z.string(),
	})
	.refine(data => data.password === data.repassword, {
		message: 'Password do not match',
		path: ['repassword'],
	})

export const taskSchema = z.object({
	title: z.string().min(5),
})
