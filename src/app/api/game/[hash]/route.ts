import { getGame } from "@/lib/dummy-server";
import { NextResponse } from "next/server";


// TODO: the route should be removed when the backend is implemented
export async function GET(request: Request, {
  params
}: {
  params: Promise<{ hash: string }>
}) {
    const { hash } = await params;
    const gameData = await getGame(hash);
    return NextResponse.json(gameData);
}