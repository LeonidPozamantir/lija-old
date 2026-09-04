import type Game from "./game";
import Piece from "./piece";

export default class Player {
    
    private _color: string;
    private _game?: Game;
    private _pieces?: Piece[];

    constructor(color: string) {
        this._color = color;
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
