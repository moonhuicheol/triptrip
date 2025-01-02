import { LoginUserMutationVariables } from "@/commons/gql/graphql";
import { z } from "zod";

export type LoginSchema = LoginUserMutationVariables;

export const schema: z.ZodSchema<LoginSchema> = z.object({
  email: z.string().email("이메일 형식이 아닙니다."),
  password: z
    .string()
    .min(4, { message: "비밀번호는 최소 4자리 이상 입력해주세요." }),
});
