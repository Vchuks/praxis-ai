"use client";
// import Image from "next/image";
// import qstmark from "../../public/assets/message-question.png";
// import bell from "../../public/assets/notification.png";
import { useAuthStore, useSmallNavStore } from "@/stores";
import Image from "next/image";
import { useState } from "react";
import menu from "../../public/assets/menu-icon.png";
import logo from "../../public/assets/PluralCode-logo.png";
import SmallSidebar from "./smallSidebar";
import Login from "@/app/(auth)/login/page";

const Header = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const {showNav, setShowNav} = useSmallNavStore()

  const { user, logout, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Login />;
  }
  return (
    <>
      <header className="w-full bg-white h-[5.5rem] flex justify-end items-center border-b border-[#EAEAEA] py-4 px-4 md:px-8 sticky top-0">
        {/* <div className="w-full relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="#898989"
          className="size-4 absolute left-3 top-3"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>

        <input
          type="search"
          placeholder="Search..."
          className="bg-[#F5F6FA] placeholder:text-sm pl-10 pr-2 outline-zinc-300 py-2 border-0 rounded-lg"
        />
      </div> */}
        <div className="w-full lg:w-[32rem] relative justify-end hidden md:flex items-center gap-5">
          {/* <Image src={qstmark} alt="" className="w-6" />
        <div className="relative">

        <Image src={bell} alt="" className="w-6 " />
        <p className="rounded-full absolute -top-1 -right-1 bg-[#F82A1D] text-white text-[9px] border-2 border-white font-medium w-4 h-4 text-center">{notifications.length}</p>
        </div> */}
          <div className="flex items-center gap-3 ">
            <p className="rounded-full p-2 bg-[#222057] text-sm text-white font-medium">
              <span>{user?.student_name[0].toUpperCase()}</span>
              <span>{user?.student_name[1].toUpperCase()}</span>
            </p>
            <div className="text-[#323232]">
              <p className="text-sm font-medium">
                {user?.student_name}
              </p>
              <p className="text-xs leading-relaxed">
                <span>Student ID: {user?.student_id_number} </span>
                
              </p>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="#323232"
            className="size-5 cursor-pointer"
            onClick={() => setDropdown(!dropdown)}
          >
            <path
              fillRule="evenodd"
              d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
          {dropdown && (
            <ul className="absolute -bottom-24 rounded-b-md pt-1 pb-5 px-4 bg-white w-52 text-sm">
              <li className="pt-2 cursor-pointer">Back to dashboard</li>
              <li className="pt-2 cursor-pointer" onClick={logout}>
                Logout
              </li>
            </ul>
          )}
        </div>
        <div className="w-full flex justify-between items-center md:hidden">
          <Image src={logo} alt="" className="w-44 h-fit " />
          <Image src={menu} alt="" className="w-6 h-fit" onClick={()=> setShowNav(!showNav)} />
        </div>
      </header>
      <div className="block md:hidden bg-[#F5F6FA] w-full text-center border-b-4 border-[#F8991D] pb-2">
        <p className="text-[#F8991D] text-lg font-semibold">Product Design</p>
        <p className="text-xs font-light">Intro to product design</p>
      </div>
      {showNav &&
        <SmallSidebar />
        }
    </>
  );
};

export default Header;
