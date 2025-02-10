"use client";

import useBoardNew from "./hook";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "@/common/ui/input";
import { IBoardWriteSchema, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

export default function BoardNew(props) {
  const {
    juso,
    data,
    isModalOpen,
    onClickEditCancel,
    showModal,
    handleOk,
    handleCancel,
    handleComplete,
    onChangeFile,
    onClickImage,
    onClickSubmit,
    fileRef,
    imgUrl,
  } = useBoardNew(props);

  const methods = useForm<IBoardWriteSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onClickSubmit)}>
        <div className="flex flex-col w-[1280px] gap-10 mx-auto my-0 px-0 py-10">
          <div className="w-full font-bold text-xl leading-7">게시물 등록</div>
          <div className="flex flex-col gap-10">
            <div className="flex gap-10">
              <div className="w-1/2 flex flex-col gap-2">
                <label className="font-medium text-4 leading-6" htmlFor="">
                  작성자
                </label>
                <FormInput
                  className="w-full rounded-lg border border-[#d4d3d3] py-3 px-4"
                  type="text"
                  keyname="writer"
                  placeholder="작성자 명을 입력해주세요."
                />
                <div className="font-medium text-4 leading-6 text-[#f66a6a]">
                  {methods.formState.errors.writer?.message}
                </div>
              </div>
              <div className="w-1/2 flex flex-col gap-2">
                <label className="font-medium text-4 leading-6" htmlFor="">
                  비밀번호
                </label>
                <FormInput
                  className="w-full rounded-lg border border-[#d4d3d3] py-3 px-4"
                  type="password"
                  keyname="password"
                  placeholder="비밀번호를 입력해 주세요."
                />
                <div className="font-medium text-4 leading-6 text-[#f66a6a]">
                  {methods.formState.errors.password?.message}
                </div>
              </div>
            </div>
            <hr className="border border-[#e4e4e4]" />
            <div className="flex flex-col gap-2">
              <label className="font-medium text-4 leading-6" htmlFor="">
                제목
              </label>
              <FormInput
                className="w-full rounded-lg border border-[#d4d3d3] py-3 px-4"
                type="text"
                keyname="title"
                placeholder="제목을 입력해 주세요."
              />
              <div className="font-medium text-4 leading-6 text-[#f66a6a]">
                {methods.formState.errors.title?.message}
              </div>
            </div>

            <hr className="border border-[#e4e4e4]" />
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium text-4 leading-6">
                내용
              </label>
              <textarea
                {...methods.register("contents")}
                className="w-full rounded-lg border border-[#d4d3d3] py-3 px-4 h-[336px] resize-none"
                placeholder="내용을 입력해 주세요."
                defaultValue={props.isEdit ? data?.fetchBoard.contents : ""}
              ></textarea>
              <div className="font-medium text-4 leading-6 text-[#f66a6a]">
                {methods.formState.errors.contents?.message}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label>주소</label>
              <div className="w-[220px] flex gap-2">
                <FormInput
                  className="w-[86px] rounded-lg border border-[#d4d3d3] py-3 px-4"
                  type="text"
                  placeholder="01234"
                  defaultValue={juso.zipcode}
                  disabled={true}
                  keyname="zipcode"
                />
                {/* <input
                  className="w-[86px] rounded-lg border border-[#d4d3d3] py-3 px-4"
                  type="text"
                  placeholder="01234"
                  defaultValue={juso.zipcode}
                  disabled={true}
                /> */}
                <button
                  type="button"
                  className="text-nowrap h-12 rounded-lg border border-[#000000] py-3 px-4"
                  onClick={showModal}
                >
                  우편번호 검색
                </button>
              </div>
              <input
                className="w-full rounded-lg border border-[#d4d3d3] py-3 px-4"
                type="text"
                defaultValue={juso.address}
                placeholder="주소를 입력해주세요."
                disabled={true}
              />
              <FormInput
                className="w-full rounded-lg border border-[#d4d3d3] py-3 px-4"
                type="text"
                keyname="addressDetail"
                placeholder="상세주소"
              />
            </div>
            <hr className="border border-[#e4e4e4]" />
            <div className="flex flex-col gap-2">
              <label>유튜브 링크</label>
              <FormInput
                className="w-full rounded-lg border border-[#d4d3d3] py-3 px-4"
                type="text"
                keyname="youtubeUrl"
                placeholder="링크를 입력해 주세요."
              />
            </div>
            <hr className="border border-[#e4e4e4]" />
            <div className="flex flex-col gap-2">
              <label>사진첨부</label>
              <div className="flex gap-4" onClick={onClickImage}>
                {!imgUrl[0] ? (
                  <div className="w-40 h-40 rounded-lg bg-[#f2f2f2] flex justify-center items-center hover:cursor-pointer">
                    <div className="flex flex-col gap-2 items-center">
                      <div className="w-10 h-10 relative">
                        <Image src="/img/add.svg" alt="addImg" fill />
                      </div>
                      <div className="font-normal text-base text-[#777777]">
                        클릭해서 사진 업로드
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-40 h-40 relative hover:cursor-pointer">
                    <Image
                      src={`https://storage.googleapis.com/${imgUrl[0]}`}
                      alt=""
                      fill
                      objectFit="cover"
                    />
                  </div>
                )}
                <input
                  type="file"
                  onChange={onChangeFile}
                  className="hidden"
                  ref={fileRef}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end gap-4">
            <button
              type="button"
              className="h-12 rounded-lg border border-[#000000] py-3 px-4 font-semibold text-[18px] leading-6 text-center bg-[#ffffff]"
              onClick={onClickEditCancel}
            >
              취소
            </button>
            <button
              className={`h-12 rounded-lg py-3 px-4 ${
                !methods.formState.isValid
                  ? "bg-[#c7c7c7] text-[#e4e4e4]"
                  : "bg-[#2974e5] text-[#ffffff]"
              }`}
              disabled={!methods.formState.isValid}
            >
              {props.isEdit ? "수정하기" : "등록하기"}
            </button>
          </div>
          {isModalOpen && (
            <Modal
              open={isModalOpen}
              closable={false}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <DaumPostcodeEmbed onComplete={handleComplete} />
            </Modal>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
