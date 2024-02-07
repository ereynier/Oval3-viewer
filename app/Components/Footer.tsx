import Link from 'next/link'
import React from 'react'
import { Separator } from "@/components/ui/separator"
import Socials from '@/components/Socials'


const Footer = () => {
    return (
        <footer className="mt-10">
            <div className='flex w-full items-center justify-center'>
                <Separator className='w-10/12'/>
            </div>
            <div className="container flex md:flex-row flex-col items-center justify-center px-4 py-8 mx-auto w-10/12 md:justify-between">
                <div className="flex flex-wrap justify-center">
                    <ul className="flex flex-wrap gap-4 items-center justify-center whitespace-nowrap">
                        <li><Link href={"https://www.oval3.game/"} target='_blank' className='text-foreground hover:underline'>Oval3</Link></li>
                        <li><Link href={"https://www.ereynier.me/contact"} target="_blank" className='text-foreground hover:underline'>Contact</Link></li>
                        <li><Link href={"https://github.com/ereynier/Oval3-viewer"} target="_blank" className='text-foreground hover:underline'>Source</Link></li>
                    </ul>
                </div>
                <Socials />
            </div>
            <div className="pb-2">
                <p className="text-center">
                    @Estéban Reynier
                </p>
            </div>
        </footer>
    )
}

export default Footer