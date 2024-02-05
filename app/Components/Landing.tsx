"use client";

import React from "react";
import Cards from "./Cards";
import Searcher from "./Searcher";
import Filters from "./Filters";
import Sorter from "./Sorter";
import { Button } from "@/components/ui/button";

const Landing = () => {

  const [data, setData] = React.useState<any>(null);
  const [sortBy, setSortBy] = React.useState<string>("id");
  const [order, setOrder] = React.useState<string>("asc");
  const [filters, setFilters] = React.useState<any>({
    name: "",
    rarity: [],
    club: [],
    position: {
      prop: true,
      hooker: true,
      lock: true,
      flanker: true,
      number8: true,
      scrumhalf: true,
      outsidehalf: true,
      centre: true,
      leftwing: true,
      rightwing: true,
      fullback: true
    },
    score: [0, 100],
    stats: {
      attack: [0, 100],
      defense: [0, 100],
      strength: [0, 100],
      impact: [0, 100],
      skills: [0, 100]
    },
    age: [17, 40],
    league: [],
    country: []
  });

  const toggleOrder = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full py-2 gap-2">
      <p className="break-all">0xcaec752686fa7b7aAdfD2756FF79AFB328D335C7</p>
      <div className="flex flex-col items-center sm:items-start justify-center gap-2 w-full max-w-4xl">
        <Searcher setData={setData} />
        <div className="flex flex-col sm:flex-row items-start justify-start gap-2 px-8 w-full">
          <Filters setFilters={setFilters} filters={filters} />
          <Sorter setSortBy={setSortBy} toggleOrder={toggleOrder} />
        </div>
      </div>
      {data && data.tokens && (<Cards data={data} sortBy={sortBy} order={order} />)}
      {data && !data.tokens && <p>No cards found</p>}
      <Button onClick={() => console.log(filters)}>Filters</Button>
    </div>
  );
}

export default Landing