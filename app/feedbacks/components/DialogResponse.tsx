"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { MessageCircleQuestion } from 'lucide-react'

interface DialogResponseProps {
    response: string
    question: string
}

const DialogResponse = ({ response, question }: DialogResponseProps) => {
    return (
        <Dialog>
            <DialogTrigger><MessageCircleQuestion className='w-5 h-5' /></DialogTrigger>
            <DialogContent className='max-w-3xl'>
                <DialogHeader>
                    <DialogTitle>Feedback</DialogTitle>
                    <DialogDescription>
                        {`Q: ${question}`}
                        <br />
                        <br />
                        {`A: ${response}`}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default DialogResponse