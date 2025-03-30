import { RateLimiter } from "limiter"

export const getPlayerData = async (connectCode: string) => {
  const query = `fragment profileFieldsV2 on NetplayProfileV2 {
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
      ...profileFieldsV2
      __typename
    }
    __typename
  }
    
  query AccountManagementPageQuery($cc: String!) {
    getConnectCode(code: $cc) {
      user {
        ...userProfilePage
        __typename
      }
      __typename
    }
  }`;

  const req = await fetch('https://gql-gateway-2-dot-slippi.uc.r.appspot.com/graphql', {
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      operationName: 'AccountManagementPageQuery',
      query,
      variables: { cc: connectCode },
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
