"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField, { FormFieldType } from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { AppointmentFormValidation } from "@/lib/validation"
import { Appointment } from "@/types/appwrite.types"
import { AppointmentTypes } from "@/constatnts"
import { SelectItem } from "../ui/select"
import { updateAppointment } from "@/lib/actions/appointment.actions"
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast";
import { formatDateTime } from "@/lib/utils"

const UpdateAppointment = ({
    type, menteeId, userId, appointment, setOpen
}: {
    type: 'create' | 'schedule' | 'cancel' | 'meet' | 'complete',
    menteeId: string,
    userId: string,
    appointment?: Appointment,
    setOpen: (open: boolean) => void,
}) => {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: '',
    });
    const [callDetails, setCallDetails] = useState<Call>();

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            appointmentType: appointment ? appointment.appointmentType : '',
            schedule: appointment ? new Date(appointment.schedule) : new Date(Date.now()),
            reason: appointment ? appointment.reason : '',
            additionalComments: appointment ? appointment.additionalComments : '',
            cancellationReason: appointment?.cancellationReason || '',
        },
    });

    let buttonLabel;

    switch (type) {
        case 'cancel':
            buttonLabel = 'Cancel Appointnment';
            break;

        case 'create':
            buttonLabel = 'Book Appointment';
            break;

        case 'schedule':
            buttonLabel = 'Schedule Appointment';
            break;

        case 'meet':
            buttonLabel = 'Meet Appointment';
            break;

        case 'complete':
            buttonLabel = 'Complete Appointment';
            break;
        default:
            break;
    }

    const createMeeting = async () => {
        console.log('Client ', client)
        console.log('User ', user)
        if (!client || !user) return;
        
        try {
            const id = appointment?.meetingId;
            console.log('Appointment ID ', id)
            const call = client.call('default', id);

            if (!call) throw new Error('Failed to create call');

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant meeting';

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })

            setCallDetails(call);
            if (!values.description) {
                router.push(`/meeting/${call.id}`)
            }
        } catch (e) {
            console.log(e)
            toast({
                title: "Failed to create meeting",
              })
        }
    };

    const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
        setIsLoading(true)

        let status;

        switch (type) {
            case 'schedule':
                status = 'scheduled';
                break;

            case 'cancel':
                status = 'cancelled';
                break;

            case 'complete':
                status = 'completed';
                break;

            case 'meet':
                status = 'met';
                break;

            default:
                status = 'pending';
                break;
        }

        try {
            if (type === 'meet' && menteeId) {
                // Start Meeting
                createMeeting();
            } else {
                const meetingId = crypto.randomUUID();

                const appointmentToUpdate = {
                    userId,
                    appointmentId: appointment?.$id!,
                    appointment: {
                        appointmentType: values?.appointmentType,
                        schedule: new Date(values?.schedule),
                        reason: values?.reason,
                        additionalComments: values?.additionalComments,
                        cancellationReason: values?.cancellationReason,
                        status: status as Status,
                        meetingId: meetingId,
                    },
                    type,
                }

                const updatedAppointed = await updateAppointment(appointmentToUpdate);

                if (updatedAppointed) {
                    setOpen && setOpen(false);
                    form.reset();
                }

                toast({
                    title: "Scheduled: Meeting",
                    description: `${formatDateTime(appointment?.schedule!).dateTime}`,
                  })
            }
        } catch (e) {
            console.log(e);
            toast({
                title: `Failed to ${type} the appointment`,
              })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                {type !== 'cancel' && (
                    <>
                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name='appointmentType'
                            label='Appointment Type'
                            placeholder='Select Type of Appointment'
                        >
                            {AppointmentTypes.map((appointment, i) => (
                                <SelectItem key={appointment + i} value={appointment}>
                                    {appointment}
                                </SelectItem>
                            ))}
                        </CustomFormField>

                        <CustomFormField
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name='schedule'
                            label='Expected appointment date'
                            showTimeSelect
                            dateFormat='MM/dd/yyyy - h:mm aa'
                        />

                        <div className='flex flex-col gap-6 xl:flex-row'>
                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name='reason'
                                label='Reason for Appointment'
                                placeholder='Briefly describe the reason for your appointment'
                            />

                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name='additionalComments'
                                label='Additional Comments'
                                placeholder='Example: I would prefer weekends and probably in the afternoon'
                            />
                        </div>
                    </>
                )}

                {type === 'cancel' && (
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name='cancellationReason'
                        label='Reason for Cancellation'
                        placeholder='Enter reason for cancellation'
                    />)
                }

                <SubmitButton
                    isLoading={isLoading}
                    className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}
                >
                    {buttonLabel}
                </SubmitButton>
            </form>
        </Form>
    )
}

export default UpdateAppointment;