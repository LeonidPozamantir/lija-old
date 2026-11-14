export default function Promotion({
  color,
  onSelect
}: Readonly<{
  color: string,
  onSelect: (piece: string) => void
}>) {
  const pieces = ['queen', 'rook', 'bishop', 'knight'];
  return (
    <div className="lija_promotion_choice">
      {pieces.map(p => <div key={p} className={`lija_piece ${p} ${color}`} onClick={() => onSelect(p)}></div>)}
    </div>
  );
}