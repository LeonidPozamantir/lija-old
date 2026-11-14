'use client';
import { use, useEffect, useState } from "react";
import Generator from "@/chess/generator";
import Player from "@/entities/player";
import { notFound } from "next/navigation";
import GameScreen from "@/components/GameScreen";

export default function Home({
  params
}: {
  params: Promise<{ color: string }>
}) {
  
  const { color } = use(params);
  if (color !== 'white' && color !== 'black') {
    notFound();
  }

  const generator = new Generator();
  const [player, setPlayer] = useState(undefined as Player | undefined);
  useEffect(() => {
    const game = generator.createGame();
    setPlayer(game.getPlayer(color));
    game.creator = player;
    // TODO: $this->container->getLichessPersistenceService()->save($game);
  }, [color]);
  if (!player) return null;

  return <GameScreen player={player} />;
}


