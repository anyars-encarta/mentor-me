import { AppointmentTypes } from '@/constatnts'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import { MenteeFormValidation } from '@/lib/validation'
import CustomFormField from '@/components/CustomFormField'
import { FormFieldType } from '@/components/forms/MentorForm'
import { SelectItem } from '@/components/ui/select'
import { getMentee } from '@/lib/actions/mentee.actions'
import SubmitButton from '@/components/SubmitButton'
import { createAppointment } from '@/lib/actions/appointment.actions'
import { useRouter } from 'next/navigation'

const NewAppointmentForm = ({
    userId, type, isLoading, buttonLabel, form
}: {
    userId: string, isLoading: boolean, buttonLabel: string, type: 'create' | 'cancel' | 'schedule', form: any
}) => {
    // const [mentee, setMentee] = useState<any>(null);
    // const router = useRouter();
    
    // useEffect(() => {
    //     const fetchMentee = async () => {
    //         const fetchedMentee = await getMentee(userId);
    //         setMentee(fetchedMentee);
    //     }

    //     fetchMentee();
    // }, [userId]);

    // console.log('Mentee: ', mentee)

    // let buttonLabel;

    // switch (type) {
    //     case 'cancel':
    //         buttonLabel = 'Cancel Appointnment';
    //         break;

    //     case 'create':
    //         buttonLabel = 'Create Appointment';
    //         break;

    //     case 'schedule':
    //         buttonLabel = 'Schedule Appointment';
    //         break;
    //     default:
    //         break;
    // }

    // const onSubmit = async (values: z.infer<typeof MenteeFormValidation>) => {

    //     let status;

    //     switch (type) {
    //         case 'schedule':
    //             status = 'scheduled';
    //             break;

    //         case 'cancel':
    //             status = 'cancelled';
    //             break;

    //         default:
    //             status: 'Pending';
    //             break;
    //     }

    //     try {
    //         if (type === 'create' && mentee?.$id) {
    //             const appointmentData = {
    //                 userId,
    //                 mentee: mentee.$id,
    //                 appointmentType: values.appointmentType,
    //                 schedule: new Date(values.schedule),
    //                 reason: values.reason,
    //                 additionalComments: values.additionalComments,
    //                 status: status as Status,
    //             }

    //             const appointment = await createAppointment(appointmentData)

    //             if (appointment) {
    //                 form.reset();
    //                 router.push(`/mentees/${userId}/appointment/success?appointmentId=${appointment.id}`)
    //             }
    //         }

    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    return (
        <>
            <section className='space-y-6'>
                <div className='mb-9 space-y-1'>
                    <h2 className='sub-header'>Appointment Details</h2>
                </div>
            </section>

            {type !== 'cancel' && (
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
            )}

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
                className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}
            >
                {buttonLabel}
            </SubmitButton>
        </>
    )
}

export default NewAppointmentForm