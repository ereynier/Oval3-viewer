Stocker toute les metadata de toute les cartes
---
    academy: boolean
    age: string
    club: string
    competition: string
    name: string
    image: string
    international: boolean
    nationality: string
    opta_id: string         @unique @id
    position: string
    score: number
    season: string
    serial_number: number
    max_serial_number: number
    stats: {
        appearances: string
        attack: number
        defence: number
        evolution: string
        impact: number
        last_scoring: number
        minutes_played_total: string
        red_cards: string
        scoring: number
        skills: number
        strength: number
        tries: string
        yellow_cards: string
        nb_games: [{
            attack: string
            defence: string
            game_date: string
            impact: string
            metadata_total: string
            skills: string
            strength: string
        }]
    }
---

    owner: string
    rarity: string
    opta_id: string     @relation
    tokenId: string         @unique @id
---

mise à jour 1x par semaine en backend
ajouter filtre "owner"
ajouter owner dans "stats"
loading au scroll