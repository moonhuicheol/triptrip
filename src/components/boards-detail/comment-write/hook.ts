"use client";

import { useMutation } from "@apollo/client";
import { FETCH_BOARD_COMMENTS } from "./queries";
import { ChangeEvent, useState } from "react";
import { useParams } from "next/navigation";
import {
  CreateBoardCommentDocument,
  FetchBoardCommentsDocument,
  UpdateBoardCommentDocument,
} from "@/common/gql/graphql";
import { CreateBoardCommentInputSchema } from "./schema";

export default function useCommentWrite() {
  const params = useParams();
  const [comment, setComment] = useState({
    writer: "",
    password: "",
    contents: "",
    rating: 0,
  });

  // const [rating, setComment] = useState(3);

  const [createBoardComment] = useMutation(CreateBoardCommentDocument);
  const [updateBoardComment] = useMutation(UpdateBoardCommentDocument);

  const onClickSubmit = async (data: CreateBoardCommentInputSchema) => {
    const result = await createBoardComment({
      variables: {
        createBoardCommentInput: {
          writer: data.writer,
          password: data.password,
          contents: data.contents,
          rating: 0,
        },
        boardId: String(params.boardId),
      },
      refetchQueries: [
        {
          query: FetchBoardCommentsDocument,
          variables: { baordId: params.boardId },
        },
      ],
    });
    console.log("result", result);
  };
  const onChangeRating = (rating) => {};

  const onClickEdit = async (commentId) => {
    await updateBoardComment({
      variables: {
        updateBoardCommentInput: {
          contents: comment.contents,
          rating: comment.rating,
        },
        password: comment.password,
        boardCommentId: commentId,
      },
      refetchQueries: [
        {
          query: FETCH_BOARD_COMMENTS,
          variables: {
            boardId: params.boardId,
          },
        },
      ],
    });
    // onCancelEdit();
    setIsEdit(false);
  };

  return {
    onClickSubmit,
    onChangeInput,
    onChangeRating,
    onClickEdit,
  };
}
