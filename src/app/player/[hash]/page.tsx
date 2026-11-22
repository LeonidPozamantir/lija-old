'use client'
import GameScreen from "@/components/GameScreen";
import { findPlayer } from "@/lib/api";
import { WebSocketMessageStatus } from "@/lib/websocketMessages";
import { PlayerProvider } from "@/state/PlayerProvider";
import { usePlayerReducer } from "@/state/usePlayerReducer";
import { use, useEffect } from "react"
import { useStompClient } from "react-stomp-hooks";

export default function PlayerPage({
  params
}: {
  params: Promise<{ hash: string }>
}) {
  const { hash } = use(params);
  if (!/^[\w]{10}$/.test(hash)) return null;

  const playerReducer = usePlayerReducer();
  const { player, actions: { setPlayer } } = playerReducer;
  const stompClient = useStompClient();

  useEffect(() => {
    const loadPlayer = async () => {
      setPlayer(await findPlayer(hash));
    }
    loadPlayer();
  }, [hash]);

  useEffect(() => {
    stompClient?.publish({
      destination: '/app', 
      body: JSON.stringify({ status: WebSocketMessageStatus.PLAY })
    });
  }, [stompClient])

  if (!player) return;
  return (
      <PlayerProvider value={playerReducer}>
        <GameScreen playerPageFlag={true} />
      </PlayerProvider>
  );

}
