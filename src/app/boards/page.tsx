"use client";

import { FetchBoardsDocument } from "@/common/gql/graphql";
// import { withLoginCheck } from "@/common/hocs/withLoginCheck";
import Boards from "@/components/boards-list/lists";
import Search from "@/components/boards-list/search/page";
import { useQuery } from "@apollo/client";

function BoardsPage() {
  const { data, refetch } = useQuery(FetchBoardsDocument);

  return (
    <div>
      <Search data={data} refetch={refetch} />
      <Boards data={data} refetch={refetch} />
    </div>
  );
}

export default BoardsPage;
