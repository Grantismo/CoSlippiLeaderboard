import React, { useEffect, useState } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { getPlayerData } from '../../../lib/slippi';
import { Table } from '../../Table';
import creds from '../../../../secrets/co-melee-77b97a2696c1.json';

export default function HomePage() {
  const [players, setPlayers] = useState([]);

  const getPlayerConnectCodes = async () => {
    const doc = new GoogleSpreadsheet('1DPIFD0RUA3yjruregmFUbUJ7ccdOjVB2LBp0goHvL-A');
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0];
    const rows = (await sheet.getRows()).slice(1); // remove header row
    return rows.map((r) => r._rawData[1])
  };

  const getPlayers = async (ac: AbortController) => {
    const codes = await getPlayerConnectCodes()
    const allData = codes.map(code => getPlayerData(code, ac.signal))
    const datas = await Promise.all(allData)
    const unsortedPlayers = datas.map((data: any) => data.data.getConnectCode.user)
    return unsortedPlayers.sort((p1, p2) =>
      p2.rankedNetplayProfile.ratingOrdinal - p1.rankedNetplayProfile.ratingOrdinal)
    // sort by ranking
  }

  useEffect(() => {
    const ac = new AbortController()
    getPlayers(ac).then((players) => setPlayers(players));
    return () => ac.abort();
  }, []);

  return (
    <div className="flex flex-col items-center h-screen p-8">
      <h1 className="text-3xl m-4">
        Colorado Ranked Slippi Leaderboard
      </h1>
      <Table players={players} />
    </div>
  );
}
