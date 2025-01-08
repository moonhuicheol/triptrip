import { CreateBoardCommentInput } from "@/common/gql/graphql";
import { z } from "zod";

export const schema: z.ZodType<CreateBoardCommentInputSchema> = z.object({
  writer: z.string().min(1),
  password: z.string().min(1),
  contents: z.string().min(1),
});

export type CreateBoardCommentInputSchema = Pick<
  CreateBoardCommentInput,
  "writer" | "password" | "contents"
>;
