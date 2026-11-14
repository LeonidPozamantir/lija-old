'use client';

import { PlayerContext } from "./PlayerContext";
import type Player from "@/entities/player";

export function PlayerProvider({ value, children }: { value, children: React.ReactNode }) {

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
};
