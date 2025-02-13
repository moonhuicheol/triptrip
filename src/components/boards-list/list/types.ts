import { FetchBoardsQuery } from "@/common/gql/graphql";

export interface ListProps {
  el: FetchBoardsQuery["fetchBoards"][number];
  index: number;
  onMouseOver?: () => void;
}
