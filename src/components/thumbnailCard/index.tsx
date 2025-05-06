import Image from "next/image";

export default function ThumbnailCard() {
  return (
    <section className="flex flex-col gap-3">
      <section className="relative w-[296px] h-[296px] rounded-2xl">
        <Image
          src="/img/thumbnail.svg"
          alt="thumbImg"
          layout="fill"
          objectFit="cover"
        />
      </section>
      <section className="w-[296px] h-6 font-medium text-4 leading-6 text-[#333333]">
        섬네일 타이틀 들어가는 자리
      </section>
      <section className="flex flex-col gap-4">
        <section className="w-[296px] h-5 font-normal text-[14px] leading-5 text-[#2974E5]">
          태그 들어가는 자리
        </section>
        <section className="flex justify-between w-[296px]">
          <section className="flex gap-1">
            <section className="relative w-6 h-6">
              <Image
                src="/img/profile.svg"
                alt="profileImg"
                layout="fill"
                objectFit="cover"
              />
            </section>
            <section className="font-light text-[14px] text-[#5f5f5f] leading-6">
              사용자닉네임
            </section>
          </section>
          <section className="flex justify-end gap-1">
            <section className="font-semibold text-4 leading-6 text-[#1c1c1c]">
              99,999
            </section>
            <section className="font-semibold text-4 leading-6 text-[#1c1c1c]">
              원
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}
