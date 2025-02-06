import Image from "next/image";
import useList from "./hook";
import { memo } from "react";
import { ListProps } from "./types";

function List({ el, index }: ListProps) {
  const { onClickBoard, onClickDeleteBoard } = useList();
  return (
    <div
      key={el._id}
      className="flex items-center w-full py-3 pl-6 pr-0 gap-2 border border-solid border-[#F2F2F2] group cursor-pointer"
      onClick={() => onClickBoard(el._id)}
    >
      <div className="w-16 text-center font-light text-[14px] leading-5 text-[#919191]">
        {index + 1}
      </div>
      <div className="w-full font-medium text-4 leading-5 text-[#1c1c1c]">
        {el.title}
      </div>
      <div className="w-[100px] text-center font-light text-[14px] leading-5 text-[#333333]">
        {el.writer}
      </div>
      <div className="w-[100px] text-center font-light text-[14px] leading-5 text-[#919191] ">
        {el.createdAt.split("T")[0].replace(/-/g, ".")}
      </div>
      <div
        id={el._id}
        className="w-6 h-4 relative invisible group-hover:visible"
        onClick={onClickDeleteBoard}
      >
        <Image src="/img/delete.svg" alt="deleteImg" fill objectFit="cover" />
      </div>
    </div>
  );
}

export default memo(List);
