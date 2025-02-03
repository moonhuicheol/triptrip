import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useAccessTokenStore } from "@/common/stores/access-token-store";
import { LoginUserDocument } from "@/common/gql/graphql";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, schema } from "./schema";

export default function useLogin() {
  const router = useRouter();
  const { setAccessToken } = useAccessTokenStore();
  const methods = useForm<LoginSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [loginUser] = useMutation(LoginUserDocument);

  const onClickSubmit = async (data: LoginSchema) => {
    try {
      const result = await loginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      const accessToken = result.data?.loginUser.accessToken;

      if (accessToken === undefined) {
        alert("로그인에 실패했습니다! 다시 시도해주세요!");
        return;
      }

      setAccessToken(accessToken);
      // localStorage.setItem("accessToken", accessToken); // 더이상 사용하지않음
      //브라우저를 새로고침하면 토큰이 사라지기때문에 브라우저저장소 로컬스토리지에 저장해보기!

      router.push("/boards");
    } catch (e) {
      console.log(e);
    }
  };

  return { methods, onClickSubmit };
}
