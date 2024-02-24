import { NextResponse } from "next/server";
import { client } from "@/utils/client";
import { isAddress } from "viem";
import Oval3Abi from "@/utils/abi/Oval3.abi.json";
import owners from "@/utils/datas/owners.json";
import { prisma } from "@/lib/prsima";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
const DATA_SOURCE = process.env.DATA_SOURCE || "JSON"

export async function POST(req: Request): Promise<NextResponse> {

    if (!CONTRACT_ADDRESS || isAddress(CONTRACT_ADDRESS) === false) {
        return NextResponse.json({ success: false, status: 400, error: "Invalid contract address" }, { status: 400 });
    }

    let body;
    try {
        body = await req.json();
        console.log(body)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, status: 400, error: "Invalid JSON data" }, { status: 400 });
    }

    const address = String(body.address)

    if (!address || isAddress(address) === false) {
        return NextResponse.json({ success: false, status: 400, error: "Invalid address" }, { status: 400 });
    }

    const balance = await client.readContract({
        address: CONTRACT_ADDRESS,
        abi: Oval3Abi,
        functionName: "balanceOf",
        args: [address],
    });

    if (balance == Number(0)) {
        return NextResponse.json({ success: true, status: 200, data: [] }, { status: 200 });
    }


    let tokens = [];
    let block = 0;

    if (DATA_SOURCE != "DB") {
        // via JSON
        tokens = owners["owners"][address as keyof typeof owners["owners"]]
        block = owners["block"]
    } else {
        // via DB
        const owner = await prisma.owners.findUnique({
            where: {
                address: address
            }
        })
        if (!owner) {
            return NextResponse.json({ success: true, status: 200, data: [] }, { status: 200 });
        }
        tokens = owner.nfts
        const blockData = await prisma.blocks.findFirst({
            orderBy: {
                blockNumber: "desc"
            }
        })
        if (blockData) {
            block = blockData.blockNumber
        }
    }

    tokens = Array.from(new Set(tokens))


    const data = { "tokens": tokens, "block": block }


    return NextResponse.json({ success: true, data: data }, { status: 200 });
}

export async function GET(req: Request): Promise<NextResponse> {
    return NextResponse.json({ success: false, status: 400, error: "Invalid method" }, { status: 400 });
}