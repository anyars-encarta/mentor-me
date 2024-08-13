"use client"

import { ColumnDef } from "@tanstack/react-table"

import StatusBadge from "../StatusBadge"
import { Appointment } from "@/types/appwrite.types"
import { formatDateTime } from "@/lib/utils"
import AppointmentModal from "../AppointmentModal"
import Image from "next/image"

export const columns: ColumnDef<Appointment>[] = [
    {
        header: 'ID',
        cell: ({ row }) => <p className='text-14-medium'>{row.index + 1}</p>,
    },
    {
        accessorKey: 'mentee',
        header: 'Mentee',
        cell: ({ row }) => {
            return <p className='text-14-medium'>{row.original.mentee.name}</p>
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className='min-w-[115px]'>
                <StatusBadge status={row.original.status} />
            </div>
        ),
    },
    {
        accessorKey: "schedule",
        header: "Appointment Date",
        cell: ({ row }) => (
            <p className='text-14-medium'>
                {formatDateTime(row.original.schedule).dateTime}
            </p>
        )
    },
    {
        accessorKey: 'appointmentType',
        header: 'Appointment Type',
        cell: ({ row }) => {
            return <p className='text-14-medium'>{row.original.appointmentType}</p>
        }
    },
    {
        accessorKey: 'email',
        header: 'Email Address',
        cell: ({ row }) => {
            return <p className='text-14-medium'>{row.original.mentee.email}</p>
        }
    },
    {
        accessorKey: 'phone',
        header: 'Phone Contact',
        cell: ({ row }) => {
            return <p className='text-14-medium'>{row.original.mentee.phone}</p>
        }
    },
    {
        id: "actions",
        header: () => <div className='pl-4'>Actions</div>,
        cell: ({ row: { original: data } }) => {
            return (
                <div className='flex gap-2'>
                    <AppointmentModal
                        type='schedule'
                        menteeId={data.mentee.$id}
                        userId={data.userId}
                        appointment={data}
                        trigger={
                            <Image
                                src='/assets/icons/appointments.svg'
                                height={16}
                                width={16}
                                alt='schedule'
                                className=' size-6 w-fit cursor-pointer' />
                        }
                    />

                    <AppointmentModal
                        type='cancel'
                        menteeId={data.mentee.$id}
                        userId={data.userId}
                        appointment={data}
                        trigger={
                            <Image
                                src='/assets/icons/cancelled.svg'
                                height={16}
                                width={16}
                                alt='cancel'
                                className=' size-6 w-fit cursor-pointer' />
                        }
                    />

                    <AppointmentModal
                        type='meet'
                        menteeId={data.mentee.$id}
                        userId={data.userId}
                        appointment={data}
                        trigger={
                            <Image
                                src='/assets/icons/meet.png'
                                height={16}
                                width={16}
                                alt='meet'
                                className=' size-6 w-fit cursor-pointer' />
                        }
                    />

                    <AppointmentModal
                        type='complete'
                        menteeId={data.mentee.$id}
                        userId={data.userId}
                        appointment={data}
                        trigger={
                            <Image
                                src='/assets/icons/check.svg'
                                height={16}
                                width={16}
                                alt='cancel'
                                className=' size-6 w-fit cursor-pointer' />
                        }
                    />
                </div>
            )
        },
    },
]
