import RugbyLoader from '@/components/RugbyLoader'
import { useFilterOpenStore } from '@/utils/store/FilterOpenStore';
import Image from 'next/image'
import React from 'react'
import Card from './Card';

interface CardProps {
    cards: any
}

const Cards = ({ cards }: CardProps) => {

    const filterOpen = useFilterOpenStore(state => state.open);

    return (
        <div className='w-full h-full mt-6'>
            <div className={`w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-12 ${filterOpen ? "md:px-4 xl:px-24 md:gap-4 lg:gap-8 xl:gap-12" : "md:px-24 xl:px-48 md:gap-12"} py-4 px-8 sm:px-12 md:px-24 xl:px-48 `}>
                {cards && cards.map((card: any, index: number) => (
                    <div key={index}>
                        <Card card={card} />
                    </div>
                ))}
                {/* {loading && (Object.keys(cards).length > 0) && (
                    <div className='w-full h-full flex'>
                        <Image
                            src={"/images/card-placeholder.webp"}
                            height="977"
                            width="640"
                            className="object-cover rounded-xl group-hover/card:shadow-xl opacity-75 animate-pulse"
                            alt={"empty card"}
                        />
                        <RugbyLoader />
                        <p className='fixed text-xs font-semibold left-1 bottom-0 z-10 text-gray-600'>{nbFetched} / {data.tokens.length}</p>
                    </div>
                )} */}
            </div>
        </div>
    )
}

export default Cards