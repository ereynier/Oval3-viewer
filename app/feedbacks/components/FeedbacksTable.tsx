import { prisma } from '@/lib/prsima'
import React from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import DialogResponse from './DialogResponse'


const FeedbacksTable = async () => {

    let feedbacks = await prisma.feedback.findMany()

    feedbacks = feedbacks.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
            return 1
        }
        return -1
    })

    return (
        <div className='mx-4 md:mx-20 my-10 backdrop-blur-sm border-2'>
            <Table>
                {/* <TableCaption>Feedbacks</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Type</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead className='text-right'>Reponse</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {feedbacks.map((feedback) => (
                        <TableRow key={feedback.id}>
                            <TableCell className='text-ellipsis overflow-hidden sm:max-w-none max-w-2'>{feedback.type.toUpperCase()}</TableCell>
                            <TableCell className='text-ellipsis overflow-hidden sm:max-w-none line-clamp-3'>{feedback.message}</TableCell>
                            {feedback.response ? (
                                <TableCell className='text-right'>
                                    <DialogResponse response={feedback.response} question={feedback.message}/>
                                </TableCell>
                            ) : (<TableCell />)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    )
}

export default FeedbacksTable