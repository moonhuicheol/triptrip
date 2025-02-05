import { GraphQLClient } from "graphql-request";
import { RestoreAccessTokenDocument } from "../gql/graphql";

export const getAccessToken = async () => {
  try {
    const graphqlClient = new GraphQLClient(
      "https://main-practice.codebootcamp.co.kr/graphql",
      { credentials: "include" }
    );

    const result = await graphqlClient.request(RestoreAccessTokenDocument);
    const newAccessToken = result.restoreAccessToken.accessToken;
    return newAccessToken;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};
