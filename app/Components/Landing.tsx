"use client";

import React from "react";
import Cards from "./Cards";
import Searcher from "./Searcher";
import Filters from "./Filters";
import Sorter from "./Sorter";
import { emptyFilters } from "@/utils/emptyFilters";



const Landing = () => {

  const [data, setData] = React.useState<any>(null);
  const [filters, setFilters] = React.useState<any>({ ...emptyFilters });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen h-full w-full py-2 gap-2">
      <div className="flex flex-col items-center sm:items-start justify-center gap-2 w-full max-w-4xl">
        <Searcher setData={setData} setIsLoading={setIsLoading} />
        <div className="flex flex-col sm:flex-row items-start justify-start gap-2 px-8 w-full">
          <Filters setFilters={setFilters} filters={filters} />
          <Sorter />
        </div>
      </div>
      {data && data.tokens && (data.tokens).length < 1000 && (data.tokens).length > 0 && (<Cards data={data} filters={filters} />)}
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

      {data && data.tokens && (data.tokens).length >= 1000 && (
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-4xl mt-36 px-4">
          <p className="text-center text-4xl sm:text-5xl font-bold relative bg-clip-text text-neutral-800 dark:text-neutral-300">
            Too many cards
          </p>
          <p className="text-center text-2xl sm:text-3xl font-bold relative bg-clip-text text-neutral-800 dark:text-neutral-300">
            {"Contact me if you have >1000 cards."}
          </p>
        </div>
      )}
      <p className="fixed text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-green-200 to-green-500 bottom-3 right-3 -z-5 ">beta</p>
    </div>
  );
}

export default Landing