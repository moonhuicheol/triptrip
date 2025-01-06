"use client";

import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { FetchBoardDocument } from "@/common/gql/graphql";

export default function useBoardDetail() {
  const router = useRouter();
  const params = useParams();
  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: String(params.boardId),
    },
  });

  const onClickMoveEdit = () => {
    router.push(`/boards/${params.boardId}/edit`);
  };

  const onClickMoveBoards = () => {
    router.push(`/boards`);
  };

  const youtubeOpts = {
    width: "822",
    height: "464",
  };

  return {
    youtubeOpts,
    router,
    params,
    data,
    onClickMoveEdit,
    onClickMoveBoards,
  };
}
