"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValivation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/mentee.actions"

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SEKELETON = 'skeleton',
};

const MentorForm = () => {
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className='mb-12 space-y-4'>
                    <h1 className='header'>Hi there, 👋</h1>
                    <p className='text-dark-700'>Schedule your mentorship or counselling appointment.</p>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name='name'
                    label='Full name'
                    placeholder='John Doe'
                    iconSrc='/assets/icons/user.svg'
                    iconAlt='user'
                />

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name='email'
                    label='Email'
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

                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    )
}

export default MentorForm;