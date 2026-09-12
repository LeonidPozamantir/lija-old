'use client'
import Board from "@/components/Board";
import Game from "@/entities/game";
import { fetchGame } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react"

export default function PlayerPage({
  params
}: {
  params: Promise<{ hash: string }>
}) {
  const { hash } = use(params);
  const gameHash = hash.substring(0, 6);
  const [game, setGame] = useState(undefined as Game | undefined);

  useEffect(() => {
    fetchGame(gameHash).then(gameData => setGame(gameData));
  }, [gameHash]);

  if (!game) return;

  const playerHash = hash.substring(6, 10);
  const player = game?.getPlayerByHash(playerHash);
  if (!player) {
    console.error(`Can't find player ${playerHash}`);
    notFound();
  }

  return (
    <div className={`lija_game clearfix lija_player_${player.color}`}>
      <div className="lija_board_wrap">
        <Board player={player}/>
      </div>
      <div className="lija_table_wrap">
        <div className="lija_table">

        </div>
      </div>
    </div>
  )

}