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