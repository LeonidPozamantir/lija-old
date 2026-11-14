import { getGame, getUpdatedAt } from "@/lib/dummy-server";
import { NextResponse } from "next/server";

export async function GET(request: Request, {
  params
}: {
  params: Promise<{ hash: string, updatedAtStr: string }>
}) {
  const { hash, updatedAtStr } = await params;
  if (!/^[\w]{10}$/.test(hash)) return NextResponse.json({ error: 'Incorrect hash' }, { status: 400 });
  if (!/^[\d]{10}$/.test(updatedAtStr)) return NextResponse.json({ error: 'Incorrect updatedAt' }, { status: 400 });

  const updatedAt: number = Number(updatedAtStr);

  const gameHash = hash.substring(0, 6);
  const gameUpdatedAt: number | undefined = await getUpdatedAt(gameHash);
  const game = await getGame(gameHash);

  if (!gameUpdatedAt) return NextResponse.json({ error: 'Game not found' }, { status: 404 });
  
  if (gameUpdatedAt <= updatedAt) return new Response('wait');

  if (game?.isStarted) return new Response(`/player/${hash}`);

  return new Response('wait');
}
