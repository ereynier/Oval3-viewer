import Linkedin from '@/public/images/linkedin.svg'
import Github from '@/public/images/github.svg'
import Twitter from '@/public/images/x-social.svg'
import Link from 'next/link'
import React from 'react'

const Socials = () => {
    return (
        <div className="flex space-x-4 mt-4 lg:mt-0">
            <Link href={"https://github.com/ereynier"} target='_blank'>
                <Github width={20} height={20} className='w-[20px] h-[20px] fill-foreground hover:fill-muted-foreground'/>
            </Link>
            <Link href={"https://www.linkedin.com/in/ereynier/"} target='_blank'>
                <Linkedin width={20} height={20} className='w-[20px] h-[20px] fill-foreground hover:fill-muted-foreground'/>
            </Link>
            <Link href={"https://twitter.com/EstebanReynier"} target='_blank'>
                <Twitter width={20} height={20} className='w-[20px] h-[20px] fill-foreground hover:fill-muted-foreground'/>
            </Link>
        </div>
    )
}

export default Socials