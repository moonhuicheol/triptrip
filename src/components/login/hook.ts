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
      setAccessToken(accessToken);

      router.push("/boards");
    } catch (e) {
      console.log(e);
    }
  };

  return { methods, onClickSubmit };
}
