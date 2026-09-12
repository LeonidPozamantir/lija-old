'use client';
import { use, useEffect, useState } from "react";
import Board from "@/components/Board";
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
    // TODO: $this->container->getLichessPersistenceService()->save($game);
  }, [color]);
  if (!player) return null;

  return (
    <div className={`lija_game clearfix lija_player_${player.color}`}>
      <div className="lija_board_wrap">
        <Board player={player}/>
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


