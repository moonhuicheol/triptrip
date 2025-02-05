"use client";

import { DeleteBoardDocument, FetchBoardsDocument } from "@/common/gql/graphql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function useList() {
  const router = useRouter();
  const [deleteBoard] = useMutation(DeleteBoardDocument);

  const onClickBoard = (boardId: string) => {
    router.push(`/boards/${boardId}`);
  };

  const onClickDeleteBoard = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    deleteBoard({
      variables: {
        boardId: event.currentTarget.id,
      },
      refetchQueries: [{ query: FetchBoardsDocument }],
    });
  };

  return { onClickBoard, onClickDeleteBoard };
}
