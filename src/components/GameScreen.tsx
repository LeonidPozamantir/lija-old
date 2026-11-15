import { useTranslations } from "next-intl";

import Board from "./Board";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { redirect } from "next/navigation";
import { usePlayer } from "@/state/usePlayer";

export default function GameScreen({
  playerPageFlag = false
}: {
  playerPageFlag?: boolean
}) {

  const t = useTranslations();

  const { player, actions: { movePiece, killPiece } } = usePlayer();

  const isStarted = player?.game.isStarted;
  const isFinished = player?.game.isFinished;

  const [isJoinVisible, setJoinVisible] = useState(true);
  const [isMyTurn, setIsMyTurn] = useState<boolean>(true);


  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isStarted) return;

    const waitForOpponent = async () => {
      const response = (await api.get(`/api/wait/${player?.getFullHash()}/${player?.game.updatedAt}`)).data;
      if (response === 'wait') timeout = setTimeout(waitForOpponent, 2000);
      else redirect(response);
    }

    timeout = setTimeout(waitForOpponent, 2000);
    return () => clearTimeout(timeout);
  }, [isStarted])

  const toggleJoinUrl = () => {
    if (isStarted) return;
    setJoinVisible(x => !x);
  };

  const sendMoveRequest = async (moveData: MoveData) => {
    const data = (await api.post<MoveReturnData>('/api/dmChessGame/move', {data: moveData})).data;
    updateFromJson(data);
  };

  const updateFromJson = (data: MoveReturnData) => {
    setLijaData({...lijaData, targets: new Map(data.targets)});
    displayEvents(data.events);
    indicateTurn();
  };

  const displayEvents = (events: EventData[]) => {
    for (const event of events) {
      switch(event.action) {
        case 'piece_move':
          movePiece(event.from!, event.to!);
      }
    }
  };

  const indicateTurn = () => {
    if (lijaData.game.finished) document.title = t('Game over');
    else if (!!lijaData.targets) {
      document.title = t('Your turn');
      setIsMyTurn(true);
    } else {
      document.title = t('Waiting for opponent');
      setIsMyTurn(false);
    }

  };

  const checkSquareKey = (() => {
    return 'e8'; // TODO
  })();


  const [lijaData, setLijaData] = useState({
    game: {
      started: isStarted,
      finished: isFinished,
    },
    player: {
      color: player.color,
      code: 'not implemented yet'
    },
    targets: new Map([
      ['c6', ['b4', 'd4']], // TODO: dummy
      ['b7', ['b2', 'b1']]
    ])
  });

  type MoveReturnData = {
    targets: [[string, string[]]];
    events: EventData[];
  };

  type EventData = {
    action: string;
    from?: string;
    to?: string
  };


  if (!player) return <></>;
  return (
    <div className={`lija_game clearfix lija_player_${player.color} ${isMyTurn ? 'my_turn' : ''}`}>
      <div className="lija_board_wrap">
        <Board player={player} checkSquareKey={checkSquareKey} onMove={sendMoveRequest} movePiece={movePiece} options={lijaData} />
        {!playerPageFlag && <Link href={`/${player.getOpponent()!.color}`} className="lija_exchange" title="Change position"></Link>}
      </div>
      <div className="lija_table_wrap">
        <div className={`lija_table ${!playerPageFlag && 'lija_table_not_started'}`}>
          {!playerPageFlag && (<>
            <a onClick={toggleJoinUrl} className="lija_button lija_toggle_join_url">Play with a friend</a>
            {isJoinVisible &&
              <div className="lija_join_url">
                <p>To invite someone to play, give this url:</p>
                <span><a href={`/game/${player.game.hash}`}></a></span>
                <div className="lija_join_ai">
                  <a href={`/ai/${player.getFullHash()}`} className="lija_button">Play with the machine</a>
                </div>
              </div>
            }
          </>)}
        </div>
      </div>
    </div>
  );
}

export type MoveData = {
  player: string;
  piece: string;
  square: string;
  promotion?: string;
};
