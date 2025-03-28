import { auth } from '@/firebase'
import { useUserState } from '@/store/user.store'
import { LogOut, LucideLoader2 } from 'lucide-react'
import { CgGym } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export default function UserBox() {
	const navigate = useNavigate()
	const { user, setUser } = useUserState()

	const onLogout = () => {
		auth.signOut().then(() => {
			setUser(null)
			navigate('/auth')
		})
	}

	if (!user) return <LucideLoader2 />
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarImage src={user.photoURL!} />
					<AvatarFallback>{user.email![0].toUpperCase()}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='space-y-1'>
				<div className='flex flex-col space-y-1 p-2'>
					<p className='text-xs font-medium text-muted-foreground leading-none'>
						{user.email}
					</p>
					<div className='rounded-md bg-secondary p-1 flex items-center gap-1'>
						<Avatar>
							<AvatarImage src={user.photoURL!} />
							<AvatarFallback>{user.email![0].toUpperCase()}</AvatarFallback>
						</Avatar>
						<span className='line-clamp-1 text-sm'>
							{user.displayName ?? user.email}
						</span>
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => navigate('/dashboard')}
					className='cursor-pointer'
				>
					<CgGym className='w-4 h-4 mr-2' />
					GYM
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={onLogout}
					className='bg-destructive cursor-pointer'
				>
					<LogOut className='w-4 h-4 mr-2 ' />
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
