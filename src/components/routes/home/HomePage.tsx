import React, { useEffect } from 'react';
import { Button } from '@mantine/core';
import { getPlayerData } from '../../../lib/slippi'

export default function HomePage() {
  useEffect(() => {
    getPlayerData('BLRP#745').then((data) => console.log(data))
  }, [])

  return (
    <div>
      <h1>
        Colorado Melee Leaderboard
      </h1>

      <Button>A button</Button>
    </div>
  );
}
