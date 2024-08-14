"use client"

import { ColumnDef } from "@tanstack/react-table"

import StatusBadge from "../StatusBadge"
import { Appointment } from "@/types/appwrite.types"
import { formatDateTime } from "@/lib/utils"
import AppointmentModal from "../AppointmentModal"
import Image from "next/image"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export const columns: ColumnDef<Appointment>[] = [
    {
        header: 'ID',
        cell: ({ row }) => <p className='text-14-medium'>{row.index + 1}</p>,
        enableColumnFilter: false,
    },
    {
        accessorKey: 'mentee',
        header: 'Mentee',
        cell: ({ row }) => {
            return <p className='text-14-medium'>{row.original.mentee.name}</p>
        },
        enableColumnFilter: true,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className='min-w-[115px]'>
                <StatusBadge status={row.original.status} />
            </div>
        ),
        enableColumnFilter: true,
    },
    {
        accessorKey: "schedule",
        header: "Appointment Date",
        cell: ({ row }) => (
            <p className='text-14-medium'>
                {formatDateTime(row.original.schedule).dateTime}
            </p>
        ),
        enableColumnFilter: true,
    },
    {
        accessorKey: 'appointmentType',
        header: 'Appointment Type',
        cell: ({ row }) => {
            return <p className='text-14-medium'>{row.original.appointmentType}</p>
        },
        enableColumnFilter: true,
    },
    {
        accessorKey: 'email',
        header: 'Email Address',
        cell: ({ row }) => {
            return <p className='text-14-medium'>{row.original.mentee.email}</p>
        },
        enableColumnFilter: true,
    },
    {
        accessorKey: 'phone',
        header: 'Phone Contact',
        cell: ({ row }) => {
            return <p className='text-14-medium'>{row.original.mentee.phone}</p>
        },
        enableColumnFilter: true,
    },
    {
        id: "actions",
        header: () => <div>Actions</div>,
        cell: ({ row: { original: data } }) => {
            return (
                <div className='flex gap-2'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
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
                            </TooltipTrigger>
                            <TooltipContent className='bg-yellow-500'>
                                <p>Schedule appointment</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger>
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
                            </TooltipTrigger>
                            <TooltipContent className='bg-red-500'>
                                <p>Cancel appointment</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger>
                                <AppointmentModal
                                    type='meet'
                                    menteeId={data.mentee.$id}
                                    userId={data.userId}
                                    appointment={data}
                                    trigger={
                                        <Image
                                            src='/assets/icons/meet-cam.png'
                                            height={16}
                                            width={16}
                                            alt='meet'
                                            className=' size-6 w-fit cursor-pointer' />
                                    }
                                />
                            </TooltipTrigger>
                            <TooltipContent className='bg-blue-500'>
                                <p>Meet appointment</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger>
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
                                            className=' size-6 w-fit cursor-pointer rounded-full' />
                                    }
                                />
                            </TooltipTrigger>
                            <TooltipContent className='bg-green-500'>
                                <p>Complete appointment</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            )
        },
    },
]
