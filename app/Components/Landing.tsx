"use client";

import React from "react";
import Cards from "./Cards";
import Searcher from "./Searcher";
import Filters from "./Filters";
import Sorter from "./Sorter";
import { emptyFilters } from "@/utils/emptyFilters";



const Landing = () => {

  const [data, setData] = React.useState<any>(null);
  const [sortBy, setSortBy] = React.useState<string>("id");
  const [order, setOrder] = React.useState<string>("asc");
  const [filters, setFilters] = React.useState<any>({...emptyFilters});

  const toggleOrder = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full py-2 gap-2">
      <p className="break-all">0xcaec752686fa7b7aAdfD2756FF79AFB328D335C7</p>
      <p className="break-all">0x80caa8357973D51FE67835cDa5c284e8Cd47eC83</p>
      <div className="flex flex-col items-center sm:items-start justify-center gap-2 w-full max-w-4xl">
        <Searcher setData={setData} />
        <div className="flex flex-col sm:flex-row items-start justify-start gap-2 px-8 w-full">
          <Filters setFilters={setFilters} filters={filters} />
          <Sorter setSortBy={setSortBy} toggleOrder={toggleOrder} order={order} />
        </div>
      </div>
      {data && data.tokens && (<Cards data={data} sortBy={sortBy} order={order} filters={filters} />)}
      {data && !data.tokens && <p>No cards found</p>}
      {!data && <p>Enter an address to search the cards.</p>}
    </div>
  );
}

export default Landing