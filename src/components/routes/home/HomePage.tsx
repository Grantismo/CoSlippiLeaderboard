import React, { useEffect, useState } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { getPlayerData } from '../../../lib/slippi';
import { Table } from '../../Table';

export default function HomePage() {
  const [players, setPlayers] = useState([]);

  const getSheetData = async () => {
    const doc = new GoogleSpreadsheet('https://docs.google.com/spreadsheets/d/1DPIFD0RUA3yjruregmFUbUJ7ccdOjVB2LBp0goHvL-A/edit#gid=2116982216');
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    });
    await doc.loadInfo(); // loads document properties and worksheets
    return doc;
  };

  useEffect(() => {
    const ac = new AbortController()
    getSheetData().then((data) => {
      debugger;
    })
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
        Colorado Ranked Slippi Leaderboard
      </h1>
      <Table players={players} />
    </div>
  );
}
