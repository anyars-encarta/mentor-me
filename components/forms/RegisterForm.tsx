"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField, { FormFieldType } from "../CustomFormField"
import { useState } from "react"
import { MenteeFormValidation } from "@/lib/validation"
import { registerMentee } from "@/lib/actions/mentee.actions"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { GenderOptions, MenteeFormDefaultValues } from "@/constatnts"
import { Label } from "../ui/label"
import { createAppointment } from "@/lib/actions/appointment.actions"
import { useRouter } from "next/navigation"
import * as Sentry from '@sentry/nextjs';
import NewAppointmentForm from "@/app/mentees/[userId]/new-appointment/NewAppointmentForm"

const RegisterForm = ({ user }: { user: User }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof MenteeFormValidation>>({
        resolver: zodResolver(MenteeFormValidation),
        defaultValues: {
            ...MenteeFormDefaultValues,
            name: user.name,
            email: user.email,
            phone: user.phone,
            appointmentType: '',
            schedule: new Date(),
            reason: '',
            additionalComments: '',
            cancellationReason: '',
        },
    });

    let type = 'create' || 'cancel' || 'schedule' || 'meet' || 'complete';
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

        case 'complete':
            buttonLabel = 'Complete Appointment';
            break;
        default:
            break;
    }

    const onSubmit = async (values: z.infer<typeof MenteeFormValidation>) => {
        setIsLoading(true);

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

            default:
                status = 'pending';
                break;
        }

        try {
            // Register the mentee first
            const menteeData = {
                name: values.name,
                email: values.email,
                phone: values.phone,
                gender: values.gender,
                userId: user.$id,
            };

            const registeredMentee = await registerMentee(menteeData);

            Sentry.metrics.set("user_view_register", registeredMentee.name);

            // If mentee registration is successful, proceed with the appointment creation
            if (registeredMentee?.$id) {
                const appointmentData = {
                    userId: user.$id,
                    mentee: registeredMentee.$id,
                    appointmentType: values.appointmentType,
                    schedule: new Date(values.schedule),
                    reason: values.reason,
                    additionalComments: values.additionalComments,
                    cancellationReason: values.cancellationReason,
                    status: status as Status,
                };

                const appointment = await createAppointment(appointmentData);

                Sentry.metrics.set("user_view_new-appointment", appointment.mentee.name);

                if (appointment) {
                    form.reset();
                    router.push(`/mentees/${user.$id}/appointment/success?appointmentId=${appointment.$id}`)
                }
            }

            setIsLoading(false);
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className='space-y-4'>
                    <h1 className='header'>Welcome, {user.name} 👋</h1>
                    <p className='text-dark-700'>Request a new appointment in 10 seconds</p>
                </section>

                <section className='space-y-6'>
                    <div className='mb-9 space-y-1'>
                        <h2 className='sub-header'>Personal Information</h2>
                    </div>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name='name'
                    label='Full Name'
                    placeholder='John Doe'
                    iconSrc='/assets/icons/user.svg'
                    iconAlt='user'
                />

                <div className='flex flex-col gap-6 xl:flex-row'>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='email'
                        label='Email Address'
                        placeholder='mentee@something.com'
                        iconSrc='/assets/icons/email.svg'
                        iconAlt='email'
                    />

                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name='phone'
                        label='Phone Number'
                        placeholder='+234 012 345 6789'
                    />
                </div>

                <div className='flex flex-col gap-6 xl:flex-row'>
                    <CustomFormField
                        fieldType={FormFieldType.SEKELETON}
                        control={form.control}
                        name='gender'
                        label='Gender'
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup
                                    className='flex h-11 gap-6 xl:justify-between'
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {GenderOptions.map((option, i) => (
                                        <div key={option + i} className='radio-group'>
                                            <RadioGroupItem value={option} id={option} />
                                            <Label htmlFor={option} className='cursor-pointer'>{option}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>

                <NewAppointmentForm
                    type='create'
                    userId={user.$id}
                    form={form}
                    isLoading={isLoading}
                    buttonLabel={buttonLabel!}
                />
            </form>
        </Form>
    )
}

export default RegisterForm;