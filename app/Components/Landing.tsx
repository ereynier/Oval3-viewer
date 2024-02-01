"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Cards from "./Cards";
import Searcher from "./Searcher";

const Landing = () => {

  const [data, setData] = React.useState<any>(null);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full py-2 gap-2">
      <p>0xcaec752686fa7b7aAdfD2756FF79AFB328D335C7</p>
      <Searcher setData={setData} />
      <Cards data={data} />
    </div>
  );
}

export default Landing