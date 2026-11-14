import Game from "@/entities/game";
import Bishop from "@/entities/Piece/bishop";
import King from "@/entities/Piece/king";
import Knight from "@/entities/Piece/knight";
import Pawn from "@/entities/Piece/pawn";
import Queen from "@/entities/Piece/queen";
import Rook from "@/entities/Piece/rook";
import Piece from "@/entities/piece";
import Player from "@/entities/player";

type PieceConstructor = new (x: number, y: number) => Piece;

type PieceData = {
    x: number;
    y: number;
    code: string;
};

type PlayerData = {
    hash: string;
    color: string;
    pieces: PieceData[];
};

export type GameData = {
    hash: string;
    isStarted: boolean;
    creator: string;
    players: Record<string, PlayerData>;
    updatedAt: number;
};

const pieceTypes: Record<string, PieceConstructor> = {
    p: Pawn,
    n: Knight,
    b: Bishop,
    r: Rook,
    q: Queen,
    k: King,
};

export default class Convertor {
    public convertGame(gameData: GameData): Game {
        const game = new Game();

        this.setHash(game, gameData.hash);
        game.isStarted = gameData.isStarted;
        game.updatedAt = gameData.updatedAt;
        game.players = Object.fromEntries(
            Object.entries(gameData.players).map(([color, playerData]) => [
                color,
                this.createPlayer(game, playerData),
            ]),
        );
        game.creator = game.getPlayer(gameData.creator);

        return game;
    }

    private createPlayer(game: Game, playerData: PlayerData): Player {
        const player = new Player(playerData.color);

        this.setHash(player, playerData.hash);
        player.game = game;
        player.pieces = playerData.pieces.map((pieceData) =>
            this.createPiece(player, pieceData),
        );

        return player;
    }

    private createPiece(player: Player, pieceData: PieceData): Piece {
        const PieceType = pieceTypes[pieceData.code];

        if (!PieceType) {
            throw new Error(`Unsupported piece code: ${pieceData.code}`);
        }

        const piece = new PieceType(pieceData.x, pieceData.y);
        piece.player = player;

        return piece;
    }

    private setHash(target: object, hash: string): void {
        Object.assign(target, { _hash: hash });
    }
}
