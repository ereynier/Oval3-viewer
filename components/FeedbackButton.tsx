/* eslint-disable react/no-unescaped-entities */
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
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Button } from './ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { cn } from "@/lib/utils"
import { useToast } from './ui/use-toast'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

interface FeedbackButtonProps {
    className?: string
}

const FeedbackButton = ({ className }: FeedbackButtonProps) => {

    const feedbackTypes = ['amélioration', 'fonctionnalité', 'bug']
    const [feedbackType, setFeedbackType] = React.useState('')
    const [feedbackMessage, setFeedbackMessage] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false)

    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (loading) return
        if (!feedbackType || !feedbackMessage) {
            toast({
                title: "Feedback error",
                description: "Veuillez remplir tous les champs",
                variant: "destructive",
            })
        }
        if (feedbackTypes.indexOf(feedbackType) === -1) {
            toast({
                title: "Feedback error",
                description: "Type invalide",
                variant: "destructive",
            })
            return
        }
        setLoading(true)
        fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ feedbackType, feedbackMessage })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    toast({
                        title: "Internal error",
                        description: data.error,
                        variant: "destructive",
                    })
                    return
                }
                toast({
                    title: "Feedback envoyé",
                    description: "Merci pour votre retour",
                })
                setFeedbackType('')
                setFeedbackMessage('')
            }).catch(err => {
                console.error(err)
                toast({
                    title: "Internal error",
                    description: String(err.message),
                    variant: "destructive",
                })
            }).finally(async () => {
                setLoading(false)
                await new Promise(resolve => setTimeout(resolve, 300))
                setOpen(false)
            })
    }

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger className={cn("", className)} asChild>
                <Button size={'sm'} className='bg-gradient-to-tr from-green-600 to-lime-400 hover:from-green-500 hover:to-lime-300 rounded-full font-semibold'>Feedback</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Donnez nous votre avis</DialogTitle>
                    <DialogDescription>
                        Vous avez une idée, une suggestion ou un problème à nous remonter ? N'hésitez pas à nous en faire part !
                    </DialogDescription>
                </DialogHeader>
                <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                    <Label>
                        Type <span className='text-red-500'>*</span>
                    </Label>
                    <Select required onValueChange={(value: string) => setFeedbackType(value)} value={feedbackType}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="amélioration">Amélioration</SelectItem>
                            <SelectItem value="fonctionnalité">Nouvelle Fonctionnalité</SelectItem>
                            <SelectItem value="bug">Bug</SelectItem>
                        </SelectContent>
                    </Select>

                    <Label>
                        Message <span className='text-red-500'>*</span>
                    </Label>
                    <Textarea required onChange={(e) => setFeedbackMessage(e.target.value)} placeholder="Votre message" value={feedbackMessage} />
                    <Button disabled={loading} type='submit' className='mt-4'>{loading ? <Loader2 className='animate-spin' /> : "Envoyer"}</Button>
                </form>
                <Button size={'sm'} variant='link' asChild className='w-fit h-fit' onClick={() => setOpen(false)}>
                    <Link href="/feedbacks" className='text-sm'>
                        Voir les feedbacks
                    </Link>
                </Button>
            </DialogContent>
        </Dialog>

    )
}

export default FeedbackButton