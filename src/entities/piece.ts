import Game from './game';
import type Player from './player';

export default abstract class Piece {

    private _player: Player;
    private _x: number;
    private _y: number;
    private _hash: string;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
        this._hash = Math.random().toString(16).slice(2, 8);
    }

    get hash(): string {
        return this._hash;
    }

    abstract getClass(): string;

    public isClass(className: string): boolean {
        return this.getClass() === className;
    }

    get player() {
        return this._player;
    }

    public set player(player: Player) {
        this._player = player;
    }

    public getSquare(): Square {
        return this.getGame().board.getSquareByKey(this.getSquareKey());
    }

    public getGame(): Game {
        return this._player.game;
    }

    public getSquareKey(): string {
        return `s${this._x}${this._y}`;
    }

    public getColor(): string {
        return this._player.color;
    }
}
