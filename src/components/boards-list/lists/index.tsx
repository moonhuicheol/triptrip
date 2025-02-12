"use client";

import useBoards from "./hook";
import PageButton from "../pagination";
import List from "../list";
import { BoardsProps } from "./types";
import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { FetchBoardDocument } from "@/common/gql/graphql";

export default function Boards({ data, refetch }: BoardsProps) {
  const { currentPage, boardsCount, setCurrentPage } = useBoards({ data });
  const [test, setTest] = useState("테스트 제목");
  const onClickTest = () => {
    setTest("제목 변경");
  };

  const client = useApolloClient();

  const prefetchBoardDebounce = _.debounce(()=>{

  }, 200)
  const prefetchBoard = (boardId) = () => {
    client.query({
      query: FetchBoardDocument,
      variables: { boardId },
    });
  });
  return (
    <div className="w-[1280px] mx-auto min-w-[680px] px-12 py-6 rounded-2xl shadow-[0px_0px_20px_0px_#00000014] mb-[100px]">
      <div className="flex flex-col iw-full gap-2">
        <div className="flex w-full px-6 py-4 gap-2">
          <div className="w-16 text-center font-medium text-4 leading-5 text-[#1c1c1c]">
            번호
          </div>
          <div className="w-full font-medium text-4 leading-5 text-[#1c1c1c]">
            제목
          </div>
          <div className="w-[100px] font-medium text-4 leading-5 text-[#1c1c1c] text-center">
            작성자
          </div>
          <div className="w-[100px] font-medium text-4 leading-5 text-[#1c1c1c] text-center">
            날짜
          </div>
        </div>
        <button onClick={onClickTest}>memo테스트</button>
        <div className="flex items-center w-full py-3 pl-6 pr-0 gap-2 border border-solid border-[#F2F2F2] group cursor-pointer">
          {test}
        </div>
        {data?.fetchBoards.map((el, index) => (
          <React.Fragment key={el._id}>
            <List el={el} index={index} />
          </React.Fragment>
        ))}
        <PageButton
          currentPage={currentPage}
          boardsCount={boardsCount}
          refetch={refetch}
          setCurrentPage={setCurrentPage}
          data={data}
        />
      </div>
    </div>
  );
}
