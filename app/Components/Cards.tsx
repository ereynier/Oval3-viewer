import Image from 'next/image'
import React from 'react'
import Card from './Card'

interface CardsProps {
    data: any
}

const Cards = ({ data }: CardsProps) => {
    // https://medias.oval3.game/metadata/3
    return (
        <div className='w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-8 sm:px-12 md:px-24 lg:px-48 gap-12'>
            {data?.tokens && data.tokens.map((item: any, index: number) => (
                <div key={index} className="">
                    <Card id={item} />
                </div>
            ))}
        </div>
    )
}

export default Cards