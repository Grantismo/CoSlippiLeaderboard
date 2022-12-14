import React from 'react';
import { Player } from './player'

interface Props {
  rank: number,
  player: Player
}

export function Row({ rank, player }: Props) {

  const codeToUrlSlug = (code: string) => {
    const parts = code.split('#')
    return `https://slippi.gg/user/${parts[0].toLowerCase()}-${parts[1]}`
  }

  const onProfileClick = () => {
    console.log('click');
    window.open(codeToUrlSlug(player.connectCode.code), '_blank', 'noreferrer');
  }
  return (
    <tr className="bg-white border-b hover:bg-indigo-300"
      onClick={onProfileClick}>
      <td className="text-2xl text-black px-6 py-4 whitespace-nowrap">
        #{rank}
      </td>
      <td className="px-6 py-4 whitespace-nowrap flex flex-col">
        <span className="text-xl text-gray-900">{player.displayName}</span>
        <span className="text-gray-700 text-sm">{player.connectCode.code}</span>
      </td>
      <td className="text-xl text-gray-900 px-6 py-4 whitespace-nowrap">
        {Math.floor(player.rankedNetplayProfile.ratingOrdinal)}
      </td>
      <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
        {player.rankedNetplayProfile.characters.map((c) => c.character).join(', ')}
      </td>
      <td className="text-xl px-6 py-4 whitespace-nowrap">
        <span className="text-green-900">{player.rankedNetplayProfile.wins}</span>/
        <span className="text-red-900">{player.rankedNetplayProfile.losses}</span>
      </td>
    </tr>
  );
}
