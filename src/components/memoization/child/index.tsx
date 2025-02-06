"use client";

import { memo } from "react";

function Word(props) {
  console.log("자식이 랜더링 됩니다.", props.el);
  return <span>{props.el}</span>;
}

export default memo(Word);
// 메모를 한 상태에서 부모로부터 props를 받을 경우 key또는 el이 변경된 부분만 리랜더링 된다.
