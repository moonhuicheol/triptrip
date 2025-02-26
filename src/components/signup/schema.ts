import { CreateUserInput } from "@/common/gql/graphql";
import { z } from "zod";

export type SignupSchema = CreateUserInput & { confirmPassword: string };

export const schema: z.ZodSchema<SignupSchema> = z
  .object({
    email: z.string().email("이메일 형식이 아닙니다."),
    name: z.string().min(1, "이름을 입력해주세요"),
    password: z
      .string()
      .min(4, { message: "비밀번호는 최소 4자리 이상 입력해주세요." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });
