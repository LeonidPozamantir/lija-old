import Board from "./board";
import Piece from "./piece";
import Player from "./player";

export default class Game {

    private _hash: string;
    private _isStarted: boolean = false;
    private _players: { [color: string]: Player } = {};
    private _creator?: Player;
    private _board?: Board;

    constructor() {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789_';
        this._hash = Array.from(
            { length: 6 },
            () => chars[Math.floor(Math.random() * chars.length)]
        ).join('');
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

    get players(): { [color: string]: Player } {
        return this._players;
    }

    set players(players: { [color: string]: Player }) {
        this._players = players;
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

    public getPieces(): Piece[] {
        return [...this.getPlayer('white')?.pieces || [], ...this.getPlayer('black')?.pieces || []];
    }

}