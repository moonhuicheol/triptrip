"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLoadStore } from "../stores/load-store";
import { useAccessTokenStore } from "../stores/access-token-store";

export const withLoginCheck =
  (컴포넌트: () => JSX.Element) =>
  <P extends object>(props: P) => {
    const router = useRouter();
    const { isLoaded } = useLoadStore();
    const { accessToken } = useAccessTokenStore();

    useEffect(() => {
      if (!isLoaded) return;
      if (accessToken) return;

      alert("로그인 후 이용 가능합니다!!!");
      router.push("/login");
    }, [isLoaded]);

    return <컴포넌트 {...props} />;
  };
