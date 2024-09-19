"use client"
import React, { useEffect, useRef } from 'react'
import Card from './Card'
import _ from 'lodash';

import countries from "@/utils/datas/countries.json";
import RugbyLoader from '@/components/RugbyLoader';
import Image from 'next/image';
import { useNbCardStore } from '@/utils/store/NbCardStore';
import { useOrderStore } from '@/utils/store/OrderStore';
import { getGWScore } from '@/utils/getGWScore';
import { useGWStore } from '@/utils/store/GWStore';
import { usePinnedStore } from '@/utils/store/PinnedStore';
import { useFilterOpenStore } from '@/utils/store/FilterOpenStore';

interface CardsProps {
    data: any
    filters: any
}

enum Rarity {
    "LIMITED",
    "RARE",
    "SUPER RARE",
    "UNIQUE"
}

const Cards = ({ data, filters }: CardsProps) => {
    // https://medias.oval3.game/metadata/3
    // sortBy: id, rarity, score, club

    // fetch here, and pass the data to the Card component
    const [cards, setCards] = React.useState<any>({})
    const [loading, setLoading] = React.useState<boolean>(false)
    const [nbFetched, setNbFetched] = React.useState<number>(0)
    const setNbCard = useNbCardStore((state: any) => state.setNbCard);
    const setNbFilteredCard = useNbCardStore((state: any) => state.setNbFilteredCard);
    const sortBy = useOrderStore((state: any) => state.sortBy);
    const order = useOrderStore((state: any) => state.order);
    const gwNum = useGWStore(state => state.num)
    const pinnedPlayers = usePinnedStore(state => state.pinnedPlayers)
    const onlyPinned = usePinnedStore(state => state.onlyPinned)
    const applyFilterPin = usePinnedStore(state => state.applyFilters)
    const filterOpen = useFilterOpenStore(state => state.open);

    const prevDataRef = useRef();
    React.useEffect(() => {
        if (!data) return;
        if (!data || _.isEqual(data, prevDataRef.current)) return;
        setNbCard(data.tokens.length);
        prevDataRef.current = data;
        setCards({})
        console.log("fetching cards", data.tokens.length)

        const fetchData = async () => {
            setLoading(true);
            setNbFetched(0);

            const batchSize = 20; // Set your batch size here
            const results = [];

            for (let i = 0; i < data.tokens.length; i += batchSize) {
                const batch = data.tokens.slice(i, i + batchSize);
                const promises = batch.map(async (item: any) => {
                    const res1 = await fetch(`/api/metadata/${item}`);
                    const metadata = await res1.json();
                    if (metadata == undefined || metadata.error) {
                        console.log("error fetching metadata", metadata)
                        return;
                    }

                    const res2 = await fetch("https://api.oval3.game/graphql/", {
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
                    });
                    const additional = await res2.json();
                    if (!additional || additional.errors){
                        console.log("error fetching additional", additional)
                        return;
                    }

                    const res3 = await fetch(`https://score.oval3.game/api/scoring/player/${additional.data.Card.optaId}`);
                    const stats = await res3.json();
                    if (!stats || stats.error) {
                        console.log("error fetching stats", stats)
                        return;
                    }

                    return {
                        [item]: {
                            metadata: metadata.data,
                            additional: additional.data,
                            stats: stats.data
                        }
                    };
                });

                const batchResults = await Promise.all(promises);
                results.push(...batchResults);
                const newCards = results.reduce((acc, result) => ({ ...acc, ...result }), {});
                setCards((prev: any) => ({ ...prev, ...newCards }));
                setNbFetched((prev) => prev + batchSize);
            }

            setLoading(false);
        };

        fetchData();

    }, [data]);

    const sortData = (data: any) => {
        const sorted = data.sort((a: any, b: any) => {
            a = a.metadata.token;
            b = b.metadata.token;
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
            } else if (sortBy === "gw_score") {
                const aScore = getGWScore(cards[a].stats.nb_games, gwNum)
                const bScore = getGWScore(cards[b].stats.nb_games, gwNum)
                if (aScore === "N/A" && bScore === "N/A") return 0
                if (aScore === "N/A" && order == "asc") return -1
                if (aScore === "N/A" && order == "desc") return 1
                if (bScore === "N/A" && order == "asc") return 1
                if (bScore === "N/A" && order == "desc") return -1
                if (order === "asc") {
                    return Number(aScore) - Number(bScore);
                } else {
                    return Number(bScore) - Number(aScore);
                }
            }
        });
        return sorted;
    }

    const isFiltered = (card: any) => {
        if (!card.metadata || !card.additional || !card.stats) return false
        // Pinned
        if (!applyFilterPin && pinnedPlayers.includes(card.metadata.token)) {
            return true
        }
        if (onlyPinned && !pinnedPlayers.includes(card.metadata.token)) {
            return false
        }
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
        // Season
        if (!filters.season[card.additional.Card.season]) {
            return false
        }
        // Game Week Score
        const gwScore = getGWScore(card.stats.nb_games, gwNum)
        if (gwScore !== "N/A") {
            if ((Number(gwScore) < filters.gw_score[0] || Number(gwScore) > filters.gw_score[1])) {
                return false
            }
        } else {
            if (filters.gw_score[0] > 0) {
                return false
            }
        }
        if (filters.hide_gw_na && gwScore === "N/A") {
            return false
        }

        return true
    }

    const countFiltered = () => {
        let count = 0
        let total = 0
        for (const card in cards) {
            if (isFiltered(cards[card])) {
                count++
            } else {
                // console.log("not filtered", cards[card])
            }
            total++
        }
        return count
    }

    useEffect(() => {
        setNbFilteredCard(countFiltered())
    }, [filters, cards])

    return (
        <div className='w-full h-full mt-6'>
            <div className={`w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-12 ${filterOpen ? "md:px-4 xl:px-24 md:gap-4 lg:gap-8 xl:gap-12" : "md:px-24 xl:px-48 md:gap-12"} py-4 px-8 sm:px-12 md:px-24 xl:px-48 `}>
                {data && data.tokens && sortData(Object.values(cards)).map((card: any, index: number) => (
                    card = card.metadata.token,
                    (cards[card] &&
                        <div key={index} className={`${isFiltered(cards[card]) ? "" : "hidden"}`}>
                            <Card metadata={cards[card].metadata} additionals={cards[card].additional} stats={cards[card].stats} />
                        </div>
                    )
                ))}
                {loading && (Object.keys(cards).length > 0) && (
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
                )}
            </div>
            {loading && (Object.keys(cards).length == 0) && (
                <RugbyLoader />
            )}
        </div>
    )
}

export default Cards