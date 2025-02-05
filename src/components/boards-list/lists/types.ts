import { FetchBoardsQuery } from "@/common/gql/graphql";
import { ApolloQueryResult } from "@apollo/client";

export interface BoardsProps {
  data?: FetchBoardsQuery;
  refetch: () => Promise<ApolloQueryResult<FetchBoardsQuery>>;
}
