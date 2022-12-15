import { Player } from './player'
import GrandMasterIcon from '../../images/ranks/GrandMaster.svg';
import Diamond1Icon from '../../images/ranks/DiamondI.svg';
import Diamond2Icon from '../../images/ranks/DiamondII.svg';
import Diamond3Icon from '../../images/ranks/DiamondIII.svg';
import Platinum3Icon from '../../images/ranks/PlatinumIII.svg';
import Platinum2Icon from '../../images/ranks/PlatinumII.svg';
import Platinum1Icon from '../../images/ranks/PlatinumI.svg';
import Gold3Icon from '../../images/ranks/GoldIII.svg';
import Gold2Icon from '../../images/ranks/GoldII.svg';
import Gold1Icon from '../../images/ranks/GoldI.svg';
import Silver3Icon from '../../images/ranks/SilverIII.svg';
import Silver2Icon from '../../images/ranks/SilverII.svg';
import Silver1Icon from '../../images/ranks/SilverI.svg';
import Bronze3Icon from '../../images/ranks/BronzeIII.svg';
import Bronze2Icon from '../../images/ranks/BronzeII.svg';
import Bronze1Icon from '../../images/ranks/BronzeI.svg';
import NoneIcon from '../../images/ranks/None.svg';
import PendingIcon from '../../images/ranks/Pending.svg';

interface Rank {
  isRank(player: Player): boolean
  name: string
  bgClass: string
  iconUrl?: string
}

class NoneRank implements Rank {
  public name = "None"
  public iconUrl = NoneIcon
  public bgClass = "bg-stone-500"

  isRank(player: Player) {
    return setCount(player) === 0;
  }
}

const setCount = (player: Player) => {
  return player.rankedNetplayProfile.wins +
    player.rankedNetplayProfile.losses;
}

const MIN_RANK_SETS = 5;

class PendingRank implements Rank {
  public name = "Pending"
  public iconUrl = PendingIcon
  public bgClass = "bg-stone-700"

  isRank(player: Player) {
    const totalSets = setCount(player)
    return 0 < totalSets && totalSets < MIN_RANK_SETS;
  }
}

class StandardRank implements Rank {
  constructor(
    public name: string,
    private lowerBound: number,
    private upperBound: number,
    public bgClass: string,
    public iconUrl?: string,
  ) {}

  isRank(player: Player) {
    if(setCount(player) < MIN_RANK_SETS) {
      return false
    }
    const rating = player.rankedNetplayProfile.ratingOrdinal;
    return this.lowerBound <= rating && rating <= this.upperBound;
  }
}

class GrandMaster extends StandardRank {
  constructor() {
    super('Grandmaster', 2191.75, Infinity, "bg-slate-900", GrandMasterIcon)
  }

  isRank(player: Player) {
    const hasRating = super.isRank(player);
    if(!hasRating) {
      return false;
    }
    return player.rankedNetplayProfile.dailyGlobalPlacement !== null
      && player.rankedNetplayProfile.dailyRegionalPlacement !== null;
  }
}

export const RANKS = [
  new NoneRank(),
  new PendingRank(),
  new StandardRank('Bronze I', 0, 765.42, "bg-orange-900", Bronze1Icon),
  new StandardRank('Bronze II', 765.43, 913.71, "bg-orange-900", Bronze2Icon),
  new StandardRank('Bronze III', 913.72, 1054.86, "bg-orange-900", Bronze3Icon),
  new StandardRank('Silver I', 1054.87, 1188.87, "bg-slate-800", Silver1Icon),
  new StandardRank('Silver II', 1188.88, 1315.74, "bg-slate-800", Silver2Icon),
  new StandardRank('Silver III', 1315.75, 1435.47, "bg-slate-800", Silver3Icon),
  new StandardRank('Gold I', 1435.48, 1548.06, "bg-yellow-900", Gold1Icon),
  new StandardRank('Gold II', 1548.07, 1653.51, "bg-yellow-900", Gold2Icon),
  new StandardRank('Gold III', 1653.52, 1751.82, "bg-yellow-900", Gold3Icon),
  new StandardRank('Platinum I', 1751.83, 1842.99, "bg-blue-900", Platinum1Icon),
  new StandardRank('Platinum II', 1843, 1927.02, "bg-blue-900", Platinum2Icon),
  new StandardRank('Platinum III', 1927.03, 2003.91, "bg-blue-900", Platinum3Icon),
  new StandardRank('Diamond I', 2003.92, 2073.66, "bg-sky-900", Diamond1Icon),
  new StandardRank('Diamond II', 2073.67, 2136.27, "bg-sky-900", Diamond2Icon),
  new StandardRank('Diamond III', 2136.28, 2191.74, "bg-sky-900", Diamond3Icon),
  new StandardRank('Master I', 2191.75, 2274.99, "bg-cyan-900"),
  new StandardRank('Master II', 2275, 2350, "bg-cyan-900"),
  new StandardRank('Master III', 2350, Infinity, "bg-cyan-900"),
  new GrandMaster()
]

export function getRank(player: Player) {
  for(let i = RANKS.length - 1; i >= 0; i--) {
    if(RANKS[i].isRank(player)) {
      return RANKS[i]
    }
  }
  return new NoneRank()
}
