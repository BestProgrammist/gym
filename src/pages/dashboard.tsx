import TaskForm from '@/components/forms/task-form'
import Filloader from '@/components/shared/filloader'
import TaskItem from '@/components/shared/task-item'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { db } from '@/firebase'
import { taskSchema } from '@/lib/validation'
import { TaskService } from '@/services/task.service'
import { useUserState } from '@/store/user.store'
import { ITask } from '@/types'
import { useQuery } from '@tanstack/react-query'
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	updateDoc,
} from 'firebase/firestore'
import { AlertCircle, BadgePlus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

function Dashboard() {
	const { user } = useUserState()
	const [isEditing, setisEditing] = useState(false)
	const [currentTask, setcurrentTask] = useState<ITask | null>(null)
	const [isDeleting, setisDeleting] = useState(false)

	const { isPending, data, error, refetch } = useQuery({
		queryKey: ['tasks-data'],
		queryFn: TaskService.getTasks,
	})

	const [open, setOpen] = useState(false)
	const onAdd = async ({ title }: z.infer<typeof taskSchema>) => {
		setOpen(true)
		if (!user) return null

		return addDoc(collection(db, 'tasks'), {
			title,
			status: 'unstarted',
			startTime: null,
			endTime: null,
			userId: user?.uid,
		})
			.then(() => refetch())
			.finally(() => setOpen(false))
	}
	const onUpdate = async ({ title }: z.infer<typeof taskSchema>) => {
		setisEditing(true)
		if (!user) return null
		if (!currentTask) return null

		const promise = updateDoc(doc(db, 'tasks', currentTask.id), { title })
			.then(() => refetch())
			.finally(() => setisEditing(false))

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully updeted',
			error: 'Something went wrong',
		})
		return promise
	}
	const onStartEditing = (task: ITask) => {
		setisEditing(true)
		setcurrentTask(task)
	}
	const onDelete = async (id: string) => {
		setisDeleting(true)
		if (!user) return null

		const promise = deleteDoc(doc(db, 'tasks', id))
			.then(() => refetch())
			.finally(() => setisDeleting(false))
		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully deleted',
			error: 'Something went wrong',
		})
		return promise
	}

	return (
		<>
			<div className='h-screen max-w-6xl mx-auto flex items-center'>
				<div className='grid grid-cols-2 rounded-sm w-full gap-8 items-center'>
					<div className='flex flex-col space-y-3 relative'>
						{isDeleting && <Filloader />}
						{isPending && <Filloader />}
						{error && (
							<Alert variant='destructive'>
								<AlertCircle className='h-4 w-4' />
								<AlertTitle>Error</AlertTitle>
								<AlertDescription>{error.message}</AlertDescription>
							</Alert>
						)}
						<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-t from-background to-secondary'>
							<div className='text-2xl font-bold'>Trainings</div>
							<Button onClick={() => setOpen(true)} size={'icon'}>
								<BadgePlus />
							</Button>
						</div>
						<Separator />
						{data && (
							<div className='w-full p-4 rounded-md flex flex-col gap-4 bg-gradient-to-b from-background to-secondary justify-between'>
								{!isEditing &&
									data.tasks.map(task => (
										<TaskItem
											key={task.id}
											task={task}
											onStartEditing={() => onStartEditing(task)}
											onDelete={() => onDelete(task.id)}
										/>
									))}
								{isEditing && (
									<TaskForm
										title={currentTask?.title}
										isEdit
										handler={
											onUpdate as (
												values: z.infer<typeof taskSchema>
											) => Promise<void | null>
										}
										onClose={() => setisEditing(false)}
									/>
								)}
							</div>
						)}
					</div>
					<div className='flex flex-col space-y-3 '>
						<div className='p-4 rounded-md bg-gradient-to-r from-blue-900 to-background relative h-20'>
							<div className='text-lg font-bold'>Total week</div>
							<div className='text-lg font-bold'>02:25:56</div>
						</div>
						<div className='p-4 rounded-md bg-gradient-to-r from-secondary to-background relative h-20'>
							<div className='text-lg font-bold'>Total week</div>
							<div className='text-lg font-bold'>02:25:56</div>
						</div>
						<div className='p-4 rounded-md bg-gradient-to-r from-destructive to-background relative h-20'>
							<div className='text-lg font-bold'>Total week</div>
							<div className='text-lg font-bold'>02:25:56</div>
						</div>
					</div>
				</div>
			</div>
			<Dialog open={open} onOpenChange={() => setOpen(false)}>
				<DialogTrigger></DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create a new task</DialogTitle>
						<Separator />
						<TaskForm
							handler={
								onAdd as (
									values: z.infer<typeof taskSchema>
								) => Promise<void | null>
							}
						/>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default Dashboard
