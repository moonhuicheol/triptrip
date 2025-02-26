"use client";

import Signup from "@/components/signup";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center min-h-screen gap-10">
      <div className="w-2/10 w-[400px]">
        <Signup />
      </div>
      <div className="w-8/10 relative w-[1520px] h-[1080px]">
        <Image src="/img/loginBg.svg" alt="loginBg" fill objectFit="cover" />
      </div>
    </div>
  );
}
