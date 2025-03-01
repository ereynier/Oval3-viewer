"use client";
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Stats from './Stats';
import { useGWStore } from '@/utils/store/GWStore';
import { getGWScore } from '@/utils/getGWScore';
import { usePinnedStore } from '@/utils/store/PinnedStore';
import { PinIcon } from 'lucide-react';
import { useGridToggleStore } from '@/utils/store/GridToggleStore';


interface ScoreCardItemProps {
  additionals: any;
  stats: any;
}

const ScoreCardItem: React.FC<ScoreCardItemProps> = ({ additionals, stats }) => {
  const displayScore = useGWStore(state => state.display)
  const gwNum = useGWStore(state => state.num)
  return (
    <CardItem translateZ={"130"} className='absolute bottom-0 top-0 h-fit w-full'>
      <p className={`text-lg sm:text-xl font-bold ${displayScore == "Score" ? "text-white opacity-60" : "bg-clip-text text-transparent bg-gradient-to-b from-green-200 to-green-500 opacity-80"}  group-hover/card:opacity-100 text-center cursor-pointer`}>{displayScore == "Score" ? additionals?.Card.score : getGWScore(stats.nb_games, gwNum)}</p>
    </CardItem>
  );
}

const PinCardItem = ({ id }: { id: string }) => {
  const setPinnedPlayers = usePinnedStore(state => state.setPinnedPlayers)
  const pinnedPlayers = usePinnedStore(state => state.pinnedPlayers)
  const grid = useGridToggleStore(state => state.grid)

  const updatePinned = (id: number) => {
    if (pinnedPlayers.includes(id)) {
      setPinnedPlayers(pinnedPlayers.filter((player) => player !== id))
    } else {
      setPinnedPlayers([...pinnedPlayers, id])
    }
  }

  return (
    <CardItem translateZ={"100"} className='absolute top-1 left-1 h-fit w-full z-50 p-2'>
      <button onClick={() => updatePinned(Number(id))} className="p-1 rounded-md">
        <PinIcon className={`h-7 w-7 ${grid == "3" ? "hidden" : ""} ${pinnedPlayers.includes(Number(id)) ? "fill-emerald-500" : "fill-transparent"} stroke-white`} />
      </button>
    </CardItem>
  )
}


interface CardProps {
  metadata?: any
  additionals?: any
  stats?: any
}

const Card = ({ metadata, additionals, stats }: CardProps) => {

  const [open, setOpen] = React.useState<boolean>(false)
  const [imgSrc, setImgSrc] = useState(metadata?.image ? "https://medias.oval3.game/img/public/resize?url=" + metadata?.image + "&width=300" : "/images/card-placeholder.webp");

  const handleClick = () => {
    setOpen(true)
    console.log(metadata)
    console.log(additionals?.Card)
  }

  useEffect(() => {
    setImgSrc(metadata?.image ? "https://medias.oval3.game/img/public/resize?url=" + metadata?.image + "&width=300" : "/images/card-placeholder.webp")
  }, [metadata])

  return (
    <div className="flex items-center justify-center">
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl border  ">
          <div onClick={handleClick} className='w-full h-full flex flex-col items-center justify-center'>
            <CardItem translateZ="100" className="w-full h-auto" as={"button"}>
              <Image
                src={imgSrc}
                height="977"
                width="640"
                className={`object-cover rounded-xl group-hover/card:shadow-xl`}
                alt={`${metadata?.name} card`}
                onError={() => setImgSrc("/images/card-placeholder.webp")}
              />
            </CardItem>
            {Number(metadata?.token) < 104768 ? ( // 104768 is the first token of the new cards 2024/25
            <CardItem translateZ={"130"} className='absolute top-0 right-0 h-full w-1/4 opacity-0 group-hover/card:opacity-90'>
              <Image className='w-fit h-full object-fill' src={`https://marketplace.oval3.game/img/labels/${String(additionals?.Card.rarity).toLowerCase().replace(" ", "")}.png`} alt="rarity" height="450" width="450" />
            </CardItem>
            ) : null}
            <ScoreCardItem additionals={additionals} stats={stats} />
          </div>
          <PinCardItem id={additionals?.Card.tokenId} />
        </CardBody>
      </CardContainer>
      {additionals?.Card && (
        <Stats open={open} setOpen={setOpen} Card={additionals?.Card} stats={stats} />
      )}
    </div>
  );
}

export default Card
