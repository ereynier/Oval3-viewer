"use client"
import React from 'react'
import Card from './Card'

interface CardsProps {
    data: any
    sortBy: string
    order: string
}

enum Rarity {
    "LIMITED",
    "RARE",
    "SUPER RARE",
    "UNIQUE"
}

const Cards = ({ data, sortBy, order }: CardsProps) => {
    // https://medias.oval3.game/metadata/3
    // sortBy: id, rarity, score, club

    // fetch here, and pass the data to the Card component
    const [metadatas, setMetadatas] = React.useState<{ [key: number]: any }>({})
    const [additionals, setAdditionals] = React.useState<any>(null)

    React.useEffect(() => {
        if (!data) return;
        const fetchPromises = data?.tokens.map((item: any, index: number) =>
            fetch(`/api/metadata/${item}`)
                .then(res => res.json())
                .then(data => ({ index, data: data.data }))
        );

        const fetchAdditionalsPromises = data?.tokens.map((item: any, index: number) =>
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
                "body": "{\"operationName\":\"findCard\",\"variables\":{\"tokenId\":\"" + String(item) + "\",\"similarPlayer\":true},\"query\":\"query findCard($tokenId: String!, $similarPlayer: Boolean) {\\n  Card(tokenId: $tokenId, similarCard: $similarPlayer) {\\n    tokenId\\n    rarity\\n    owner {\\n      address\\n    }\\n    edition\\n    international\\n    academy\\n    similarPlayers {\\n      image\\n      tokenId\\n    }\\n    optaId\\n    season\\n    competition\\n    club {\\n      name\\n      clubCode\\n    }\\n    bidCount\\n    score\\n    image\\n    firstname\\n    lastname\\n    position\\n    age\\n    nationality\\n    listingStatus\\n    amount\\n    endTime\\n  }\\n}\"}",
                "method": "POST",
                "mode": "cors"
            }).then(res => res.json())
                .then(data => ({ index, data: data }))
                .catch(error => error)
        );

        Promise.all(fetchPromises)
            .then(results => {
                const tmpMetadatas: any = {};
                results.forEach(({ index, data }) => {
                    tmpMetadatas[data.token] = data;
                });
                setMetadatas(tmpMetadatas);
            })
            .catch(error => console.error(error));

        Promise.all(fetchAdditionalsPromises)
            .then(results => {
                const tmpAdditionals: any = {};
                results.forEach(({ index, data }) => {
                    tmpAdditionals[data.data.Card.tokenId] = data.data;
                });
                setAdditionals(tmpAdditionals);
            })
            .catch(error => console.error(error));

    }, [data]);

    const sortData = (data: any) => {
        const sorted = data.tokens.sort((a: any, b: any) => {
            if (sortBy === "id") {
                if (order === "asc") {
                    return a - b;
                } else {
                    return b - a;
                }
            } else if (sortBy === "rarity") {
                if (order === "asc") {
                    return Number(Rarity[metadatas[a].attributes[0].value]) - Number(Rarity[metadatas[b].attributes[0].value]);
                } else {
                    return metadatas[b].attributes[0].value - metadatas[a].attributes[0].value;
                }
            } else if (sortBy === "score") {
                if (order === "asc") {
                    return additionals[a].Card.score - additionals[b].Card.score;
                } else {
                    return additionals[b].Card.score - additionals[a].Card.score;
                }
            } else if (sortBy === "club") {
                if (order === "asc") {
                    return metadatas[a].attributes[4].value.localeCompare(metadatas[b].attributes[4].value);
                } else {
                    return metadatas[b].attributes[4].value.localeCompare(metadatas[a].attributes[4].value);
                }
            }
        });
        return sorted;
    }

    return (
        <div className='w-full h-full mt-6'>
            <div className='w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4 px-8 sm:px-12 md:px-24 lg:px-48 gap-12'>
                {data && data?.tokens && metadatas && additionals && sortData(data).map((item: any, index: number) => (
                    <div key={index} className="">
                        <Card metadata={metadatas[item]} additionals={additionals[item]} />
                    </div>
                ))}
            </div>
            {data && data?.tokens && (!metadatas || !additionals) && (
                <div className="flex justify-center items-center w-full h-full p-8">
                    <div className="flex items-center justify-center">
                        <div className="relative">
                            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-[20px] border-b-[20px] border-neutral-500 animate-spin ">
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cards