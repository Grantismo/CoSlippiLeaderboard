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
    window.open(codeToUrlSlug(player.connectCode.code), '_blank', 'noreferrer');
  }
  return (
    <tr className="bg-white border-b hover:bg-indigo-300"
      onClick={onProfileClick}>
      <td className="md:text-2xl text-black md:px-6 md:py-4 p-1 whitespace-nowrap">
        #{rank}
      </td>
      <td className="md:px-6 md:py-4 p-1 whitespace-nowrap text-center overflow-hidden md:max-w-full max-w-[7rem] text-elipses">
        <div className="md:text-xl text-sm max-w-xs text-gray-900 ">{player.displayName}</div>
        <div className="text-gray-700 text-xs">{player.connectCode.code}</div>
      </td>
      <td className="md:text-xl text-sm text-gray-900 md:px-6 md:py-4 p-1 whitespace-nowrap">
        {Math.floor(player.rankedNetplayProfile.ratingOrdinal)}
      </td>
      <td className="md:text-sm text-xs md:max-w-full max-w-[5rem] text-gray-900 md:px-6 md:py-4 p-1">
        {player.rankedNetplayProfile.characters.map((c) => c.character.replace('_', ' ')).join(', ')}
      </td>
      <td className="md:text-xl text-sm md:px-6 md:py-4 p-1 whitespace-nowrap">
        <span className="text-green-900">{player.rankedNetplayProfile.wins}</span>/
        <span className="text-red-900">{player.rankedNetplayProfile.losses}</span>
      </td>
    </tr>
  );
}
