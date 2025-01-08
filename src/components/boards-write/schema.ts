import { CreateBoardInput } from "@/common/gql/graphql";
import { z } from "zod";

export const schema: z.ZodType<IBoardWriteSchema> = z.object({
  writer: z
    .string()
    .min(1, { message: "필수입력 사항 입니다." })
    .max(5, { message: "작성자는 6글자 이상 사용할 수 없습니다." }),
  password: z.string().min(1, { message: "필수입력 사항 입니다." }),
  title: z.string().min(1, { message: "필수입력 사항 입니다." }),
  contents: z.string().min(1, { message: "필수입력 사항 입니다." }),
});

export type IBoardWriteSchema = Pick<
  CreateBoardInput,
  "title" | "writer" | "contents" | "boardAddress" | "password" | "youtubeUrl"
>;
