"use client";

import CommentList from "@/components/boards-detail/comment-list";
import CommentWrite from "@/components/boards-detail/comment-write";
import BoardDetail from "@/components/boards-detail/detail";

export default function BoardsDetailPage() {
  const isEdit = false;
  return (
    <div className="flex flex-col gap-10">
      <BoardDetail />
      <CommentWrite isEdit={isEdit} />
      <CommentList />
    </div>
  );
}
