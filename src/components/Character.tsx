import React from 'react';
import * as ReactDOM from 'react-dom'; // needed by tooltip

import { CharacterStats } from '../lib/player';
import BowserIcon from '../../images/characters/bowser_default.png';
import DkIcon from '../../images/characters/dk_default.png';
import DocIcon from '../../images/characters/doc_default.png';
import FalcoIcon from '../../images/characters/falco_default.png';
import FalconIcon from '../../images/characters/falcon_default.png';
import FoxIcon from '../../images/characters/fox_default.png';
import GanonIcon from '../../images/characters/ganon_default.png';
import GnwIcon from '../../images/characters/gnw_default.png';
import IcsIcon from '../../images/characters/ics_default.png';
import KirbyIcon from '../../images/characters/kirby_default.png';
import LinkIcon from '../../images/characters/link_default.png';
import LuigiIcon from '../../images/characters/luigi_default.png';
import MarioIcon from '../../images/characters/mario_default.png';
import MarthIcon from '../../images/characters/marth_default.png';
import MewtwoIcon from '../../images/characters/mewtwo_default.png';
import NessIcon from '../../images/characters/ness_default.png';
import PeachIcon from '../../images/characters/peach_default.png';
import PichuIcon from '../../images/characters/pichu_default.png';
import PikachuIcon from '../../images/characters/pikachu_default.png';
import PuffIcon from '../../images/characters/puff_default.png';
import RoyIcon from '../../images/characters/roy_default.png';
import SamusIcon from '../../images/characters/samus_default.png';
import SheikIcon from '../../images/characters/sheik_default.png';
import YounglinkIcon from '../../images/characters/yl_default.png';
import YoshiIcon from '../../images/characters/yoshi_default.png';
import ZeldaIcon from '../../images/characters/zelda_default.png';
import UnknownIcon from '../../images/characters/unknown.png';

import { CircularProgressbarWithChildren, buildStyles  } from 'react-circular-progressbar';
import { Tooltip } from 'react-tooltip';
import 'react-circular-progressbar/dist/styles.css';
import 'react-tooltip/dist/react-tooltip.css'

interface Props {
  id: string,
  totalGames: number,
  stats: CharacterStats,
}

const characterNameToIcon = new Map([
  ['BOWSER', BowserIcon],
  ['CAPTAIN_FALCON', FalconIcon],
  ['DONKEY_KONG', DkIcon],
  ['DR_MARIO', DocIcon],
  ['FALCO', FalcoIcon],
  ['FOX', FoxIcon],
  ['GAME_AND_WATCH', GnwIcon],
  ['GANONDORF', GanonIcon],
  ['ICE_CLIMBERS', IcsIcon],
  ['KIRBY', KirbyIcon],
  ['LINK', LinkIcon],
  ['LUIGI', LuigiIcon],
  ['MARIO', MarioIcon],
  ['MARTH', MarthIcon],
  ['MEWTWO', MewtwoIcon],
  ['NESS', NessIcon],
  ['PEACH', PeachIcon],
  ['PICHU', PichuIcon],
  ['PIKACHU', PikachuIcon],
  ['JIGGLYPUFF', PuffIcon],
  ['ROY', RoyIcon],
  ['SAMUS', SamusIcon],
  ['SHEIK', SheikIcon],
  ['YOSHI', YoshiIcon],
  ['YOUNG_LINK', YounglinkIcon],
  ['ZELDA', ZeldaIcon]
]);

export function Character({ id, totalGames, stats }: Props) {
  const icon = characterNameToIcon.get(stats.character) ?? UnknownIcon
  const percentage = 100*(stats.gameCount / totalGames)
  const charId = stats.character + id
  const percentString = `${Number(percentage.toFixed(2))}%`
  return (<>
  <div className="p-0.5" id={charId} data-tooltip-content={percentString}>
    <CircularProgressbarWithChildren 
      className="md:h-12 md:w-12 h-4 w-4"
      value={percentage}
      styles={buildStyles({
        strokeLinecap: 'butt',
	  		pathColor: 'rgb(22 163 74)'
      })}>
      <img className="md:h-8 md:w-8 h-3 w-3" src={icon} />
    </CircularProgressbarWithChildren>
  </div>
  <Tooltip anchorId={charId} />
  </>)
}
