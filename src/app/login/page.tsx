"use client";

import Login from "@/components/login";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function loginPage() {
  const pathname = usePathname();
  console.log(pathname, "패스네임");
  return (
    <div className="flex justify-center items-center min-h-screen gap-10">
      <div className="w-2/10 w-[400px]">
        <Login />
      </div>
      <div className="w-8/10 relative w-[1520px] h-[1080px]">
        <Image src="/img/loginBg.svg" alt="loginBg" fill objectFit="cover" />
      </div>
    </div>
  );
}
