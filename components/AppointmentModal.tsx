'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { MenteeFormValidation } from "@/lib/validation";
import { AppointmentTypes, MenteeFormDefaultValues } from "@/constatnts";
import CustomFormField from "./CustomFormField";
import { FormFieldType } from "./forms/MentorForm";
import { SelectItem } from "./ui/select";
import SubmitButton from "./SubmitButton";

const AppointmentModal = (data: any) => {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof MenteeFormValidation>>({
        resolver: zodResolver(MenteeFormValidation),
        defaultValues: {
            ...MenteeFormDefaultValues,
            name: data.data.name,
            email: data.data.email,
            phone: data.phone,
            appointmentType: data.data.appointmentType,
            schedule: new Date(data.data.schedule),
            reason: data.data.reason,
            additionalComments: data.data.additionalComments,
            cancellationReason: '',
        },
    });

    const handleSelect = (item: string) => {
        setSelectedItem(item);
        setOpen(true);
    };

    let buttonLabel;

    switch (selectedItem) {
        case 'cancel':
            buttonLabel = 'Cancel Appointnment';
            break;

        case 'meet':
            buttonLabel = 'Meet Appointment';
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
    };

    console.log('Modal Data: ', data)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-center ml-6">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className='bg-dark-500'>
                        <DropdownMenuItem className='hover:bg-gray-500 cursor-pointer' onSelect={() => handleSelect("schedule")}>Schedule</DropdownMenuItem>
                        <DropdownMenuItem className='hover:bg-gray-500 cursor-pointer' onSelect={() => handleSelect("meet")}>Meet</DropdownMenuItem>
                        <DropdownMenuItem className='hover:bg-gray-500 cursor-pointer' onSelect={() => handleSelect("cancel")}>Cancel</DropdownMenuItem>
                        <DropdownMenuItem className='hover:bg-gray-500 cursor-pointer' onSelect={() => handleSelect("complete")}>Complete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </DialogTrigger>

            <DialogContent className='shad-dialog sm:max-w-md'>
                <DialogHeader className='mb-4 space-y-3'>
                    <DialogTitle className='header capitalize'>{selectedItem} Appointment</DialogTitle>
                    <DialogDescription>
                        Please fill in the following details to {selectedItem} a <span className='text-green-500'>{data.data.appointmentType}</span> appointment for <span className='text-green-500'>{data.data.mentee.name}</span>
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                        {selectedItem !== 'cancel' && (
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

                        {selectedItem === 'cancel' && (
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
                            className={`${selectedItem === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}
                        >
                            {buttonLabel}
                        </SubmitButton>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AppointmentModal