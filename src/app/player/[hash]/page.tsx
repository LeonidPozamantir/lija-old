'use client'
import GameScreen from "@/components/GameScreen";
import { findPlayer } from "@/lib/api";
import { PlayerProvider } from "@/state/PlayerProvider";
import { usePlayerReducer } from "@/state/usePlayerReducer";
import { use, useEffect } from "react"

export default function PlayerPage({
  params
}: {
  params: Promise<{ hash: string }>
}) {
  const { hash } = use(params);
  if (!/^[\w]{10}$/.test(hash)) return null;

  const playerReducer = usePlayerReducer();
  const { player, actions: { setPlayer } } = playerReducer;

  useEffect(() => {
    const loadPlayer = async () => {
      setPlayer(await findPlayer(hash));
    }
    loadPlayer();
  }, [hash]);

  if (!player) return null;
  
  return (
    <PlayerProvider value={playerReducer}>
      <GameScreen player={player} playerPageFlag={true} />
    </PlayerProvider>
  );

}
