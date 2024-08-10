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

import { useState } from "react";

const AppointmentModal = () => {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');

    const handleSelect = (item: string) => {
        setSelectedItem(item);
        setOpen(true);
    };

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
                        <DropdownMenuItem className='hover:bg-gray-500 cursor-pointer' onSelect={() => handleSelect("Schedule")}>Schedule</DropdownMenuItem>
                        <DropdownMenuItem className='hover:bg-gray-500 cursor-pointer' onSelect={() => handleSelect("Meet")}>Meet</DropdownMenuItem>
                        <DropdownMenuItem className='hover:bg-gray-500 cursor-pointer' onSelect={() => handleSelect("Cancel")}>Cancel</DropdownMenuItem>
                        <DropdownMenuItem className='hover:bg-gray-500 cursor-pointer' onSelect={() => handleSelect("Complete")}>Complete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure you want to {selectedItem} ?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AppointmentModal