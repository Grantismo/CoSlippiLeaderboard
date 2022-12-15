import React from 'react';
import { Player } from '../lib/player'
import { getRank } from '../lib/ranks'
import { Character } from './Character'

interface Props {
  rank: number,
  player: Player
}

export function Row({ rank, player }: Props) {

  const codeToUrlSlug = (code: string) => {
    const parts = code.split('#')
    return `https://slippi.gg/user/${parts[0].toLowerCase()}-${parts[1]}`
  }

  const playerRank = getRank(player)
  const isActive = playerRank.name !== 'None';
  const totalSets = player.rankedNetplayProfile.wins + player.rankedNetplayProfile.losses
  const totalGames = player.rankedNetplayProfile.characters.reduce((acc, val)=> acc + val.gameCount, 0)

  const onProfileClick = () => {
    window.open(codeToUrlSlug(player.connectCode.code), '_blank', 'noreferrer');
  }
  return (
    <tr className={`${playerRank.bgClass} border-separate border-spacing-2 border-b-2 border-gray-600 hover:bg-indigo-900`}
      onClick={onProfileClick}>
      <td className="md:text-2xl text-gray-300 md:px-6 md:py-4 md:p-1 whitespace-nowrap">
        {isActive && `#${rank}`}
      </td>
      <td className="text-gray-100 md:px-6 md:py-4 p-1 whitespace-nowrap text-center overflow-hidden md:max-w-full max-w-[7rem] text-elipses">
        <div className="md:text-xl text-sm max-w-xs text-gray-300">{player.displayName}</div>
        <div className="text-gray-300 text-xs">{player.connectCode.code}</div>
      </td>
      <td className="md:text-xl text-sm text-gray-900 md:px-6 md:py-4 p-1 whitespace-nowrap text-center">

        {playerRank.iconUrl && <div className="flex items-center justify-center">
          <img className="md:h-10 md:w-10 h-6 w-6" src={playerRank.iconUrl} />
        </div>}
        <div className="md:text-lg text-xs max-w-xs text-gray-300 uppercase">
          {playerRank.name}
        </div>
        <div className="text-gray-300 md:text-sm text-xs">
          {isActive && Math.floor(player.rankedNetplayProfile.ratingOrdinal)}
        </div>
      </td>
      <td className="md:text-sm text-xs text-gray-300 md:px-6 md:py-4 py-1  md:max-w-[15rem] max-w-[3rem]">
        <div className="flex flex-wrap items-center justify-center">
        {player.rankedNetplayProfile.characters.map((c) => <Character key={c.character} totalGames={totalGames} stats={c}/>)}
        </div>
      </td>
      <td className="md:text-xl text-gray-300 text-sm md:px-6 md:py-4 md:p-1 whitespace-nowrap">
        {totalGames && <><span className="text-green-500">{player.rankedNetplayProfile.wins ?? 0}</span><span className="md:p-1">/</span>
        <span className="text-red-500">{player.rankedNetplayProfile.losses ?? 0}</span>
      </>}
      </td>
    </tr>
  );
}
