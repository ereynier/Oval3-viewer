"use server"

import { prisma } from "@/lib/prsima"
import { getLastMonday, getPreviousMonday } from "@/utils/getGWScore"

const select = {
    owner: true,
    rarity: true,
    tokenId: true,
    serial_Number: true,
    max_serial_Number: true,
    opta_id: true,
    updatedAt: true,
    academy: true,
    age: true,
    clubName: true,
    clubCode: true,
    competition: true,
    name: true,
    image: true,
    international: true,
    nationality: true,
    position: true,
    season: true,
    player: {
        select: {
            opta_id: true,
            appearances: true,
            attack: true,
            defense: true,
            evolution: true,
            impact: true,
            last_scoring: true,
            minutes_played_total: true,
            red_cards: true,
            scoring: true,
            skills: true,
            strength: true,
            tries: true,
            yellow_cards: true,
            updatedAt: true,
            nb_games: {
                select: {
                    metadata_total: true,
                    game_date: true
                }
            }
        }
    }
}

export const searchCards = async (filters: any, sortBy: string, sort: string, pinOnly: boolean, take: number, offset: number, pinned: number[]) => {
    if (pinOnly && pinned.length == 0) return JSON.parse(JSON.stringify([]))

    let players

    let trueSortBy: any = { [sortBy]: sort }
    if (sortBy == "scoring") {
        trueSortBy = { player: { [sortBy]: sort } }
    }
    // TODO: handle apply filters to pinned
    // TODO: handle hide_gw_na

    if (sortBy == "gw_score") {
        let games
        if (pinOnly && pinned.length > 0) {
            games = await prisma.game.findMany({
                where: {
                    AND: {
                        game_date: {
                            gte: getPreviousMonday(filters.gw_number).toISOString(),
                            lte: getLastMonday(filters.gw_number).toISOString()
                        },
                        metadata_total: {
                            gte: filters.gw_score[0],
                            lte: filters.gw_score[1]
                        },
                    },
                    Player: {
                        Card: {
                            some: {
                                tokenId: {
                                    in: pinned.map((id) => id.toString())
                                }
                            }
                        }
                    }
                },
                select: {
                    metadata_total: true,
                    game_date: true,
                    Player: {
                        select: {
                            Card: {
                                select: {
                                    tokenId: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    metadata_total: sort as "asc" | "desc"
                }
            })
        } else {
            games = await prisma.game.findMany({
                where: {
                    AND: {
                        game_date: {
                            gte: getPreviousMonday(filters.gw_number).toISOString(),
                            lte: getLastMonday(filters.gw_number).toISOString()
                        },
                        metadata_total: {
                            gte: filters.gw_score[0],
                            lte: filters.gw_score[1]
                        },
                    },
                },
                select: {
                    metadata_total: true,
                    game_date: true,
                    Player: {
                        select: {
                            Card: {
                                select: {
                                    tokenId: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    metadata_total: sort as "asc" | "desc"
                }
            })
        }

        let playersId = games.map((game) => game.Player.Card.map((card) => card.tokenId)).flat()
        if (pinOnly && pinned.length > 0) {
            playersId = playersId.concat(pinned.map((id) => id.toString()))
            playersId = Array.from(new Set(playersId))
            playersId = playersId.filter((id) => pinned.includes(Number(id)))
        }

        players = await prisma.card.findMany({
            where: {
                tokenId: {
                    in: playersId
                },
                name: {
                    contains: filters.name != "" ? filters.name : undefined,
                    mode: 'insensitive'
                },
                owner: {
                    equals: filters.owner != "" ? filters.owner : undefined,
                    mode: 'insensitive'
                },
                rarity: {
                    in: Object.keys(filters.rarity).filter((key) => filters.rarity[key] === true)
                },
                clubName: {
                    in: Object.keys(filters.clubs).filter((key) => filters.clubs[key] === true)
                },
                position: {
                    in: Object.keys(filters.position).filter((key) => filters.position[key] === true)
                },
                age: {
                    gte: filters.age[0],
                    lte: filters.age[1]
                },
                competition: {
                    in: Object.keys(filters.leagues).filter((key) => filters.leagues[key] === true)
                },
                nationality: {
                    in: Object.keys(filters.countries).filter((key) => filters.countries[key] === true)
                },
                player: {
                    scoring: {
                        gte: filters.score[0],
                        lte: filters.score[1]
                    },
                    attack: {
                        gte: filters.stats.attack[0],
                        lte: filters.stats.attack[1]
                    },
                    defense: {
                        gte: filters.stats.defense[0],
                        lte: filters.stats.defense[1]
                    },
                    strength: {
                        gte: filters.stats.strength[0],
                        lte: filters.stats.strength[1]
                    },
                    impact: {
                        gte: filters.stats.impact[0],
                        lte: filters.stats.impact[1]
                    },
                    skills: {
                        gte: filters.stats.skills[0],
                        lte: filters.stats.skills[1]
                    },
                }
            },
            select: select
        })
        players = players.sort((a, b) => playersId.indexOf(a.tokenId) - playersId.indexOf(b.tokenId)).slice(offset, offset + take)
        return JSON.parse(JSON.stringify(players))
    }


    if (pinOnly && pinned.length > 0) {
        players = await prisma.card.findMany({
            take: take,
            skip: offset,
            where: {
                tokenId: {
                    in: pinned.map((id) => id.toString())
                }
            },
            select: select,
            orderBy: trueSortBy,
        })
    } else {
        players = await prisma.card.findMany({
            take: take,
            skip: offset,
            where: {
                OR: [{
                    name: {
                        contains: filters.name != "" ? filters.name : undefined,
                        mode: 'insensitive'
                    },
                    owner: {
                        equals: filters.owner != "" ? filters.owner : undefined,
                        mode: 'insensitive'
                    },
                    rarity: {
                        in: Object.keys(filters.rarity).filter((key) => filters.rarity[key] === true)
                    },
                    clubName: {
                        in: Object.keys(filters.clubs).filter((key) => filters.clubs[key] === true)
                    },
                    position: {
                        in: Object.keys(filters.position).filter((key) => filters.position[key] === true)
                    },
                    age: {
                        gte: filters.age[0],
                        lte: filters.age[1]
                    },
                    competition: {
                        in: Object.keys(filters.leagues).filter((key) => filters.leagues[key] === true)
                    },
                    nationality: {
                        in: Object.keys(filters.countries).filter((key) => filters.countries[key] === true)
                    },
                    player: {
                        scoring: {
                            gte: filters.score[0],
                            lte: filters.score[1]
                        },
                        attack: {
                            gte: filters.stats.attack[0],
                            lte: filters.stats.attack[1]
                        },
                        defense: {
                            gte: filters.stats.defense[0],
                            lte: filters.stats.defense[1]
                        },
                        strength: {
                            gte: filters.stats.strength[0],
                            lte: filters.stats.strength[1]
                        },
                        impact: {
                            gte: filters.stats.impact[0],
                            lte: filters.stats.impact[1]
                        },
                        skills: {
                            gte: filters.stats.skills[0],
                            lte: filters.stats.skills[1]
                        },
                        nb_games: {
                            some: {
                                OR: [
                                    {
                                        AND: {
                                            game_date: {
                                                gte: getPreviousMonday(filters.gw_number).toISOString(),
                                                lte: getLastMonday(filters.gw_number).toISOString()
                                            },
                                            metadata_total: {
                                                gte: filters.gw_score[0],
                                                lte: filters.gw_score[1]
                                            }
                                        }
                                    },
                                    {
                                        metadata_total: filters.hide_gw_na ? null : { not: null }
                                    }
                                ]
                            }
                        }
                    }
                },
                {
                    tokenId: {
                        in: pinned.map((id) => id.toString())
                    }
                }]
            },
            select: select,
            orderBy: trueSortBy,
        })
    }

    if (!players) return []
    // console.log(JSON.stringify(players))
    return JSON.parse(JSON.stringify(players))
}


export const countCards = async (filters: any, pinOnly: boolean, pinned: number[]) => {
    if (pinOnly && pinned.length == 0) return 0

    let players


    if (pinOnly && pinned.length > 0) {
        players = await prisma.card.count({
            where: {
                tokenId: {
                    in: pinned.map((id) => id.toString())
                }
            },
        })
    } else {
        players = await prisma.card.count({
            where: {
                OR: [{
                    name: {
                        contains: filters.name != "" ? filters.name : undefined,
                        mode: 'insensitive'
                    },
                    owner: {
                        equals: filters.owner != "" ? filters.owner : undefined,
                        mode: 'insensitive'
                    },
                    rarity: {
                        in: Object.keys(filters.rarity).filter((key) => filters.rarity[key] === true)
                    },
                    clubName: {
                        in: Object.keys(filters.clubs).filter((key) => filters.clubs[key] === true)
                    },
                    position: {
                        in: Object.keys(filters.position).filter((key) => filters.position[key] === true)
                    },
                    age: {
                        gte: filters.age[0],
                        lte: filters.age[1]
                    },
                    competition: {
                        in: Object.keys(filters.leagues).filter((key) => filters.leagues[key] === true)
                    },
                    nationality: {
                        in: Object.keys(filters.countries).filter((key) => filters.countries[key] === true)
                    },
                    player: {
                        scoring: {
                            gte: filters.score[0],
                            lte: filters.score[1]
                        },
                        attack: {
                            gte: filters.stats.attack[0],
                            lte: filters.stats.attack[1]
                        },
                        defense: {
                            gte: filters.stats.defense[0],
                            lte: filters.stats.defense[1]
                        },
                        strength: {
                            gte: filters.stats.strength[0],
                            lte: filters.stats.strength[1]
                        },
                        impact: {
                            gte: filters.stats.impact[0],
                            lte: filters.stats.impact[1]
                        },
                        skills: {
                            gte: filters.stats.skills[0],
                            lte: filters.stats.skills[1]
                        },
                        nb_games: {
                            some: {
                                OR: [
                                    {
                                        AND: {
                                            game_date: {
                                                gte: getPreviousMonday(filters.gw_number).toISOString(),
                                                lte: getLastMonday(filters.gw_number).toISOString()
                                            },
                                            metadata_total: {
                                                gte: filters.gw_score[0],
                                                lte: filters.gw_score[1]
                                            }
                                        }
                                    },
                                    {
                                        metadata_total: filters.hide_gw_na ? null : { not: null }
                                    }
                                ]
                            }
                        }
                    }
                },
                {
                    tokenId: {
                        in: pinned.map((id) => id.toString())
                    }
                }]
            }
        })
    }

    if (!players) return 0
    // console.log(JSON.stringify(players))
    return players
}