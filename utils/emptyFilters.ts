import clubs from "@/utils/datas/clubs.json";
import leagues from "@/utils/datas/leagues.json";
import countries from "@/utils/datas/countries.json";

export const emptyFilters = {
  owner: "",
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
  score: [-10, 100],
  stats: {
    attack: [-10, 100],
    defense: [-10, 100],
    strength: [-10, 100],
    impact: [-10, 100],
    skills: [-10, 100]
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
      acc[country.code] = true;
      return acc;
    }, {})
  },
  gw_score: [-10, 100],
  gw_number: 1,
  hide_gw_na: false,
  only_pinned: false
}