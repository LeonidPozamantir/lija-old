import Board from "./board";
import Piece from "./piece";
import Player from "./player";

export default class Game {

    private _isStarted: boolean = false;
    private _players: { [color: string]: Player } = {};
    private _board?: Board;

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

    public getPieces(): Piece[] {
        return [...this.getPlayer('white')?.pieces || [], ...this.getPlayer('black')?.pieces || []];
    }

}