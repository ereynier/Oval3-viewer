/* eslint-disable react/no-unescaped-entities */
"use client"
import { useLocalStorage } from '@/lib/hooks'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { Button } from './ui/button'
import Link from 'next/link'


const PopUp = () => {

    const [showPopUp, setshowPopUp] = useLocalStorage<boolean>("showPopUpFeedbackPage", true)
    const [open, setOpen] = React.useState<boolean>(false)
    const [checked, setChecked] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (showPopUp) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [showPopUp])

    const handleOpen = (v: boolean) => {
        setOpen(!open)
        if (!v) {
            setshowPopUp(!checked)
        }
    }

    return (
        <Dialog open={open} onOpenChange={(v) => handleOpen(v)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New feedback button!</DialogTitle>
                    <DialogDescription>
                        Nouvelle page de feedbacks disponible!
                        <Button variant='link' asChild>
                            <Link href="/feedbacks">
                                Cliquez ici pour y accéder
                            </Link>
                        </Button>
                    </DialogDescription>
                </DialogHeader>
                {/* <Image src="/images/feedback.png" alt="feedback" width={500} height={500} /> */}
                <div className='flex flex-row items-center justify-start gap-2'>
                    <Checkbox checked={checked} onCheckedChange={() => setChecked(!checked)} />
                    <Label>Don't show this again</Label>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default PopUp