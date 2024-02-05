"use client";
import React from 'react'
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Stats from './Stats';

interface CardProps {
  metadata?: any
  additionals?: any
}

const Card = ({ metadata, additionals }: CardProps) => {

  const [open, setOpen] = React.useState<boolean>(false)

  const handleClick = () => {
    setOpen(true)
    console.log(metadata)
    console.log(additionals?.Card)
  }

  return (
    <div className="flex items-center justify-center">
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl border  ">
          <div onClick={handleClick} className='w-full h-full flex flex-col items-center justify-center'>
            <CardItem translateZ="100" className="w-full h-auto" as={"button"}>
              <Image
                src={metadata?.image || "/images/card-placeholder.webp"}
                height="500"
                width="500"
                className="object-cover rounded-xl group-hover/card:shadow-xl"
                alt={`${metadata?.name} card`}
              />
            </CardItem>
            <CardItem translateZ={"130"} className='absolute top-0 right-0 h-full w-1/4 opacity-0 group-hover/card:opacity-90'>
              <Image className='w-fit h-full object-fill' src={`https://marketplace.oval3.game/img/labels/${String(additionals?.Card.rarity).toLowerCase().replace(" ", "")}.png`} alt="rarity" height="450" width="450" />
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
      {additionals?.Card && (
        <Stats open={open} setOpen={setOpen} Card={additionals?.Card} />
      )}
    </div>
  );
}

export default Card
