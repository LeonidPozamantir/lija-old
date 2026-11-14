import Player from "@/entities/player";
import Piece from "@/entities/piece";
import CloneContext from "@/entities/cloneContext";
import { useReducer } from "react";

function clonePlayer(player: Player): { player: Player; context: CloneContext } {
    const context = new CloneContext();
    return { player: player.clone(context), context };
}

function killPiece(state: Player, piece: Piece): Player {
    if (piece.getGame() !== state.game || !piece.player.pieces?.includes(piece)) return state;

    const { player: nextState, context } = clonePlayer(state);
    const nextPiece = context.get(piece) as Piece | undefined;
    if (!nextPiece) return state;
    const owner = nextPiece.player;
    owner.pieces = owner.pieces.filter(ownedPiece => ownedPiece !== nextPiece);
    nextState.game.board.compile();
    return nextState;
}

function playerReducer(state: Player | undefined, action: { type: string; payload?: any }): Player | undefined {
    switch (action.type) {
        case 'MOVE_PIECE':
            if (!state) return state;
            const { fromKey, toKey } = action.payload;
            const board = state.game.board;
            const piece = board.getPieceByKey(fromKey);
            const destination = board.getSquareByKey(toKey);

            if (!piece || !destination || fromKey === toKey) {
                return state;
            }

            const capturedPiece = board.getPieceByKey(toKey);
            const { player: nextState, context } = clonePlayer(state);
            const nextBoard = nextState.game.board;
            const nextPiece = context.get(piece) as Piece | undefined;
            if (!nextPiece) return state;
            if (capturedPiece) {
                const nextCapturedPiece = context.get(capturedPiece) as Piece | undefined;
                if (!nextCapturedPiece) return state;
                const owner = nextCapturedPiece.player;
                owner.pieces = owner.pieces.filter(ownedPiece => ownedPiece !== nextCapturedPiece);
            }
            nextPiece.moveTo(destination.x, destination.y);
            nextBoard.compile();
            return nextState;
        case 'KILL_PIECE': {
            if (!state) return state;
            const piece = action.payload?.piece as Piece | undefined;
            if (!piece) return state;
            return killPiece(state, piece);
        }
        case 'SET_PLAYER':
            return action.payload as Player;
        default:
            return state;
    }
}

export function usePlayerReducer(state?: Player | undefined) {
    const [player, dispatch] = useReducer(playerReducer, state);

    const movePiece = (from: string, to: string) => {
        dispatch({ type: 'MOVE_PIECE', payload: { fromKey: from, toKey: to } });
    };

    const killPiece = (piece: Piece) => {
        dispatch({ type: 'KILL_PIECE', payload: { piece } });
    };

    const setPlayer = (player: Player | undefined) => {
        dispatch({ type: 'SET_PLAYER', payload: player });
    };

    return {
        player,
        actions: {
            movePiece,
            killPiece,
            setPlayer
        }
    };
}
