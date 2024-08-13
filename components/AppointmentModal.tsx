'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { Appointment } from "@/types/appwrite.types";
import NewAppointmentForm from "@/app/mentees/[userId]/new-appointment/NewAppointmentForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MenteeFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { MenteeFormDefaultValues } from "@/constatnts";
import UpdateAppointment from "./forms/UpdateAppointment";

const AppointmentModal = ({ type, menteeId, userId, appointment }: {
    type: 'schedule' | 'cancel' | 'meet' | 'complete',
    menteeId: string,
    userId: string,
    appointment: Appointment,
}) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setisLoading] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='ghost' className={`capitalize ${type === 'schedule' && 'text-green-500'}`}>{type}</Button>
            </DialogTrigger>

            <DialogContent className='shad-dialog sm:max-w-md'>
                <DialogHeader className='mb-4 space-y-3'>
                    <DialogTitle className='header capitalize'>{type} Appointment</DialogTitle>
                    <DialogDescription>
                        Please fill in the following details to <span className='text-green-500'>{type}</span> a <span className='text-green-500'>{appointment.appointmentType}</span> appointment for <span className='text-green-500'>{appointment.mentee.name}</span>.
                    </DialogDescription>
                </DialogHeader>

                <UpdateAppointment
                    type={type}
                    menteeId={menteeId}
                    userId={userId}
                    appointment={appointment}
                />
            </DialogContent>
        </Dialog>
    )
}

export default AppointmentModal