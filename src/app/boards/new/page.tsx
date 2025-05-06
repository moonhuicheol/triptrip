"use client";

import { withLoginCheck } from "@/common/hocs/withLoginCheck";
import BoardsNew from "@/components/boards-write";

function BoardsNewPage() {
  return <BoardsNew />;
}

export default withLoginCheck(BoardsNewPage);
