import Game from "@/entities/game";
import Piece from "@/entities/piece";
import Bishop from "@/entities/Piece/bishop";
import King from "@/entities/Piece/king";
import Knight from "@/entities/Piece/knight";
import Pawn from "@/entities/Piece/pawn";
import Queen from "@/entities/Piece/queen";
import Rook from "@/entities/Piece/rook";
import Player from "@/entities/player";

export default class Generator {

    public static get types(): { [name: string]: typeof Piece } {
        return {
            Pawn,
            Knight,
            Bishop,
            Rook,
            Queen,
            King,
        };
    }

    public createGame(): Game {
        const game = new Game();
        game.players = {
            white: this.createPlayer(game, 'white'),
            black: this.createPlayer(game, 'black')
        };

        game.creator = game.getPlayer('white');

        return game;
    }

    public createPlayer(game: Game, color: string): Player {
        const player = new Player(color);
        player.game = game;
        player.pieces = this.createPieces(player);

        return player;
    }

    public createPieces(player: Player): Piece[] {
        const pieces: Piece[] = [];
        ['Rook', 'Knight', 'Bishop', 'Queen', 'King', 'Bishop', 'Knight', 'Rook'].forEach((type, index) => {
            pieces.push(this.createPiece('Pawn', player, index + 1));
            pieces.push(this.createPiece(type, player, index + 1));
        });
        return pieces;
    }

    public createPiece(type: string, player: Player, x: number): Piece {
        const PieceClass = Generator.types[type];
        let y;
        if ('white' === player.color) {
            y = 'Pawn' === type ? 2 : 1;
        } else {
            y = 'Pawn' === type ? 7 : 8;
        }

        const piece = new PieceClass(x, y);
        piece.player = player;
        return piece;
    }

}