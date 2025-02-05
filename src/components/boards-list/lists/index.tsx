"use client";

import useBoards from "./hook";
import PageButton from "../pagination";
import List from "../list";
import { BoardsProps } from "./types";
import React, { useState } from "react";

export default function Boards({ data, refetch }: BoardsProps) {
  const { currentPage, boardsCount, setCurrentPage } = useBoards({ data });
  const [modifiedData, setModifiedData] = useState(data?.fetchBoards || []);

  const handleModifyFirstTitle = () => {
    setModifiedData((prev) =>
      prev.map((el, index) =>
        index === 0 ? { ...el, title: "수정된 제목입니다!" } : el
      )
    );
  };

  return (
    <div className="w-[1280px] mx-auto min-w-[680px] px-12 py-6 rounded-2xl shadow-[0px_0px_20px_0px_#00000014] mb-[100px]">
      <div className="flex flex-col iw-full gap-2">
        <button
          onClick={handleModifyFirstTitle}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4"
        >
          test 버튼 (0번째 제목 수정)
        </button>
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
