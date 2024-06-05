"use client";

import React, { Suspense } from "react";
import Cards from "./Cards";
import Searcher from "./Searcher";
import Filters from "./Filters";
import Sorter from "./Sorter";
import { emptyFilters } from "@/utils/emptyFilters";
import FiltersHandler from "./FiltersHandler";
import { useFilterOpenStore } from "@/utils/store/FilterOpenStore";



const Landing = () => {

  const [data, setData] = React.useState<{ tokens: number[], block: number } | null>(null); // data from the JSON or DB (owners, tokens ids, last block)
  const [filters, setFilters] = React.useState<any>({ ...emptyFilters }); // filters for the cards
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const filterOpen = useFilterOpenStore(state => state.open);

  return (
    <div className="flex flex-row items-start justify-center min-h-screen h-full w-full gap-2">
      <FiltersHandler setFilters={setFilters} filters={filters} />
      <div className={`${filterOpen ? "md:ml-80" : ""} flex flex-col items-center justify-start min-h-screen h-full w-full py-2 gap-2`}>
        <div className="flex flex-col items-center sm:items-start justify-center gap-2 w-full max-w-4xl">
          <Suspense>
            <Searcher setData={setData} setIsLoading={setIsLoading} />
          </Suspense>
          <div className="flex flex-col sm:flex-row items-start justify-start gap-2 px-8 w-full">
            {/* <div className="fixed left-0 top-2 lg:left-1">
          </div> */}
            <Sorter />
          </div>
        </div>
        {data && data.tokens && (data.tokens).length < 6000 && (data.tokens).length > 0 && (<Cards data={data} filters={filters} />)}
        {data && (!data.tokens || (data.tokens).length == 0) && (
          <div className="flex flex-col items-center justify-center gap-8 w-full max-w-4xl mt-36">
            <p className="text-center text-4xl sm:text-5xl font-bold relative bg-clip-text text-neutral-800 dark:text-neutral-300">
              No cards found
            </p>
            <p className="text-center text-2xl sm:text-3xl font-bold relative bg-clip-text text-neutral-800 dark:text-neutral-300">
              You can buy some on the official <span className="bg-clip-text text-transparent bg-gradient-to-b from-green-200 to-green-500 ">Oval3</span> marketplace
            </p>
          </div>
        )}
        {!data && !isLoading && (
          <div className="absolute inset-0 -z-[1] flex flex-col items-center justify-center">
            <p className="text-center text-5xl sm:text-7xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-green-200 to-green-500 py-8">
              Oval3 Viewer
            </p>
            <p className="text-center text-3xl sm:text-4xl font-bold relative bg-clip-text text-neutral-800 dark:text-neutral-300">
              Check your cards
            </p>
          </div>
        )}

        {data && data.tokens && (data.tokens).length >= 6000 && (
          <div className="flex flex-col items-center justify-center gap-8 w-full max-w-4xl mt-36 px-4">
            <p className="text-center text-4xl sm:text-5xl font-bold relative bg-clip-text text-neutral-800 dark:text-neutral-300">
              Too many cards
            </p>
            <p className="text-center text-2xl sm:text-3xl font-bold relative bg-clip-text text-neutral-800 dark:text-neutral-300">
              {"Contact me if you have >6000 cards."}
            </p>
          </div>
        )}
        <p className="fixed text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-green-200 to-green-500 bottom-1 right-3 -z-5 ">beta</p>
        <p className="absolute text-xs sm:text-sm italic text-foreground opacity-70 top-1">{`block: ${data ? `${data.block}` : ""}`}</p>
      </div>
    </div>
  );
}

export default Landing