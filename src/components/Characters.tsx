import { useState, useMemo } from 'react'
import { Player } from '../lib/player'
import { Character } from './Character'
import { useMediaQuery } from 'react-responsive'

interface Props {
  player: Player
  totalGames: number
}


const CONDENSED_SIZE = 3;

export function Characters({ player, totalGames }: Props) {
  const isSm = useMediaQuery({ query: '(min-width: 640px)' })

  const [expand, setExpand] = useState(false);

  const codeToId = (code: string) => {
    const parts = code.split('#');
    return `${parts[0].toLowerCase()}-${parts[1]}`;
  }

  const characters = useMemo(() => player.rankedNetplayProfile.characters
    .sort((a, b)=> b.gameCount - a.gameCount), [player]);

  const expandChracters = () => {
    setExpand(true);
  }

  const condenseCharacters = () => {
    setExpand(false);
  }

  const condensedView = () => {
    return <>{characters.slice(0, CONDENSED_SIZE).map((c) =>
        <Character id={codeToId(player.connectCode.code)}
          key={c.character} totalGames={totalGames} stats={c}/>)}
    {characters.length > CONDENSED_SIZE &&
    <div className="md:mx-1 mx-0.5 p-1 rounded-full border-gray-300 md:border-2 border border-dashed md:h-12 md:w-12 h-4 w-4 text-xs flex flex-col items-center justify-center hover:border-solid hover:text-gray-500 hover:border-gray-500" onClick={expandChracters} >
      {isSm && <><div>+{characters.length - CONDENSED_SIZE}</div><div>more</div></>}
      {!isSm && '+'}
    </div>}
    </>
  };

  const shouldCondense = characters.length > CONDENSED_SIZE + 1;

  const expandedView = () => {
    return <>{characters.map((c) =>
    <Character id={codeToId(player.connectCode.code)}
      key={c.character} totalGames={totalGames} stats={c}/>)}
    {shouldCondense &&
    <div className="md:mx-1 mx-0.5 p-1 rounded-full border-gray-300 md:border-2 border border-dashed md:h-12 md:w-12 h-4 w-4 text-xs flex flex-col items-center justify-center hover:border-solid hover:text-gray-500 hover:border-gray-500" onClick={condenseCharacters} >
      {isSm && 'Hide'}
      {!isSm && '-'}
    </div>}
    </>
  }

  return <div className="flex flex-wrap items-center justify-center">
    {(expand || !shouldCondense) && expandedView()}
    {!expand && shouldCondense && condensedView()}
    </div>
}
