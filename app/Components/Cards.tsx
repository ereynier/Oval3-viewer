"use client"
import React from 'react'
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
    const [metadatas, setMetadatas] = React.useState<{ [key: number]: any } | undefined>(undefined)
    const [additionals, setAdditionals] = React.useState<any>(undefined)
    const [stats, setStats] = React.useState<any>(undefined)

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

        const tmpAdditionals: any = {};
        Promise.all(fetchAdditionalsPromises)
            .then(results => {
                results.forEach(({ index, data }) => {
                    tmpAdditionals[data.data.Card.tokenId] = data.data;
                });
                setAdditionals(tmpAdditionals);
            })
            .then(() => {
                const fetchStatsPromises = Object.keys(tmpAdditionals).map((key: any) => {
                    const item = tmpAdditionals[key];
                    return fetch(`https://score.oval3.game/api/scoring/player/${item.Card.optaId}`)
                        .then(res => res.json())
                        .then(data => ({ key, data: data }))
                        .catch(error => error)
                });

                Promise.all(fetchStatsPromises)
                    .then(results => {
                        const tmpStats: any = {};
                        results.forEach(({ key, data }) => {
                            tmpStats[key] = data.data;
                        });
                        setStats(tmpStats);
                    })
                    .catch(error => console.error(error));

            })
            .catch(error => console.error(error));

    }, [data]);

    const sortData = (data: any) => {
        if (!metadatas || !additionals) return data.tokens;
        const sorted = data.tokens.sort((a: any, b: any) => {
            if (!metadatas[a] || !metadatas[b]) return 0
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
                    return Number(Rarity[metadatas[b].attributes[0].value]) - Number(Rarity[metadatas[a].attributes[0].value]);
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

    const isFiltered = (item: any) => {
        if (!metadatas || !additionals || !stats) return false
        // Name
        if (filters.name && filters.name !== "") {
            if (!metadatas[item].name.toLowerCase().includes(filters.name.toLowerCase())) {
                return false
            }
        }
        // Rarity
        if (!filters.rarity[metadatas[item].attributes[0].value]) {
            return false
        }
        // Clubs
        if (!filters.clubs[metadatas[item].attributes[4].value]) {
            return false
        }
        // Position
        if (!filters.position[metadatas[item].attributes[6].value]) {
            return false
        }
        // Score
        if (additionals[item] && (additionals[item].Card.score < filters.score[0] || additionals[item].Card.score > filters.score[1])) {
            return false
        }
        // Stats
        if (stats[item]) {
            if (stats[item].attack < filters.stats.attack[0] || stats[item].attack > filters.stats.attack[1]) {
                return false
            }
            if (stats[item].defense < filters.stats.defense[0] || stats[item].defense > filters.stats.defense[1]) {
                return false
            }
            if (stats[item].strength < filters.stats.strength[0] || stats[item].strength > filters.stats.strength[1]) {
                return false
            }
            if (stats[item].impact < filters.stats.impact[0] || stats[item].impact > filters.stats.impact[1]) {
                return false
            }
            if (stats[item].skills < filters.stats.skills[0] || stats[item].skills > filters.stats.skills[1]) {
                return false
            }
        }
        // Age
        if (additionals[item] && (additionals[item].Card.age < filters.age[0] || additionals[item].Card.age > filters.age[1])) {
            return false
        }
        // Leagues
        if (!filters.leagues[metadatas[item].attributes[5].value]) {
            return false
        }
        // Countries
        const playerCountry = countries.find((country: any) => country.code === metadatas[item].attributes[2].value)
        if (playerCountry && !filters.countries[playerCountry.name]) {
            return false
        }

        return true
    }

    return (
        <div className='w-full h-full mt-6'>
            <div className='w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4 px-8 sm:px-12 md:px-24 lg:px-48 gap-12'>
                {metadatas && stats && additionals && sortData(data).map((item: any, index: number) => (
                    (metadatas && metadatas[item] && isFiltered(item)) &&
                    <div key={index} className="">
                        <Card metadata={metadatas[item]} additionals={additionals[item]} stats={stats[item]} />
                    </div>
                ))}
            </div>
            {(!metadatas || !additionals || !stats) && (
                <RugbyLoader />
            )}
        </div>
    )
}

export default Cards