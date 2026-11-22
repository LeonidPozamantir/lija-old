'use client'
import GameScreen from "@/components/GameScreen";
import Game from "@/entities/game";
import { fetchGame } from "@/lib/api";
import { WebSocketMessageStatus } from "@/lib/websocketMessages";
import { PlayerProvider } from "@/state/PlayerProvider";
import { usePlayerReducer } from "@/state/usePlayerReducer";
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import { useStompClient } from "react-stomp-hooks";

export default function GamePage({
  params
}: {
  params: Promise<{ hash: string }>
}) {

  const router = useRouter();
  const { hash } = use(params);
  const [game, setGame] = useState(undefined as Game | undefined);
  const playerReducer = usePlayerReducer();
  const { actions: { setPlayer } } = playerReducer;

  const messageSent = useRef(false);

  const stompClient = useStompClient();

  useEffect(() => {
    fetchGame(hash).then(gameData => setGame(gameData));
  }, [hash]);

  useEffect(() => {
    if (!game || !stompClient || game.isStarted || messageSent.current) return;

    const playerInvited = game.getInvited();
    if (!playerInvited) return;

    game.isStarted = true;
    // TODO: $this->container->getLichessPersistenceService()->save($game);

    stompClient.publish({
      destination: '/app',
      body: JSON.stringify({ status: WebSocketMessageStatus.START, hash: playerInvited.getOpponent()?.getFullHash })
    });
    messageSent.current = true;

    router.replace(`/player/${playerInvited.getFullHash()}`);

  }, [router, game, stompClient]);

  useEffect(() => {
    if (game?.isStarted) {
      const playerCreator = game.creator;
      setPlayer(playerCreator);
    }
  }, [game]);

  if (!/^[\w]{6}$/.test(hash)) return null;
  if (!game) return null;

  if (game.isStarted) {
    return (
      <PlayerProvider value={playerReducer}>
        <GameScreen />
      </PlayerProvider>
    );
  }

}