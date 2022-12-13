export interface Player {
  displayName: string;
  connectCode: {
    code: string;
  };
  rankedNetplayProfile: {
    ratingOrdinal: number;
    ratingUpdateCount: number;
    wins: number;
    losses: number;
    dailyGlobalPlacement: number | null;
    dailyRegionalPlacement: number | null;
    characters: {
      character: string;
      gameCount: number;
    }[];
  };
}
