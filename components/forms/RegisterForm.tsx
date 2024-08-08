"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValivation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/mentee.actions"
import { FormFieldType } from "./MentorForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { AppointmentTypes, GenderOptions } from "@/constatnts"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"

const RegisterForm = ({ user }: { user: User }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof UserFormValivation>>({
        resolver: zodResolver(UserFormValivation),
        defaultValues: {
            name: "",
            email: '',
            phone: '',
        },
    })

    const onSubmit = async ({ name, email, phone }: z.infer<typeof UserFormValivation>) => {
        setIsLoading(true)

        try {
            const userData = { name, email, phone };

            const user = await createUser(userData);

            if (user) router.push(`/mentees/${user.$id}/register`)
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
                    placeholder={user.name}
                    iconSrc='/assets/icons/user.svg'
                    iconAlt='user'
                />

                <div className='flex flex-col gap-6 xl:flex-row'>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='email'
                        label='Email'
                        placeholder={user.email}
                        iconSrc='/assets/icons/email.svg'
                        iconAlt='email'
                    />

                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name='phone'
                        label='Phone Number'
                        placeholder={user.phone}
                    />
                </div>

                <div className='flex flex-col gap-6 xl:flex-row'>
                    {/* <CustomFormField
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name='birthDate'
                        label='Date of Birth'
                        placeholder={user.email}
                        iconSrc='/assets/icons/email.svg'
                        iconAlt='email'
                    /> */}

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
                                    {GenderOptions.map((option) => (
                                        <div key={option} className='radio-group'>
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
                        {AppointmentTypes.map((appointment) => (
                            <SelectItem key={appointment} value={appointment}>
                                {appointment}
                            </SelectItem>
                        ))}
                    </CustomFormField>

                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name='reason'
                        label='Appointment Reason'
                        placeholder='Briefly describe the reason for your appointment'
                    />
                </div>

                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    )
}

export default RegisterForm;