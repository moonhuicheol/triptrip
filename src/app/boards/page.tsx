"use client";

import { FetchBoardsDocument } from "@/common/gql/graphql";
import { withLoginCheck } from "@/common/hocs/withLoginCheck";
import Boards from "@/components/boards-list/list";
import Search from "@/components/boards-list/search/page";
import { gql, useQuery } from "@apollo/client";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      title
      writer
      createdAt
    }
  }
`;

function BoardsPage() {
  const { data, refetch } = useQuery(FetchBoardsDocument);

  return (
    <div>
      <Search data={data} refetch={refetch} />
      <Boards data={data} refetch={refetch} />
    </div>
  );
}

export default withLoginCheck(BoardsPage);
