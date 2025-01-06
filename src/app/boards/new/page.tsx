"use client";

import BoardsNew from "@/components/boards-write";
import { tree } from "next/dist/build/templates/app-page";

export default function BoardsNewPage() {
  return <BoardsNew isEdit={true} />;
}
