import React, { useEffect, useState } from 'react';
import { getPlayerData } from '../../../lib/slippi';
import { Table } from '../../Table';

export default function HomePage() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const ac = new AbortController()
    Promise.all([getPlayerData('BLRP#745', ac.signal)]).then(
      (datas) => {
        setPlayers(datas.map(data => data.data.getConnectCode.user));
      }
    ).catch(ex => console.error(ex));
    return () => ac.abort();
  }, []);

  return (
    <div className="flex flex-col items-center h-screen p-8">
      <h1 className="text-3xl m-4">
        Colorado Melee Slippi Leaderboard
      </h1>
      <Table players={players} />
    </div>
  );
}
