import { createContext } from "react";
import type { usePlayerReducer } from "./usePlayerReducer";

export type PlayerContextValue = ReturnType<typeof usePlayerReducer>;

export const PlayerContext = createContext<PlayerContextValue | null>(null);
