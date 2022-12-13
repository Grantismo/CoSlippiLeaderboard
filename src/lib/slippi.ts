export const getPlayerData = async (connectCode: string, abortSignal: AbortSignal) => {
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

  query AccountManagementPageQuery($cc: String!, $uid: String!) {
      getUser(fbUid: $uid) {
            ...userProfilePage
            __typename
          }
      getConnectCode(code: $cc) {
            user {
                    ...userProfilePage
                    __typename
                  }
            __typename
          }
  }`;

  const req = await fetch('https://gql-gateway-dot-slippi.uc.r.appspot.com/graphql', {
    signal: abortSignal,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      operationName: 'AccountManagementPageQuery',
      query,
      variables: { cc: connectCode, uid: connectCode },
    }),
    method: 'POST',
  });
  return req.json();
};
