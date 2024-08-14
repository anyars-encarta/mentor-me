'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const CloseAdmin = () => {
    const router = useRouter();
    const handleExitAdmin = () => {
        localStorage.removeItem('accessKey');
        router.push('/')
    };

    return (
        <div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Image
                            src='/assets/icons/power.png'
                            height={20}
                            width={20}
                            alt='logo'
                            className='size-6 object-cover rounded-full cursor-pointer'
                            onClick={handleExitAdmin}
                        />
                    </TooltipTrigger>
                    <TooltipContent className='bg-red-500'>
                        <p>Exit Admin Dashboard</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

export default CloseAdmin