import Game from "./game";
import Piece from "./piece";
import Square from "./square";

export default class Board {

    private _game: Game;
    private _squares: Map<string, Square>;
    private cache: { [key: string]: Piece } = {};

    constructor(game: Game) {
        this._game = game;
        this._squares = new Map();
        this.createSquares();
        this.compile();
    }

    public compile() {
        this.cache = {};
        this.getPieces().forEach((piece) => {
            this.cache[piece.getSquareKey()] = piece;
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
        return this.cache[key];
    }

    protected createSquares() {
        for (let x = 1; x <= 8; x++) {
            for (let y = 1; y <= 8; y++) {
                const key = 's' + x + y;
                const color = (x + y) % 2 === 0 ? 'white' : 'black';
                this._squares.set(key, new Square(this, key, x, y, color));
            }   
        }
    }
}