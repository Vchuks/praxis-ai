"use client"
import Image from "next/image";
import vlogo from "../../public/assets/vlogo-white.png"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter() 
  setTimeout(() => {
    router.push("/login")
  }, 1000)
  return (
    <div className="bg-wrapper flex justify-center items-center">
      <Image src={vlogo} alt="" className="w-4/5 md:w-[30rem]"/>
    </div>
  );
}
