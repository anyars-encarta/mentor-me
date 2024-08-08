"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { MenteeFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { registerMentee } from "@/lib/actions/mentee.actions"
import { FormFieldType } from "./MentorForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { AppointmentTypes, GenderOptions, MenteeFormDefaultValues } from "@/constatnts"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"

const NewAppointment = ({ user }: { user: User }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof MenteeFormValidation>>({
        resolver: zodResolver(MenteeFormValidation),
        defaultValues: {
            ...MenteeFormDefaultValues,
            name: user.name,
            email: user.email,
            phone: user.phone,
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
           
           if (mentee) router.push(`/mentees/${user.$id}/new-appointment`);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className='space-y-4'>
                    <h1 className='header'>Welcome, {user.name} 👋</h1>
                    <p className='text-dark-700'>Let us know more about yourself</p>
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

                <section className='space-y-6'>
                    <div className='mb-9 space-y-1'>
                        <h2 className='sub-header'>Appointment Details</h2>
                    </div>
                </section>

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
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name='reason'
                        label='Reason for Appointment'
                        placeholder='Briefly describe the reason for your appointment'
                    />
                </div>

                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    )
}

export default NewAppointment;