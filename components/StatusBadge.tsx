import { StatusIcon } from '@/constatnts'
import clsx from 'clsx'
import Image from 'next/image'

const StatusBadge = ({ status }: { status: Status }) => {
    console.log('Status', status)
    return (
        <div className={clsx('status-badge', {
            'bg-blue-600': status === 'scheduled',
            'bg-yellow-600': status === 'pending',
            'bg-red-600': status === 'cancelled',
            'bg-green-600': status === 'completed' || status === 'met',
        })}>
            <Image
                src={StatusIcon[status]}
                alt='status'
                width={24}
                height={24}
                className='h-fit w-3'
            />
            <p className={clsx('text-12-semibold capitalize', {
                'text-blue-500': status === 'scheduled',
                'text-yellow-500': status === 'pending',
                'text-red-500': status === 'cancelled',
                'text-green-500': status === 'completed' || status === 'met',
            })}>{status}</p>
        </div>
    )
}

export default StatusBadge