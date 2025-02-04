"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  fromPromise,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useEffect } from "react";
import { onError } from "@apollo/client/link/error";
import { useAccessTokenStore } from "../stores/access-token-store";
import { gql, GraphQLClient } from "graphql-request";

const GLOBAL_STATE = new InMemoryCache();

const RESTORE_ACCESS_TOKEN = gql`
  mutation restoreAccessToken {
    restoreAccessToken {
      accessToken
    }
  }
`;

interface IApolloSetting {
  children: React.ReactNode;
}

export default function ApolloHeaderAndErrorSetting(props: IApolloSetting) {
  const { accessToken, setAccessToken } = useAccessTokenStore();

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1. 에러를 캐치
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        // 1-2. 해당 에러가 토큰만료 에러인지 체크
        if (err.extensions?.code === "UNAUTHENTICATED") {
          // 2. refreshToken으로 accessToken 재발급 받기

          const graphqlClient = new GraphQLClient(
            "https://main-practice.codebootcamp.co.kr/graphql"
          );
          const result = await graphqlClient.request(RESTORE_ACCESS_TOKEN);
          const newAcessToken = result.restoreAccessToken.accessToken;

          // 3. 재발급 받은 accessToken으로 방금 시랲한 쿼리의 정보 수정하고 재시도 하기
          setAccessToken(newAcessToken);

          operation.setContext({
            //기존의 헤더 정보를 새로운 어세스토큰으로 바꿔주기
            headers: {
              ...operation.getContext().headers, // 기존의 헤더 정보 그대로 가져오고
              Authorization: `Bearer ${newAcessToken}`, //새 토큰 으로 바꿔주기
            },
          });

          forward(operation); // 수정된 operation을 다시 시도  api재전송하기
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: "https://main-practice.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),

    // cache: new InMemoryCache(), // => accessToken이 변경돼서 리렌더될 때 새로만들어짐
    cache: GLOBAL_STATE, // => 컴포넌트는 새로 만들어져도, globalState는 유지됨
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
