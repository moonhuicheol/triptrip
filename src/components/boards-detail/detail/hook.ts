"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import {
  DislikeBoardDocument,
  FetchBoardDocument,
  FetchBoardQuery,
  LikeBoardDocument,
} from "@/common/gql/graphql";
import { FETCH_BOARD } from "./queries";

export default function useBoardDetail() {
  const router = useRouter();
  const params = useParams();
  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: String(params.boardId),
    },
  });

  const [likeBoard] = useMutation(LikeBoardDocument);
  const [dislikeBoard] = useMutation(DislikeBoardDocument);

  console.log(data, "패치 데이터");
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

  const onClickLike = async () => {
    await likeBoard({
      variables: {
        boardId: String(params.boardId),
      },
      // refetchQueries: [FetchBoardDocument],
      optimisticResponse: {
        likeBoard: (data?.fetchBoard.likeCount ?? 0) + 1,
      },

      update(cache, { data }) {
        cache.writeQuery<
          Record<
            "fetchBoard",
            Pick<
              FetchBoardQuery["fetchBoard"],
              "_id" | "__typename" | "likeCount"
            >
          >
        >({
          //writeQuery는 없던것도 추가할 수 있다.
          query: FETCH_BOARD,
          variables: { boardId: String(params.boardId) },
          data: {
            fetchBoard: {
              _id: String(params.boardId),
              __typename: "Board",
              likeCount: data?.likeBoard ?? 0,
            },
          },
        });
      },
    });
  };

  const onClickDislike = async () => {
    await dislikeBoard({
      variables: {
        boardId: String(params.boardId),
      },
      optimisticResponse: {
        dislikeBoard: (data?.fetchBoard.dislikeCount ?? 0) + 1,
      },
      update(cache, { data }) {
        cache.writeQuery<
          Record<
            "fetchBoard",
            Pick<
              FetchBoardQuery["fetchBoard"],
              "_id" | "__typename" | "dislikeCount"
            >
          >
        >({
          query: FETCH_BOARD,
          variables: { boardId: String(params.boardId) },
          data: {
            fetchBoard: {
              _id: String(params.boardId),
              __typename: "Board",
              dislikeCount: data?.dislikeBoard ?? 0,
            },
          },
        });
      },
    });
  };

  return {
    youtubeOpts,
    router,
    params,
    data,
    onClickMoveEdit,
    onClickMoveBoards,
    onClickLike,
    onClickDislike,
  };
}
