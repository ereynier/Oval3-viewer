import { getBlockNumber } from "viem/actions";
import { client } from "../utils/client";
const Oval3Abi = require("../utils/abi/Oval3.abi.json");
import * as fs from 'fs';
import { argv } from "process";

async function getOwners(contractAddress: `0x${string}`, maxId = 0) {

    const owners: { [key: `0x${string}`]: number[] } = {};

    let totalSupply = await client.readContract({
        address: contractAddress,
        abi: Oval3Abi as any,
        functionName: "totalSupply",
        args: [],
    });

    if (maxId > 0) {
        totalSupply = maxId;
    }

    for (let i = 0; i < Number(totalSupply); i++) {
        const owner = await client.readContract({
            address: contractAddress,
            abi: Oval3Abi as any,
            functionName: "ownerOf",
            args: [i],
        }) as `0x${string}`;
        owners[owner] = [...(owners[owner] || []), i];
        console.log(`${((i / Number(totalSupply)) * 100).toFixed(0)} / 100 - ${i} / ${Number(totalSupply)}`)
    }

    const blockNb = await client.getBlockNumber();
    const datas = { "block": Number(blockNb), "owners": owners }
    fs.writeFileSync('./data.json', JSON.stringify(datas, null, 2), 'utf-8');


}

function main() {

    const maxId = Number(argv[2]) || 0;
    getOwners("0x83a5564378839EeF0721bc68A0fbeb92e2dE73d2", maxId);
}

main();