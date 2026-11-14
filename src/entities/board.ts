import Game from "./game";
import Piece from "./piece";
import Square from "./square";
import CloneContext from "./cloneContext";

export default class Board {

    private _game: Game;
    private _squares: Map<string, Square>;
    private pieces: { [key: string]: Piece } = {};

    constructor(game: Game) {
        this._game = game;
        this._squares = new Map();
        this.createSquares();
        this.compile();
    }

    public clone(context: CloneContext): Board {
        const existing = context.get(this);
        if (existing) return existing;

        const clone = Object.assign(Object.create(Object.getPrototypeOf(this)) as Board, this);
        context.set(this, clone);
        clone._game = this._game.clone(context);
        clone._squares = new Map([...this._squares].map(([key, square]) => [key, square.clone(context)]));
        clone.pieces = {};
        clone.compile();
        return clone;
    }

    public compile() {
        this.pieces = {};
        this.getPieces().forEach((piece) => {
            this.pieces[piece.getSquareKey()] = piece;
        });
    }

    public getPieces(): Piece[] {
        return this._game.getPieces();
    }

    get squares(): Map<string, Square> {
        return this._squares;
    }

    public getSquareByKey(key: string): Square | undefined {
        return this._squares.get(key);
    }

    public getPieceByKey(key: string): Piece | undefined {
        return this.pieces[key];
    }

    protected createSquares() {
        for (let x = 1; x <= 8; x++) {
            for (let y = 1; y <= 8; y++) {
                const key = this.posToKey(x, y);
                const color = (x + y) % 2 === 0 ? 'white' : 'black';
                this._squares.set(key, new Square(this, key, x, y, color));
            }   
        }
    }

    public posToKey(x: number, y: number): string {
        const xKeys: { [key: number]: string } = {1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g', 8: 'h'};
        return `${xKeys[x]}${y}`;
    }
}
