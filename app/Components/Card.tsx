"use client";
import React from 'react'
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

interface CardProps {
  id: string
}

const Card = ({ id }: CardProps) => {

  const [metadata, setMetadata] = React.useState<any>(null)
  const [additionals, setAdditionals] = React.useState<any>(null)

  React.useEffect(() => {
    fetch(`/api/metadata/${id}`)
      .then(res => res.json())
      .then(data => setMetadata(data))
      .catch(error => error)

    fetch("https://api.oval3.game/graphql/", {
      "credentials": "omit",
      "headers": {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "content-type": "application/json",
        "apollographql-client-name": "era2140-oval3",
        "apollographql-client-version": "0.0.1",
        "Access-Control-Allow-Origin": "*",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site"
      },
      "referrer": "https://marketplace.oval3.game/",
      "body": "{\"operationName\":\"findCard\",\"variables\":{\"tokenId\":\"" + String(id) + "\",\"similarPlayer\":true},\"query\":\"query findCard($tokenId: String!, $similarPlayer: Boolean) {\\n  Card(tokenId: $tokenId, similarCard: $similarPlayer) {\\n    tokenId\\n    rarity\\n    owner {\\n      address\\n    }\\n    edition\\n    international\\n    academy\\n    similarPlayers {\\n      image\\n      tokenId\\n    }\\n    optaId\\n    season\\n    competition\\n    club {\\n      name\\n      clubCode\\n    }\\n    bidCount\\n    score\\n    image\\n    firstname\\n    lastname\\n    position\\n    age\\n    nationality\\n    listingStatus\\n    amount\\n    endTime\\n  }\\n}\"}",
      "method": "POST",
      "mode": "cors"
    }).then(res => res.json())
      .then(data => setAdditionals(data.data))
      .catch(error => error)

  }, [])

  console.log(additionals?.Card)



  return (
    <div className="flex items-center justify-center">
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl border  ">
          <div className='w-full h-full flex flex-col items-center justify-center'>
            <CardItem translateZ="100" className="w-full h-auto" as={"button"}>
              <Image
                src={metadata?.data?.image}
                height="500"
                width="500"
                className="object-cover rounded-xl group-hover/card:shadow-xl"
                alt={`${metadata?.data?.name} card`}
              />
            </CardItem>
            <CardItem translateZ={"130"} className='absolute top-0 right-0 h-full w-1/4 opacity-0 group-hover/card:opacity-90'>
              <Image className='w-fit h-full object-fill' src={`https://marketplace.oval3.game/img/labels/${String(additionals?.Card.rarity).toLowerCase().split(" ").join("")}.png`} alt="rarity" height="450" width="450" />
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}

export default Card
