"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Cards from "./Cards";
import Searcher from "./Searcher";
import Filters from "./Filters";
import Sorter from "./Sorter";

const Landing = () => {

  const [data, setData] = React.useState<any>(null);
  const [sortBy, setSortBy] = React.useState<string>("id");
  const [order, setOrder] = React.useState<string>("asc");

  const toggleOrder = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full py-2 gap-2">
      <p>0xcaec752686fa7b7aAdfD2756FF79AFB328D335C7</p>
      <Searcher setData={setData} />
      <div className="flex flex-row items-center justify-center gap-2">
        <Sorter setSortBy={setSortBy} toggleOrder={toggleOrder} />
        <Filters />
      </div>
      {data && data.tokens && (<Cards data={data} sortBy={sortBy} order={order} />)}
      {data && !data.tokens && <p>No cards found</p>}
    </div>
  );
}

export default Landing