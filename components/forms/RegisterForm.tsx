"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { MenteeFormValidation } from "@/lib/validation"
import { registerMentee } from "@/lib/actions/mentee.actions"
import { FormFieldType } from "./MentorForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { GenderOptions, MenteeFormDefaultValues } from "@/constatnts"
import { Label } from "../ui/label"
import { useRouter } from "next/navigation"
import NewAppointmentForm from "@/app/mentees/[userId]/new-appointment/NewAppointmentForm"

const RegisterForm = ({ user }: { user: User }) => {
    // const router = useRouter();
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
            additionalComments: ''
        },
    });

    const onSubmit = async (values: z.infer<typeof MenteeFormValidation>) => {
        setIsLoading(true)

        try {
            const menteeData = {
                ...values,
                userId: user.$id,
            }

            const mentee = await registerMentee(menteeData);

            // if (mentee) router.push('/success');
            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

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
                />
            </form>
        </Form>
    )
}

export default RegisterForm;