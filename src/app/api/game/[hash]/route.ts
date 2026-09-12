import { NextResponse } from "next/server";

import gameData from "@/json/dummy-game.json";

export function GET() {
    return NextResponse.json(gameData);
}