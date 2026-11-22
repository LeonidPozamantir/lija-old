'use client';
import { use, useEffect, useState } from "react";
import { useStompClient } from "react-stomp-hooks";
import Generator from "@/chess/generator";
import Player from "@/entities/player";
import { notFound } from "next/navigation";
import GameScreen from "@/components/GameScreen";
import { WebSocketMessageStatus } from "@/lib/websocketMessages";

export default function Home({
  params
}: {
  params: Promise<{ color: string }>
}) {
  
  const { color } = use(params);
  const [player, setPlayer] = useState(undefined as Player | undefined);
  
  useEffect(() => {
    const game = generator.createGame();
    setPlayer(game.getPlayer(color));
    game.creator = player;
    // TODO: $this->container->getLichessPersistenceService()->save($game);
  }, [color]);

  const stompClient = useStompClient();

   useEffect(() => {
  
      stompClient?.publish({
        destination: '/app',
        body: JSON.stringify({ status: WebSocketMessageStatus.WAIT })
      });
      
    }, [stompClient]);


  if (color !== 'white' && color !== 'black') {
    notFound();
  }

  const generator = new Generator();
  if (!player) return null;

  return <GameScreen player={player} />;
}


