export interface ITaskData {
	weekTotal: number
	monthTotal: number
	total: number
	tasks: ITask[]
}

export interface ITask {
	id: string
	title: string
	startTime: number
	endTime: number
	userId: string
	totalTime: number
	status: ITaskStatus
}

export type ITaskStatus = 'unstarted' | 'in_progress' | 'paused'
