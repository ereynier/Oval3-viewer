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

    const [showPopUp, setshowPopUp] = useLocalStorage<boolean>("showPopUpOval3Dead", true)
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
                    <DialogTitle>Oval3 is discontinued</DialogTitle>
                    <DialogDescription>
                        As Oval3 is no longer available, we are discontinuing this viewer for now. The app used the Oval3 API which is no longer available to retrieve data. If Oval3 is back, we will update this viewer.
                        <br />
                        <br />
                        We are sorry for the inconvenience.
                        <br />
                        <br />
                        If you want to follow my work, you can follow me on <Link href="https://x.com/EstebanReynier" className='text-blue-500 hover:underline'>X</Link>.
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