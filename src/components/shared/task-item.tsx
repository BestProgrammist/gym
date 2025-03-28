import { db } from '@/firebase'
import { cn } from '@/lib/utils'
import { ITask } from '@/types'
import { doc, updateDoc } from 'firebase/firestore'
import { Edit2, Trash } from 'lucide-react'
import { useState } from 'react'
import { CiPause1, CiPlay1 } from 'react-icons/ci'
import { HiStatusOnline } from 'react-icons/hi'
import { MdOutlineTaskAlt } from 'react-icons/md'
import { RxReload } from 'react-icons/rx'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import Filloader from './filloader'

interface Props {
	task: ITask
	onStartEditing: () => void
	refetch: () => void
	onDelete: () => void
}

const TaskItem = ({ task, onStartEditing, onDelete, refetch }: Props) => {
	const [isLoading, setisLoading] = useState(false)
	const onStart = async () => {
		setisLoading(true)
		const ref = doc(db, 'tasks', task.id)

		const promise = updateDoc(ref, {
			status: 'in_progress',
			startTime: Date.now(),
		})
			.then(() => refetch())
			.finally(() => setisLoading(false))

		return promise
	}
	const onPause = async () => {
		setisLoading(true)
		const ref = doc(db, 'tasks', task.id)
		const ellapsed = task.startTime ? Date.now() - task.startTime : 0
		const newTotaltime = (task.totalTime || 0) + ellapsed
		const promise = updateDoc(ref, {
			status: 'paused',
			endTime: Date.now(),
			totalTime: newTotaltime,
		})
			.then(() => refetch())
			.finally(() => setisLoading(false))

		return promise
	}

	const renderBtns = () => {
		switch (task.status) {
			case 'unstarted':
				return (
					<Button
						size={'icon'}
						variant={'ghost'}
						className='w-8 h-8'
						onClick={onStart}
					>
						<CiPlay1 className='w-4 h-4 text-indigo-500' />
					</Button>
				)
			case 'in_progress':
				return (
					<Button
						size={'icon'}
						variant={'ghost'}
						className='w-8 h-8'
						onClick={onPause}
					>
						<CiPause1 className='w-4 h-4 text-indigo-500' />
					</Button>
				)
			case 'paused':
				return (
					<Button size={'icon'} variant={'ghost'} className='w-8 h-8'>
						<RxReload className='w-4 h-4 text-indigo-500' />
					</Button>
				)
		}
	}
	return (
		<Card className='w-full shadow-md grid grid-cols-4 items-center p-4'>
			{isLoading && <Filloader />}
			<div className='col-span-2 flex items-center gap-1 '>
				<MdOutlineTaskAlt className='text-blue-500' />
				<span>{task.title}</span>
			</div>
			<div className='flex items-center gap-1 '>
				<HiStatusOnline
					className={cn(
						task.status === 'unstarted' && 'text-blue-500',
						task.status === 'in_progress' && 'text-green-500',
						task.status === 'paused' && 'text-red-500'
					)}
				/>
				<span>{task.status}</span>
			</div>
			<div className='flex items-center gap-1 justify-self-end'>
				{renderBtns()}
				<Button
					size={'icon'}
					variant={'ghost'}
					className='w-8 h-8 bg-secondary'
					onClick={onStartEditing}
				>
					<Edit2 className='w-4 h-4' />
				</Button>
				<Button
					size={'icon'}
					variant={'ghost'}
					className='w-8 h-8 bg-destructive'
					onClick={onDelete}
				>
					<Trash className='w-4 h-4' />
				</Button>
			</div>
		</Card>
	)
}

export default TaskItem
