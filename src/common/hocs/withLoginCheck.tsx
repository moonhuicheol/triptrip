"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const withLoginCheck =
  (컴포넌트: () => JSX.Element) =>
  <P extends object>(props: P) => {
    const router = useRouter();

    useEffect(() => {
      if (localStorage.getItem("accessToken") === null) {
        alert("로그인 후 이용 가능합니다!!!");
        router.push("/login");
        return;
      }
    }, []);

    return <컴포넌트 {...props} />;
  };
