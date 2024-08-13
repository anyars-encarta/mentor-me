'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation'

const CloseAdmin = () => {
    const router = useRouter();
    const handleExitAdmin = () => {
        localStorage.removeItem('accessKey');
        router.push('/')
    };

    return (
        <div>
            <Image
                src='/assets/icons/power.png'
                height={20}
                width={20}
                alt='logo'
                className='size-6 object-cover rounded-full cursor-pointer'
                onClick={handleExitAdmin}
            />
        </div>
    )
}

export default CloseAdmin