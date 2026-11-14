'use client'
import GameScreen from "@/components/GameScreen";
import Game from "@/entities/game";
import { fetchGame } from "@/lib/api";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function GamePage({
  params
}: {
  params: Promise<{ hash: string }>
}) {
  const { hash } = use(params);
  if (!/^[\w]{6}$/.test(hash)) return null;
  const [game, setGame] = useState(undefined as Game | undefined);

  useEffect(() => {
    fetchGame(hash).then(gameData => setGame(gameData));
  }, [hash]);

  if (!game) return;

  if (game.isStarted) {
    const player = game.creator;
    if (!player) return;  
    return <GameScreen player={player} />;
  }

  const player = game.getInvited();
  game.isStarted = true;

  // TODO: $this->container->getLichessPersistenceService()->save($game);

  redirect(`/player/${player?.getFullHash()}`);

}