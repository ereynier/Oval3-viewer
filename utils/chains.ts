import { polygon, Chain } from "viem/chains";

const CHAIN = process.env.NEXT_PUBLIC_CHAIN || "polygon";
const POLYGON_ALCHEMY_API_KEY = process.env.POLYGON_ALCHEMY_API_KEY || "";

const chains: {[key: string]: Chain} = {
    polygon
};

const rpc: {[key: string]: string} = {
    polygon: POLYGON_ALCHEMY_API_KEY
};

export const chain: Chain = chains[CHAIN];

export const chainRpc: string = rpc[CHAIN];