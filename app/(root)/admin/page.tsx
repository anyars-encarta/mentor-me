import CloseAdmin from '@/components/CloseAdmin'
import StatCard from '@/components/StatCard'
import { columns } from '@/components/table/columns'
import { DataTable } from '@/components/table/DataTable'
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions'
import Image from 'next/image'
import Link from 'next/link'

const Admin = async () => {
    const appointments = await getRecentAppointmentList();

    return (
        <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
            <header className='admin-header'>
                <Link href='/' className='cursor-pointer'>
                    <Image
                        src='/assets/icons/logo-full.png'
                        height={32}
                        width={162}
                        alt='logo'
                        className='h-8 w-fit'
                    />
                </Link>

                <div className='flex gap-2 items-center'>
                    <p className='text-16-semibold'>Admin Dashboard</p>
                    <CloseAdmin />
                </div>

            </header>

            <main className='admin-main'>
                <section className='w-full space-y-4'>
                    <h1 className='header'>Welcome, admin 👋</h1>
                    <p className='text-dark-700'>Start the day with manageing new appointments</p>
                </section>

                <section className='admin-stat'>
                    <StatCard
                        type='appointments'
                        count={appointments.scheduledCount}
                        label='Scheduled appointments'
                        icon='/assets/icons/appointments.svg'
                    />

                    <StatCard
                        type='pending'
                        count={appointments.pendingCount}
                        label='Pending appointments'
                        icon='/assets/icons/pending.svg'
                    />

                    <StatCard
                        type='cancelled'
                        count={appointments.cancelledCount}
                        label='Cancelled appointments'
                        icon='/assets/icons/cancelled.svg'
                    />

                    <StatCard
                        type='completed'
                        count={appointments.completedCount}
                        label='Completed appointments'
                        icon='/assets/icons/check.svg'
                    />
                </section>

                <DataTable columns={columns} data={appointments.documents} />
            </main>
        </div>
    )
}

export default Admin