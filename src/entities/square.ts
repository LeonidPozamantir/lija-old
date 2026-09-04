import Board from "./board";
import Piece from "./piece";
import Player from "./player";

export default class Square {

    private _board: Board;
    private _key: string;
    private _x: number;
    private _y: number;
    private _color: string;

    constructor(board: Board, key: string, x: number, y: number, color: string) {
        this._board = board;
        this._key = key;
        this._x = x;
        this._y = y;
        this._color = color;
    }

    get key(): string {
        return this._key;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get color(): string {
        return this._color;
    }

    public getPiece(): Piece | undefined {
        return this._board.getPieceByKey(this._key);
    }

    public isControlledBy(player: Player): boolean {
        return player.getControlledKeys().includes(this._key);
    }
}