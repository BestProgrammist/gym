import { taskSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

interface Props {
	title?: string
	isEdit?: boolean
	onClose?: () => void
	handler: (values: z.infer<typeof taskSchema>) => Promise<void | null>
}

const TaskForm = ({ title = '', handler, isEdit, onClose }: Props) => {
	const [isLoading, setisLoading] = useState(false)

	const form = useForm<z.infer<typeof taskSchema>>({
		resolver: zodResolver(taskSchema),
		defaultValues: {
			title,
		},
	})
	const onSubmit = async (values: z.infer<typeof taskSchema>) => {
		setisLoading(true)
		const promise = handler(values).finally(() => setisLoading(false))

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Success',
			error: 'Something went wron',
		})
	}

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className='mt-2'
										disabled={isLoading}
										placeholder='Enter a new task'
										{...field}
									/>
								</FormControl>
								<FormMessage />
								<div className='flex justify-end gap-2'>
									{isEdit && (
										<Button
											type='submit'
											variant={'destructive'}
											onClick={onClose}
										>
											Cancel
										</Button>
									)}
									<Button type='submit'>Create</Button>
								</div>
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</div>
	)
}

export default TaskForm
