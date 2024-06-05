import { prisma } from "@/lib/prsima";
import { NextResponse } from "next/server"

export async function POST(req: Request): Promise<NextResponse> {

    let body;
    try {
        body = await req.json();
        console.log(body)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, status: 400, error: "Invalid JSON data" }, { status: 400 });
    }
    const feedbackType = String(body.feedbackType)
    const feedbackMessage = String(body.feedbackMessage)

    if (!feedbackType || !feedbackMessage || feedbackMessage.length == 0) {
        return NextResponse.json({ success: false, status: 400, error: "Veuillez remplir tous les champs" }, { status: 400 });
    }
    
    const feedbackTypes = ['amélioration', 'fonctionnalité', 'bug']
    if (feedbackTypes.indexOf(feedbackType) === -1) {
        return NextResponse.json({ success: false, status: 400, error: "Type invalide" }, { status: 400 });
    }

    // Save feedback to database

    try {

        const feedback = await prisma.feedback.create({
            data: {
                type: feedbackType,
                message: feedbackMessage,
            }
        })
        
        if (!feedback) {
            return NextResponse.json({ success: false, status: 500, error: "Internal error" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, status: 500, error: "Internal error" }, { status: 500 });
    }

    return NextResponse.json({ success: true, status: 200, message: "ok" }, { status: 200 })
}