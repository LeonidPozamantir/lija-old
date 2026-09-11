import King from "@/entities/Piece/king";
import Player from "@/entities/player";
import Link from "next/link";

export default function Board({
  player
}: Readonly<{
  player: Player
}>) {
  let squares = player.game.board?.squares;
  if (player.isBlack()) {
    squares = new Map([...squares].reverse());
  }

  let x = 1;
  let y = 1;

  const squareElements = [];

  for (const [key, square] of squares) {
    const piece = square.getPiece();
    const check = piece instanceof King && piece.isAttacked() ? ' check' : '';
    const el = (
      <div key={square.key} className={`lija_square ${square.color} ${check}`} id={square.key} style={{ top: 64 * (8 - x), left: 64 * (y - 1) }}>
        <div className="ljsi">
          {piece && <div className={`lija_piece ${piece.getClass().toLowerCase()} ${piece.getColor()}`} id={piece.hash}></div>}
        </div>
      </div>
    );
    if (++x === 9) {
      x = 1; ++y;
    }
    squareElements.push(el);
  }

  return (
    <div className="lija_board">
      {squareElements}
    </div>
  );
}