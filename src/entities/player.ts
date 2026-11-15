import type Game from "./game";
import Piece from "./piece";
import CloneContext from "./cloneContext";

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

    public clone(context: CloneContext): Player {
        const existing = context.get(this);
        if (existing) return existing;

        const clone = Object.assign(Object.create(Object.getPrototypeOf(this)) as Player, this);
        context.set(this, clone);
        clone._game = this._game?.clone(context);
        clone._pieces = this._pieces?.map(piece => piece.clone(context));
        return clone;
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

    public getIsMyTurn(): boolean {
        return !!this._game && this._game.turns % 2 === (this.isWhite() ? 0 : 1);
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
