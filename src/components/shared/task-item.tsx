import { ITask } from '@/types'
import { Edit2, Trash } from 'lucide-react'
import { CiPlay1 } from 'react-icons/ci'
import { HiStatusOnline } from 'react-icons/hi'
import { MdOutlineTaskAlt } from 'react-icons/md'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

interface Props {
	task: ITask
	onStartEditing: () => void
	onDelete: () => void
}

const TaskItem = ({ task, onStartEditing, onDelete }: Props) => {
	const onStart = () => {}
	const onPause = () => {}

	const renderBtns = () => {
		switch (task.status) {
			case 'unstarted':
				return (
					<Button size={'icon'} variant={'ghost'} className='w-8 h-8'>
						<CiPlay1 className='w-4 h-4 text-indigo-500' />
					</Button>
				)
			case 'in_progress':
				return (
					<Button size={'icon'} variant={'ghost'} className='w-8 h-8'>
						<CiPlay1 className='w-4 h-4 text-indigo-500' />
					</Button>
				)
			case 'paused':
				return (
					<Button size={'icon'} variant={'ghost'} className='w-8 h-8'>
						<CiPlay1 className='w-4 h-4 text-indigo-500' />
					</Button>
				)
		}
	}
	return (
		<Card className='w-full shadow-md grid grid-cols-4 items-center p-4'>
			<div className='col-span-2 flex items-center gap-1 '>
				<MdOutlineTaskAlt />
				<span>{task.title}</span>
			</div>
			<div className='flex items-center gap-1 '>
				<HiStatusOnline />
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
