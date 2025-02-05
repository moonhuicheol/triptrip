"use client";

import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { FETCH_BOARDS_COUNT } from "./queries";
import { useState } from "react";
import useSearch from "../search/hook";

export default function useBoards({ data }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { search } = useSearch({ data });
  const { data: boardsCount } = useQuery(FETCH_BOARDS_COUNT, {
    variables: {
      search,
    },
  });

  return {
    router,
    data,
    currentPage,
    boardsCount,
    setCurrentPage,
  };
}
