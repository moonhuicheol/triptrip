// apollo-header-setting.ts
"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useAccessTokenStore } from "../stores/access-token-store";
import { useEffect } from "react";

const DEFAULT_CACHE = new InMemoryCache();

interface IApolloSetting {
  children: React.ReactNode;
}
export default function ApolloHeaderSettingLocalStorage(props: IApolloSetting) {
  const { accessToken, setAccessToken } = useAccessTokenStore();

  //서버 렌더링과 브라우저 렌더링 분기 방법
  //next서버에서 프리랜더링할때 window, localstorage, document객체가 없기때문에 넥스트서버에서는 에러가뜨지만 브라우저에서는 뜨지않는다.
  //next서버에서 랜더링할때와 브라우저에서 랜더링할때 분기처리를 해줘야한다.
  //그 방법으 3가지가 있다.
  // 1.process.browser
  // if (process.browser) {
  //   console.log("나는 지금 브라우저다.");
  // } else {
  //   console.log("나는 지금 프론트엔드 서버다!!");
  // }
  // 2.type of window 가 있으면 browser 없으면 next서버
  // if (typeof window !== "undefined") {
  //   console.log("나는 지금 브라우저이다.");
  // } else {
  //   console.log("나는 지금 프론트엔드 서버다.");
  // }
  // 3.useEffect방법 => next서버에서 안그려지고 브라우저에서 그려진다. useEffect는 브라우저랜더링후에 마지막으로 작동하기때문
  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken") ?? "");
  }, []);

  const uploadLink = createUploadLink({
    uri: "https://main-practice.codebootcamp.co.kr/graphql",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: DEFAULT_CACHE,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
