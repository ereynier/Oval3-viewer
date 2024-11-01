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
import { MessageCircleQuestion } from 'lucide-react'


const FeedbacksTable = async () => {

    const feedbacks = await prisma.feedback.findMany()
    console.log(feedbacks)

    return (
        <div className='mx-4 md:mx-20 my-10 backdrop-blur-sm border-2'>
            <Table className=''>
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
                            <TableCell>{feedback.type.toUpperCase()}</TableCell>
                            <TableCell className='min-w-60'>{feedback.message}</TableCell>
                            <TableCell className='text-right'><MessageCircleQuestion className='w-5 h-5' /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    )
}

export default FeedbacksTable