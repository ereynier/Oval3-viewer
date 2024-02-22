import clubs from "@/utils/datas/clubs.json";
import leagues from "@/utils/datas/leagues.json";
import countries from "@/utils/datas/countries.json";

export const emptyFilters = {
    name: "",
    rarity: {
      "LIMITED": true,
      "RARE": true,
      "SUPER RARE": true,
      "UNIQUE": true
    },
    // clubs: {"clubs.name1": true,"clubs.name2": true, ...}
    clubs: {
      ...clubs.reduce((acc: any, club: any) => {
        acc[club.name] = true;
        return acc;
      }, {})
    },
    position: {
      "Prop": true,
      "Hooker": true,
      "Lock": true,
      "Flanker": true,
      "Number 8": true,
      "Scrum Half": true,
      "Outside Half": true,
      "Centre": true,
      "Left Wing": true,
      "Right Wing": true,
      "Full Back": true
    },
    score: [0, 100],
    stats: {
      attack: [0, 100],
      defense: [0, 100],
      strength: [0, 100],
      impact: [0, 100],
      skills: [0, 100]
    },
    age: [15, 60],
    leagues: {
      ...leagues.reduce((acc: any, league: any) => {
        acc[league.name] = true;
        return acc;
      }, {})
    },
    countries: {
      ...countries.reduce((acc: any, country: any) => {
        acc[country.name] = true;
        return acc;
      }, {})
    },
    gw_score: [0, 100],
    hide_gw_na: false
  }