import Piece from "@/entities/piece";
import King from "@/entities/Piece/king";
import Player from "@/entities/player";
import Square from "@/entities/square";
import { useState } from "react";
import Promotion from "./Promotion";
import { MoveData } from "./GameScreen";
import { usePlayer } from "@/state/usePlayer";

export default function Board({
  player,
  onMove,
  movePiece,
  options
}: Readonly<{
  player: Player,
  onMove: (moveData: MoveData) => void,
  movePiece: (from: string, to: string) => void,
  options: {
    game: {
      started: boolean
    },
    player: {
      color: string,
      code: string
    },
    targets?: Map<string, string[]>
  }
}>) {


  const [pieceMoving, setPieceMoving] = useState('');
  const [droppableActive, setDroppableActive] = useState(new Set<string>());
  const [droppableHover, setDroppableHover] = useState(new Set<string>());
  const [pendingMoveData, setPendingMoveData] = useState<MoveData | undefined>();
  const [showPromotion, setShowPromotion] = useState(false);
  
  let squares = player.game.board?.squares;
  if (player.isBlack()) {
    squares = new Map([...squares].reverse());
  }

  let x = 1;
  let y = 1;

  const squareElements = [];

  const onSquareClick = (square: Square) => {
    if (!options.game.started) return;
    if (!pieceMoving) {
      const piece = square.getPiece();
      if (piece && piece.getColor() === options.player.color) {
        const squareKey = square.key;
        setPieceMoving(squareKey);
        addDroppableActive(squareKey);
        if (isMyTurn()) {
          options.targets!.get(squareKey)?.forEach(key => {
            addDroppableActive(key);
            addDroppableHover(key);
          });
        }
      }
    } else {
      const willDrop = droppableActive.has(square.key);
      setPieceMoving('');
      setDroppableActive(new Set());
      setDroppableHover(new Set());
      if (willDrop) drop(square);
    }
  };

  

  const drop = (square: Square) => {
    const piece: Piece = squares.get(pieceMoving)?.getPiece()!;

    setDroppableActive(new Set());

    const oldSquareKey = piece.getSquareKey();
    if (square.key === oldSquareKey) return;

    movePiece(oldSquareKey, square.key);

    const moveData: MoveData = {
      player: options.player.code,
      piece: piece.hash,
      square: square.key
    };
    if (piece.getClass() === 'Pawn' && (options.player.color === 'white' && square.y === 8 || options.player.color === 'black' && square.y === 1)) {
      setPendingMoveData(moveData);
      setShowPromotion(true);
    } else sendMoveRequest(moveData);

  };

  const sendMoveRequest = (moveData: MoveData) => {
    onMove(moveData);
  };

  const handlePromotionSelect = (piece: string) => {
    setShowPromotion(false);
    sendMoveRequest({...pendingMoveData!, promotion: piece});
    setPendingMoveData(undefined);
  };

  const onSquarePointerEnter = (square: Square) => {
    if (!options.game.started) return;
    if (!pieceMoving && isMyTurn()) {
      const piece = square.getPiece();
      if (piece && piece.getColor() === options.player.color) {
        options.targets!.get(square.key)?.forEach(key => addDroppableActive(key));
      }
    }
  }

  const onSquarePointerLeave = (square: Square) => {
    if (!options.game.started) return;
    if (!pieceMoving) setDroppableActive(new Set());
  }

  const addDroppableActive = (code: string) => setDroppableActive(addSetElement(code));

  const addDroppableHover = (code: string) => setDroppableHover(addSetElement(code));

  const addSetElement = (code: string) => (prev: Set<string>) => {
    const next = new Set(prev);
    next.add(code);
    return next;
  }

  const game = player.game;

  const isMyTurn = () => !!options.targets;

  for (const [key, square] of squares) {
    const piece = square.getPiece();
    const check = game.isStarted && piece instanceof King && piece.player.getIsMyTurn() && piece.isAttacked() ? ' check' : '';
    const el = (
      <div key={square.key}
        className={`lija_square ${square.color} ${check} ${droppableActive.has(square.key) ? 'droppable-active' : ''} ${droppableHover.has(square.key) ? 'droppable-hover' : ''}`}
        id={square.key}
        style={{ top: 64 * (8 - x), left: 64 * (y - 1) }}
        onClick={() => onSquareClick(square)}
        onPointerEnter={() => onSquarePointerEnter(square)}
        onPointerLeave={() => onSquarePointerLeave(square)}
      >
        <div className="ljsi">
          {piece && <div
            className={`lija_piece ${piece.getClass().toLowerCase()} ${piece.getColor()} ${pieceMoving === square.key ? 'moving' : ''}`}
            id={piece.hash}
          >
          </div>}
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
      {showPromotion && <Promotion color={options.player.color} onSelect={handlePromotionSelect} />}
    </div>
  );
};

