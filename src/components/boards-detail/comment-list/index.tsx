import useCommentList from "./hook";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentListItem from "../comment-list-item";
import { FixedSizeList as Scroll } from "react-window";

export default function CommentList() {
  const { data, hasMore, onNext } = useCommentList();
  const outerDiv = (props) => <div id="scrollId" {...props} />;
  console.log(data?.fetchBoardComments.length, "길이");
  return (
    <div className="w-[1280px] mx-auto">
      {data?.fetchBoardComments.length > 0 ? (
        <InfiniteScroll
          next={onNext}
          hasMore={hasMore}
          dataLength={data?.fetchBoardComments.length ?? 0}
          loader=""
        >
          <Scroll
            height={900}
            width={"100%"}
            itemSize={90}
            itemData={data?.fetchBoardComments}
            itemCount={data?.fetchBoardComments.length}
            outerElementType={outerDiv}
          >
            {({ index, data, style }) => (
              <div style={style}>
                <CommentListItem el={data[index]} key={data[index]._id} />
              </div>
            )}
          </Scroll>
        </InfiniteScroll>
      ) : (
        <div className="flex justify-center">
          <div>등록된 댓글이 없습니다.</div>
        </div>
      )}
    </div>
  );
}
