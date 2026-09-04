import Piece from "../piece";

export default class King extends Piece {

    public getClass(): string {
        return 'King';
    }

    public isAttacked(): boolean {
        return this.getGame().isStarted && this.getSquare().isControlledBy(this.player.getOpponent());
    }

}