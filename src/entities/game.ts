import Board from "./board";
import Piece from "./piece";
import Player from "./player";
import CloneContext from "./cloneContext";

export default class Game {

    private _hash: string;
    private _isStarted: boolean = false;
    private _isFinished: boolean = false;
    private _players: { [color: string]: Player } = {};
    private _creator?: Player;
    private _turns: number = 0;
    private _board?: Board;

    private _updatedAt: number;

    constructor() {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789_';
        this._hash = Array.from(
            { length: 6 },
            () => chars[Math.floor(Math.random() * chars.length)]
        ).join('');

        this._updatedAt = Date.now();
    }

    public clone(context: CloneContext): Game {
        const existing = context.get(this);
        if (existing) return existing;

        const clone = Object.assign(Object.create(Object.getPrototypeOf(this)) as Game, this);
        context.set(this, clone);
        clone._players = Object.fromEntries(
            Object.entries(this._players).map(([color, player]) => [color, player.clone(context)])
        );
        clone._creator = this._creator?.clone(context);
        clone._board = this._board?.clone(context);
        return clone;
    }

    get board(): Board {
        if (!this._board) {
            this._board = new Board(this);
        }
        return this._board;
    }
    
    set board(board: Board) {
        this._board = board;
    }

    get isStarted(): boolean {
        return this._isStarted;
    }

    set isStarted(isStarted: boolean) {
        this._isStarted = isStarted;
    }

    get isFinished(): boolean {
        return this._isFinished;
    }

    set isFinished(isFinished: boolean) {
        this._isFinished = isFinished;
    }

    get players(): { [color: string]: Player } {
        return this._players;
    }

    set players(players: { [color: string]: Player }) {
        this._players = players;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    set updatedAt(updatedAt: number) {
        this._updatedAt = updatedAt;
    }

    public getPlayer(color: string): Player | undefined {
        return this._players[color];
    }

    public getPlayerByHash(hash: string): Player | undefined {
        if (this.getPlayer('white')?.hash === hash) return this.getPlayer('white');
        return this.getPlayer('black');
    }

    get creator(): Player | undefined {
        return this._creator;
    }

    public getInvited(): Player | undefined {
        if (!this._creator) return undefined;
        if (this.creator?.isWhite()) return this.getPlayer('black');
        return this.getPlayer('white');
    }

    set creator(creator: Player | undefined) {
        this._creator = creator;
    }

    get hash(): string {
        return this._hash;
    }

    get turns(): number {
        return this._turns;
    }

    public getPieces(): Piece[] {
        return [...this.getPlayer('white')?.pieces || [], ...this.getPlayer('black')?.pieces || []];
    }

}
