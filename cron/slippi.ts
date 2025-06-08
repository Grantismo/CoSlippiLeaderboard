import { RateLimiter } from "limiter"

export const getPlayerData = async (connectCode: string) => {
  const query = `fragment profileFields on NetplayProfile {
  id
  ratingOrdinal
  ratingUpdateCount
  wins
  losses
  dailyGlobalPlacement
  dailyRegionalPlacement
  continent
  characters {
    character
    gameCount
    __typename
  }
  __typename
}

fragment userProfilePage on User {
  fbUid
  displayName
  connectCode {
    code
    __typename
  }
  rankedNetplayProfile {
    ...profileFields
    __typename
  }
  __typename
}

query UserProfilePageQuery($cc: String, $uid: String) {
  getUser(fbUid: $uid, connectCode: $cc) {
    ...userProfilePage
    __typename
  }
}`;

  const req = await fetch('https://internal.slippi.gg/graphql', {
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      operationName: 'UserProfilePageQuery',
      query,
      variables: { cc: connectCode, uid: connectCode },
    }),
    method: 'POST',
  });
  return req.json();
};

const limiter = new RateLimiter({tokensPerInterval: 1, interval: 'second'})

export const getPlayerDataThrottled = async (connectCode: string) => {
  const remainingRequests = await limiter.removeTokens(1);
  return getPlayerData(connectCode)
}
