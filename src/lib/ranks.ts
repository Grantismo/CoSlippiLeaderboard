import { Player } from './player'
import GrandMasterIcon from '../../images/GrandMaster.svg';
import Diamond1Icon from '../../images/DiamondI.svg';
import Diamond2Icon from '../../images/DiamondII.svg';
import Diamond3Icon from '../../images/DiamondIII.svg';
import Platinum3Icon from '../../images/PlatinumIII.svg';
import Platinum2Icon from '../../images/PlatinumII.svg';
import Platinum1Icon from '../../images/PlatinumI.svg';
import Gold3Icon from '../../images/GoldIII.svg';
import Gold2Icon from '../../images/GoldII.svg';
import Gold1Icon from '../../images/GoldI.svg';
import Silver3Icon from '../../images/SilverIII.svg';
import Silver2Icon from '../../images/SilverII.svg';
import Silver1Icon from '../../images/SilverI.svg';
import Bronze3Icon from '../../images/BronzeIII.svg';
import Bronze2Icon from '../../images/BronzeII.svg';
import Bronze1Icon from '../../images/BronzeI.svg';
import NoneIcon from '../../images/None.svg';
import PendingIcon from '../../images/Pending.svg';

interface Rank {
  isRank(player: Player): boolean
  name: string
  iconUrl?: string
}

class NoneRank implements Rank {
  public name = "None"
  public iconUrl = NoneIcon

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
    super('Grandmaster', 2191.75, Infinity, GrandMasterIcon)
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
  new StandardRank('Bronze I', 0, 765.42, Bronze1Icon),
  new StandardRank('Bronze II', 765.43, 913.71, Bronze2Icon),
  new StandardRank('Bronze III', 913.72, 1054.86, Bronze3Icon),
  new StandardRank('Silver I', 1054.87, 1188.87, Silver1Icon),
  new StandardRank('Silver II', 1188.88, 1315.74, Silver2Icon),
  new StandardRank('Silver III', 1315.75, 1435.47, Silver3Icon),
  new StandardRank('Gold I', 1435.48, 1548.06, Gold1Icon),
  new StandardRank('Gold II', 1548.07, 1653.51, Gold2Icon),
  new StandardRank('Gold III', 1653.52, 1751.82, Gold3Icon),
  new StandardRank('Platinum I', 1751.83, 1842.99, Platinum1Icon),
  new StandardRank('Platinum II', 1843, 1927.02, Platinum2Icon),
  new StandardRank('Platinum III', 1927.03, 2003.91, Platinum3Icon),
  new StandardRank('Diamond I', 2003.92, 2073.66, Diamond1Icon),
  new StandardRank('Diamond II', 2073.67, 2136.27, Diamond2Icon),
  new StandardRank('Diamond III', 2136.28, 2191.74, Diamond3Icon),
  new StandardRank('Master I', 2191.75, 2274.99),
  new StandardRank('Master II', 2275, 2350),
  new StandardRank('Master III', 2350, Infinity),
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
