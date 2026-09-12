'use client'
import Board from "@/components/Board";
import Game from "@/entities/game";
import { fetchGame } from "@/lib/api";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function GamePage({
  params
}: {
  params: Promise<{ hash: string }>
}) {
  const { hash } = use(params);
  const [game, setGame] = useState(undefined as Game | undefined);

  useEffect(() => {
    fetchGame(hash).then(gameData => setGame(gameData));
  }, [hash]);


  if (!game) return;

  if (game.isStarted) {
    const player = game.creator;
    if (!player) return;  
    return (
      <div className={`lija_game clearfix lija_player_${player.color}`}>
        <div className="lija_board_wrap">
          <Board player={player} />
          <Link href={`/${player.getOpponent()!.color}`} className="lija_exchange" title="Change position"></Link>
        </div>
        <div className="lija_table_wrap">
          <div className="lija_table lija_table_not_started">
            <a className="lija_button lija_toggle_join_url">Play with a friend</a>
            <div className="lija_join_url">
              <p>To invite someone to play, give this url:</p>
              <span><a href={`/game/${player.game.hash}`}></a></span>
              <div className="lija_join_ai">
                <a href={`/ai/${player.getFullHash()}`} className="lija_button">Play with the machine</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const player = game.getInvited();
  game.isStarted = true;

  // TODO: $this->container->getLichessPersistenceService()->save($game);

  redirect(`/player/${player?.getFullHash()}`);

}