import Image from "next/image";
import useCommentWrite from "./hook";
import { Rate } from "antd";
import { StarOutlined } from "@ant-design/icons";
import FormInput from "@/common/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateBoardCommentInputSchema, schema } from "./schema";

export default function CommentWrite({ isEdit, el, setIsEdit }) {
  const { onChangeRating, comment } = useCommentWrite(setIsEdit);

  const methods = useForm<CreateBoardCommentInputSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onClickSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col w-[1280px] gap-10 mx-auto">
      <div className="flex flex-col gap-6 w-full">
        {!isEdit ? (
          <div className="flex gap-2">
            <div className="w-6 h-6 relative">
              <Image
                src="/img/chat.svg"
                alt="chatImg"
                fill
                object-fit="cover"
              />
            </div>
            <div className="font-semibold text-4 leading-6">댓글</div>
          </div>
        ) : (
          <div className="flex gap-2">
            <div className="w-6 h-6 relative">
              <StarOutlined />
            </div>
            <div className="font-semibold text-4 leading-6">별점</div>
          </div>
        )}

        <div>
          <Rate onChange={onChangeRating} />
        </div>

        <FormProvider {...methods}>
          <form
            className="flex flex-col w-full gap-4"
            onSubmit={methods.handleSubmit(onClickSubmit)}
          >
            <div className="flex w-full gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="font-medium text-4 leading-6 text-[#333333]"
                >
                  작성자
                </label>
                <FormInput<CreateBoardCommentInputSchema>
                  className="w-full rounded-lg border border-[#d4d3d3] py-3 px-4"
                  type="text"
                  keyname="writer"
                  placeholder="작성자 명을 입력해주세요."
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="font-medium text-4 leading-6 text-[#333333]"
                >
                  비밀번호
                </label>

                <FormInput
                  className="py-3 px-4 border rounded-lg"
                  type="text"
                  keyname="password"
                  placeholder="비밀번호를 입력해 주세요."
                />
              </div>
            </div>
            <textarea
              className="w-full h-[144px] gap-0 border px-4 py-3 rounded-lg border-solid border-[#D4D3D3] resize-none"
              placeholder="댓글을 입력해 주세요."
              defaultValue={isEdit ? el.contents : comment.contents}
              {...methods.register("contents")}
            ></textarea>
            <div className="flex justify-end">
              <button
                className={`h-48px py-3 px-4 rounded-lg ${
                  !methods.formState.isValid
                    ? "text-[#e4e4e4] bg-[#c7c7c7c7]"
                    : "bg-[#2974e5] text-[#ffffff]"
                }`}
                disabled={!methods.formState.isValid}
              >
                댓글등록
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
