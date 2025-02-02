import { FetchUserLoggedInDocument } from "@/common/gql/graphql";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginSuccessPage() {
  const router = useRouter();
  const { data } = useQuery(FetchUserLoggedInDocument);
  console.log(data);

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인 후 이용 가능합니다!!!");
      router.push("/login");
    }
  });
}
