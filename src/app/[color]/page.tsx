'use client';
import { use, useEffect, useState } from "react";
import Board from "./Board";
import Generator from "@/chess/generator";
import Player from "@/entities/player";
import { notFound } from "next/navigation";
import Link from "next/link";



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
  }, [color]);
  if (!player) return null;

  return (
    <div className={`lija_game clearfix lija_player_${player.color}`}>
      <div className="lija_board_wrap">
        <Board player={player}/>
        {!player.game.isStarted ? <Link href={`/${player.getOpponent()!.color}`} className="lija_exchange" title="Change position"></Link> : null}
      </div>
      <div className="lija_table_wrap">
        cemetary
        panel
        cemetary
      </div>
    </div>
  );
}
