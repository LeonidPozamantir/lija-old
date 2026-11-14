import Game from './game';
import type Player from './player';
import CloneContext from './cloneContext';

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

    public clone(context: CloneContext): Piece {
        const existing = context.get(this);
        if (existing) return existing as Piece;

        const clone = Object.assign(Object.create(Object.getPrototypeOf(this)) as Piece, this);
        context.set(this, clone);
        clone._player = this._player.clone(context);
        return clone;
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
        const xKeys: { [key: number]: string } = {1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g', 8: 'h'};
        return `${xKeys[this._x]}${this._y}`;
    }

    public moveTo(x: number, y: number): void {
        this._x = x;
        this._y = y;
    }

    public getColor(): string {
        return this._player.color;
    }
}
