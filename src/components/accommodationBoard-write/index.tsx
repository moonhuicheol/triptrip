"use client";

import FormInput from "@/common/ui/input";
import Image from "next/image";

export default function AccommodationBoardNew() {
  return (
    <div className="flex flex-col w-[1280px] gap-10 mx-auto my-0 px-0 py-10">
      <div className="w-full font-bold text-xl leading-7">숙박권 판매하기</div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <label className="font-medium text-4 leading-6" htmlFor="">
            상품명
          </label>
          {/* <FormInput
            className="w-full rounded-lg border border-[#d4d3d3] py-3 px-4"
            type="text"
            keyname="title"
            placeholder="제목을 입력해 주세요."
          /> */}
          <div className="font-medium text-4 leading-6 text-[#f66a6a]">
            에러메시지 적는곳
          </div>
        </div>
        <hr className="border border-[#e4e4e4]" />
        <div className="flex flex-col gap-2">
          <label className="font-medium text-4 leading-6" htmlFor="">
            한줄 요약
          </label>
          {/* <FormInput
            className="w-full rounded-lg border border-[#d4d3d3] py-3 px-4"
            type="text"
            keyname="title"
            placeholder="제목을 입력해 주세요."
          /> */}
          <div className="font-medium text-4 leading-6 text-[#f66a6a]">
            에러메시지 적는곳
          </div>
        </div>

        <hr className="border border-[#e4e4e4]" />
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-medium text-4 leading-6">
            상품설명
          </label>
          <textarea
            className="w-full rounded-lg border border-[#d4d3d3] py-3 px-4 h-[336px] resize-none"
            placeholder="내용을 입력해 주세요."
          ></textarea>
          <div className="font-medium text-4 leading-6 text-[#f66a6a]">
            에러메시지 적는곳
          </div>
        </div>
        <hr className="border border-[#e4e4e4]" />
        <div className="flex flex-col gap-2">
          <label className="font-medium text-4 leading-6" htmlFor="">
            판매 가격
          </label>
          {/* <FormInput
            className="w-full rounded-lg border border-[#d4d3d3] py-3 px-4"
            type="text"
            keyname="title"
            placeholder="제목을 입력해 주세요."
          /> */}
          <div className="font-medium text-4 leading-6 text-[#f66a6a]">
            에러메시지 적는곳
          </div>
        </div>
        <hr className="border border-[#e4e4e4]" />
        <div className="flex flex-col gap-2">
          <label className="font-medium text-4 leading-6" htmlFor="">
            태그 입력
          </label>
          {/* <FormInput
            className="w-full rounded-lg border border-[#d4d3d3] py-3 px-4"
            type="text"
            keyname="title"
            placeholder="제목을 입력해 주세요."
          /> */}
          <div className="font-medium text-4 leading-6 text-[#f66a6a]">
            에러메시지 적는곳
          </div>
        </div>
        <hr className="border border-[#e4e4e4]" />
        <div className="flex flex-col gap-2">
          <label>주소</label>
          <div className="w-[220px] flex gap-2">
            {/* <FormInput
              className="w-[86px] rounded-lg border border-[#d4d3d3] py-3 px-4"
              type="text"
              placeholder="01234"
              disabled={true}
              keyname="zipcode"
            /> */}

            <button
              type="button"
              className="text-nowrap h-12 rounded-lg border border-[#000000] py-3 px-4"
            >
              우편번호 검색
            </button>
          </div>
          <input
            className="w-full rounded-lg border border-[#d4d3d3] py-3 px-4"
            type="text"
            placeholder="주소를 입력해주세요."
            disabled={true}
          />
          {/* <FormInput
            className="w-full rounded-lg border border-[#d4d3d3] py-3 px-4"
            type="text"
            keyname="addressDetail"
            placeholder="상세주소"
          /> */}
        </div>
        <hr className="border border-[#e4e4e4]" />
        <div className="flex flex-col gap-2">
          <label>유튜브 링크</label>
          {/* <FormInput
            className="w-full rounded-lg border border-[#d4d3d3] py-3 px-4"
            type="text"
            keyname="youtubeUrl"
            placeholder="링크를 입력해 주세요."
          /> */}
        </div>
        <hr className="border border-[#e4e4e4]" />
        <div className="flex flex-col gap-2">
          <label>사진첨부</label>
          <div className="flex gap-4">
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

            {/* <input type="file" className="hidden" /> */}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end gap-4">
        <button
          type="button"
          className="h-12 rounded-lg border border-[#000000] py-3 px-4 font-semibold text-[18px] leading-6 text-center bg-[#ffffff]"
        >
          취소
        </button>
        <button className="h-12 rounded-lg py-3 px-4 bg-[#2974e5] text-[#ffffff]">
          등록하기
        </button>
      </div>
    </div>
  );
}
