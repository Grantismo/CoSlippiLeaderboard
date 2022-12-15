import React, { useEffect, useState } from 'react';
import { Table } from '../../Table';
import { Player } from '../../../lib/player'
//import playersOld from '../../../../cron/data/players-old.json';
import playersNew from '../../../../cron/data/players-new.json';
import timestamp from '../../../../cron/data/timestamp.json';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // import plugin
dayjs.extend(relativeTime)


const setCount = (player: Player) => {
  return player.rankedNetplayProfile.wins +
    player.rankedNetplayProfile.losses;
}

export default function HomePage() {
  // TODO(diff changes and show in the ui)
  let players = playersNew;
  players = players.filter((p)=> setCount(p))
    .concat(players.filter((p)=> !setCount(p)))

  // continuously update
  const updatedAt = dayjs(timestamp.updated);
  const [updateDesc, setUpdateDesc] = useState(updatedAt.fromNow())
  useEffect(() => {
    const interval = setInterval(
      () => setUpdateDesc(updatedAt.fromNow()), 1000*60);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center h-screen p-8">
      <h1 className="text-3xl m-4 text-center text-white">
        Colorado Ranked Slippi Leaderboard
      </h1>
      <div className="p-1 text-gray-300"> Updated {updateDesc}</div>
      <Table players={players} />
      <div className="p-4 text-gray-300">Built by blorppppp</div>
    </div>
  );
}
