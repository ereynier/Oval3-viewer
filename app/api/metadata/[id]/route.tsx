
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }): Promise<NextResponse> {

    const id = params.id;

    console.log(id)

    const metadata = await fetch(`https://medias.oval3.game/metadata/${id}`).then(res => res.json()).then(data => data).catch(error => error)

    return NextResponse.json({ success: true, data: metadata }, { status: 200 });
}
