import Board from "./Board";
import Generator from "@/chess/generator";

export default function Home() {
  const generator = new Generator();
  const player = generator.createGame().getPlayer('white');
  if (!player) return null;

  return (
    <div className={`lija_game clearfix lija_player_${player.color}`}>
      <div className="lija_board_wrap">
        <Board player={player}/>
      </div>
      <div className="lija_table_wrap">
        cemetary
        panel
        cemetary
      </div>
    </div>
  );
}
