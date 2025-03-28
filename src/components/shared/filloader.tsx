import { RiLoader4Fill } from 'react-icons/ri'
import { Skeleton } from '../ui/skeleton'

function Filloader() {
	return (
		<Skeleton className='absolute inset-0 w-full h-full opacity-10 z-50 flex justify-center items-center'>
			<RiLoader4Fill className='animate-spin w-10 h-10' />
		</Skeleton>
	)
}

export default Filloader
