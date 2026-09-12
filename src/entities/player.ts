import type Game from "./game";
import Piece from "./piece";

export default class Player {

    private _hash: string;
    private _color: string;
    private _game?: Game;
    private _pieces?: Piece[];

    constructor(color: string) {
        this._color = color;
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789_';
        this._hash = Array.from(
            { length: 4 },
            () => chars[Math.floor(Math.random() * chars.length)]
        ).join('');
    }

    get hash(): string {
        return this._hash;
    }

    public getFullHash() {
        return this.game.hash + this._hash;
    }

    get color(): string {
        return this._color;
    }

    public getOpponent(): Player | undefined {
        return this._game?.getPlayer(this.isWhite() ? 'black' : 'white');
    }

    get game(): Game {
        return this._game;
    }

    set game(game: Game) {
        this._game = game;
    }

    get pieces(): Piece[] {
        return this._pieces;
    }

    set pieces(pieces: Piece[]) {
        this._pieces = pieces;
    }

    public getControlledKeys(): string[] {
        return [...new Set(this.getTargetKeysByPieces().flat())];
    }

    public getTargetKeysByPieces(protectKing = false, exceptKing = true): string[][] {
        return [];
    }


    public isWhite(): boolean {
        return 'white' === this._color;
    }

    public isBlack(): boolean {
        return 'black' === this._color;
    }
};
