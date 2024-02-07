"use client"
import React, { useRef } from 'react'
import Card from './Card'

import countries from "@/utils/datas/countries.json";
import RugbyLoader from '@/components/RugbyLoader';

interface CardsProps {
    data: any
    sortBy: string
    order: string
    filters: any
}

enum Rarity {
    "LIMITED",
    "RARE",
    "SUPER RARE",
    "UNIQUE"
}

const Cards = ({ data, sortBy, order, filters }: CardsProps) => {
    // https://medias.oval3.game/metadata/3
    // sortBy: id, rarity, score, club

    // fetch here, and pass the data to the Card component
    const [cards, setCards] = React.useState<any>({})

    // React.useEffect(() => {
    //     if (!data) return;
    //     const fetchPromises = data?.tokens.map((item: any, index: number) =>
    //         fetch(`/api/metadata/${item}`)
    //             .then(res => res.json())
    //             .then(data => ({ index, data: data.data }))
    //     );

    //     const fetchAdditionalsPromises = data?.tokens.map((item: any, index: number) =>
    //         fetch("https://api.oval3.game/graphql/", {
    //             "credentials": "omit",
    //             "headers": {
    //                 "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0",
    //                 "Accept": "*/*",
    //                 "Accept-Language": "en-US,en;q=0.5",
    //                 "content-type": "application/json",
    //                 "apollographql-client-name": "era2140-oval3",
    //                 "apollographql-client-version": "0.0.1",
    //                 "Access-Control-Allow-Origin": "*",
    //                 "Sec-Fetch-Dest": "empty",
    //                 "Sec-Fetch-Mode": "cors",
    //                 "Sec-Fetch-Site": "same-site"
    //             },
    //             "referrer": "https://marketplace.oval3.game/",
    //             "body": "{\"operationName\":\"findCard\",\"variables\":{\"tokenId\":\"" + String(item) + "\",\"similarPlayer\":true},\"query\":\"query findCard($tokenId: String!, $similarPlayer: Boolean) {\\n  Card(tokenId: $tokenId, similarCard: $similarPlayer) {\\n    tokenId\\n    rarity\\n    owner {\\n      address\\n    }\\n    edition\\n    international\\n    academy\\n    similarPlayers {\\n      image\\n      tokenId\\n    }\\n    optaId\\n    season\\n    competition\\n    club {\\n      name\\n      clubCode\\n    }\\n    bidCount\\n    score\\n    image\\n    firstname\\n    lastname\\n    position\\n    age\\n    nationality\\n    listingStatus\\n    amount\\n    endTime\\n  }\\n}\"}",
    //             "method": "POST",
    //             "mode": "cors"
    //         }).then(res => res.json())
    //             .then(data => ({ index, data: data }))
    //             .catch(error => error)
    //     );

    //     Promise.all(fetchPromises)
    //         .then(results => {
    //             const tmpMetadatas: any = {};
    //             results.forEach(({ index, data }) => {
    //                 tmpMetadatas[data.token] = data;
    //             });
    //             setMetadatas(tmpMetadatas);
    //         })
    //         .catch(error => console.error(error));

    //     const tmpAdditionals: any = {};
    //     Promise.all(fetchAdditionalsPromises)
    //         .then(results => {
    //             results.forEach(({ index, data }) => {
    //                 tmpAdditionals[data.data.Card.tokenId] = data.data;
    //             });
    //             setAdditionals(tmpAdditionals);
    //         })
    //         .then(() => {
    //             const fetchStatsPromises = Object.keys(tmpAdditionals).map((key: any) => {
    //                 const item = tmpAdditionals[key];
    //                 return fetch(`https://score.oval3.game/api/scoring/player/${item.Card.optaId}`)
    //                     .then(res => res.json())
    //                     .then(data => ({ key, data: data }))
    //                     .catch(error => error)
    //             });

    //             Promise.all(fetchStatsPromises)
    //                 .then(results => {
    //                     const tmpStats: any = {};
    //                     results.forEach(({ key, data }) => {
    //                         tmpStats[key] = data.data;
    //                     });
    //                     setStats(tmpStats);
    //                 })
    //                 .catch(error => console.error(error));

    //         })
    //         .catch(error => console.error(error));

    // }, [data]);


    React.useEffect(() => {
        if (!data) return;
        setCards({})
        data?.tokens.forEach((item: any, index: number) => {
            fetch(`/api/metadata/${item}`)
                .then(res => res.json())
                .then(metadata => {
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
                    })
                        .then(res => res.json())
                        .then(additional => {
                            fetch(`https://score.oval3.game/api/scoring/player/${additional.data.Card.optaId}`)
                                .then(res => res.json())
                                .then(stats => {
                                    setCards((prev: any) => {
                                        return {
                                            ...prev,
                                            [item]: {
                                                metadata: metadata.data,
                                                additional: additional.data,
                                                stats: stats.data
                                            }
                                        }
                                    })
                                });
                        });
                });
        });
    }, [data]);

    const sortData = (data: any) => {
        const sorted = data.tokens.sort((a: any, b: any) => {
            if (!cards[a] || !cards[b]) return 0
            if (sortBy === "id") {
                if (order === "asc") {
                    return a - b;
                } else {
                    return b - a;
                }
            } else if (sortBy === "rarity") {
                if (order === "asc") {
                    return Number(Rarity[cards[a].metadata.attributes[0].value]) - Number(Rarity[cards[b].metadata.attributes[0].value]);
                } else {
                    return Number(Rarity[cards[b].metadata.attributes[0].value]) - Number(Rarity[cards[a].metadata.attributes[0].value]);
                }
            } else if (sortBy === "score") {
                if (order === "asc") {
                    return cards[a].additional.Card.score - cards[b].additional.Card.score;
                } else {
                    return cards[b].additional.Card.score - cards[a].additional.Card.score;
                }
            } else if (sortBy === "club") {
                if (order === "asc") {
                    return cards[a].metadata.attributes[4].value.localeCompare(cards[b].metadata.attributes[4].value);
                } else {
                    return cards[b].metadata.attributes[4].value.localeCompare(cards[a].metadata.attributes[4].value);
                }
            }
        });
        return sorted;
    }

    const isFiltered = (card: any) => {
        if (!card.metadata || !card.additional || !card.stats) return false
        // Name
        if (filters.name && filters.name !== "") {
            if (!card.metadata.name.toLowerCase().includes(filters.name.toLowerCase())) {
                return false
            }
        }
        // Rarity
        if (!filters.rarity[card.metadata.attributes[0].value]) {
            return false
        }
        // Clubs
        if (!filters.clubs[card.metadata.attributes[4].value]) {
            return false
        }
        // Position
        if (!filters.position[card.metadata.attributes[6].value]) {
            return false
        }
        // Score
        if (card.additional && (card.additional.Card.score < filters.score[0] || card.additional.Card.score > filters.score[1])) {
            return false
        }
        // Stats
        if (card.stats) {
            if (card.stats.attack < filters.stats.attack[0] || card.stats.attack > filters.stats.attack[1]) {
                return false
            }
            if (card.stats.defense < filters.stats.defense[0] || card.stats.defense > filters.stats.defense[1]) {
                return false
            }
            if (card.stats.strength < filters.stats.strength[0] || card.stats.strength > filters.stats.strength[1]) {
                return false
            }
            if (card.stats.impact < filters.stats.impact[0] || card.stats.impact > filters.stats.impact[1]) {
                return false
            }
            if (card.stats.skills < filters.stats.skills[0] || card.stats.skills > filters.stats.skills[1]) {
                return false
            }
        }
        // Age
        if (card.additional && (card.additional.Card.age < filters.age[0] || card.additional.Card.age > filters.age[1])) {
            return false
        }
        // Leagues
        if (!filters.leagues[card.metadata.attributes[5].value]) {
            return false
        }
        // Countries
        const playerCountry = countries.find((country: any) => country.code === card.metadata.attributes[2].value)
        if (playerCountry && !filters.countries[playerCountry.name]) {
            return false
        }

        return true
    }

    return (
        <div className='w-full h-full mt-6'>
            <div className='w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 py-4 px-8 sm:px-12 md:px-24 xl:px-48 gap-12'>
                {data && data.tokens && sortData(data).map((card: number, index: number) => (
                    (cards[card] && isFiltered(cards[card]) &&
                        <div key={index} className="">
                            <Card metadata={cards[card].metadata} additionals={cards[card].additional} stats={cards[card].stats} />
                        </div>
                    )
                ))}
            </div>
            {(Object.keys(cards).length == 0) && (
                <RugbyLoader />
            )}
        </div>
    )
}

export default Cards