import { RateLimiter } from "limiter"

export const getPlayerData = async (connectCode: string) => {
  const query = `fragment userProfilePage on User {
    displayName
    connectCode {
          code
          __typename
        }
      rankedNetplayProfile {
            id
            ratingOrdinal
            ratingUpdateCount
            wins
            losses
            dailyGlobalPlacement
            dailyRegionalPlacement
            continent
            characters {
                    id
                    character
                    gameCount
                    __typename
                  }
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

  const req = await fetch('https://gql-gateway-dot-slippi.uc.r.appspot.com/graphql', {
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
