import { NextResponse } from "next/server";
import owners from "@/utils/datas/owners.json";

export async function GET(req: Request): Promise<NextResponse> {
    const block = owners["block"]
    return NextResponse.json({ success: true, data: block }, { status: 200 });
}
