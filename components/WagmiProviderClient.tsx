"use client";

import { config } from "@/utils/wagmiConfig";
import React from "react";
import { WagmiProvider } from "wagmi";

const WagmiProviderClient: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};

export default WagmiProviderClient;
