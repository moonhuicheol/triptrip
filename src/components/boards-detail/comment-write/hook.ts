"use client";

import { useMutation } from "@apollo/client";
import { FETCH_BOARD_COMMENTS } from "./queries";
import { ChangeEvent, useState } from "react";
import { useParams } from "next/navigation";
import {
  CreateBoardCommentDocument,
  UpdateBoardCommentDocument,
} from "@/common/gql/graphql";

export default function useCommentWrite(setIsEdit) {
  const params = useParams();
  const [rating, setComment] = useState(3);

  const [createBoardComment] = useMutation(CreateBoardCommentDocument);
  const [updateBoardComment] = useMutation(UpdateBoardCommentDocument);

  const onClickRegister = async () => {
    await createBoardComment({
      variables: {
        createBoardCommentInput: {
          ...comment,
        },
        boardId: params.boardId,
      },
      refetchQueries: [
        {
          query: FETCH_BOARD_COMMENTS,
          variables: { boardId: params.boardId },
        },
      ],
    });
  };

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment({
      ...comment,
      [event.target.name]: event.target.value,
    });
  };

  const onChangeRating = (rating) => {
    setComment(rating);
  };

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
    rating,
    onClickRegister,
    onChangeInput,
    onChangeRating,
    onClickEdit,
  };
}
