"use client";
import Image from "next/image";
import vlogo from "../../public/assets/vlogo-white.png";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  const router = useRouter();
  setTimeout(() => {
    router.push("/login");
  }, 1000);
  return (
    <div className="bg-wrapper flex justify-center items-center">
      <Image src={vlogo} alt="" className="w-4/5 md:w-[30rem]" />
    </div>
  );
}
