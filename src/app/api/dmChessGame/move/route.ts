import { NextResponse } from "next/server";

export async function POST(request: Request) {
    
    return NextResponse.json({
        targets: [
            ['a7', ['a6', 'a5']],
            ['h7', ['h6', 'h5']]
        ],
        events: [
            {
                action: 'piece_move',
                from: 'g2',
                to: 'g4'
            }
        ]
    });
}