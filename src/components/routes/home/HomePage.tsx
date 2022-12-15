import React, { useEffect, useState } from 'react';
import { Table } from '../../Table';
import { Player } from '../../../lib/player'
//import playersOld from '../../../../cron/data/players-old.json';
import playersNew from '../../../../cron/data/players-new.json';
import timestamp from '../../../../cron/data/timestamp.json';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // import plugin
dayjs.extend(relativeTime)


export default function HomePage() {
  // TODO(diff changes and show in the ui)
  const players = playersNew;
  const updatedAt = dayjs(timestamp.updated);

  return (
    <div className="flex flex-col items-center h-screen p-8">
      <h1 className="text-3xl m-4 text-center">
        Colorado Ranked Slippi Leaderboard
      </h1>
      <div className="p-1"> Updated {updatedAt.fromNow()}</div>
      <Table players={players} />
    </div>
  );
}
