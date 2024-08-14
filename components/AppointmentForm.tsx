import { AppointmentTypes } from '@/constatnts'
import CustomFormField, { FormFieldType } from '@/components/CustomFormField'
import { SelectItem } from '@/components/ui/select'
import SubmitButton from '@/components/SubmitButton'
import { Form, useForm } from 'react-hook-form'
import { AppointmentFormValidation } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Appointment } from '@/types/appwrite.types'

const AppointmentForm = ({
    userId, menteeId, type, appointment, setOpen
}: {
    userId: string, menteeId: string, setOpen: (open: boolean) => void, type: 'cancel' | 'schedule' | 'meet' | 'complete', appointment: Appointment
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            appointmentType: '',
            schedule: new Date(),
            reason: '',
            additionalComments: '',
            cancellationReason: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
        setIsLoading(true);

    };
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className='space-y-6'>
                    <div className='mb-9 space-y-1'>
                        <h2 className='sub-header'>Appointment Details</h2>
                    </div>
                </section>

                {/* {type !== 'cancel' && (
                    <>
                        <div className='flex flex-col gap-6 xl:flex-row'>
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
                        </div>

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
                )} */}

                {type === 'cancel' && (
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name='cancellationReason'
                        label='Reason for Cancellation'
                        placeholder='Enter reason for cancellation'
                    />
                )} 

                <SubmitButton
                    isLoading={isLoading}
                    className= 'shad-primary-btn w-full'
                >
                    Schedule
                </SubmitButton> 
            </form>
        </Form>
    )
}

export default AppointmentForm