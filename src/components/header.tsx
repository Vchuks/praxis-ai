"use client";
import Image from "next/image";
import qstmark from "../../public/assets/message-question.png";
import bell from "../../public/assets/notification.png";
import { useAuthStore, useNotification } from "@/stores";

const Header = () => {
  const {user} = useAuthStore()

  const {notifications} = useNotification()

  return (
    <header className="w-full bg-white h-[5.5rem] flex justify-between items-center border-b border-[#EAEAEA] py-4 px-8 sticky top-0">
      <div className="w-full relative">
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
      </div>
      <div className="w-full lg:w-[32rem] justify-end flex items-center gap-5">
        <Image src={qstmark} alt="" className="w-6" />
        <div className="relative">

        <Image src={bell} alt="" className="w-6 " />
        <p className="rounded-full absolute -top-1 -right-1 bg-[#F82A1D] text-white text-[9px] border-2 border-white font-medium w-4 h-4 text-center">{notifications.length}</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="rounded-full p-2 bg-[#222057] text-sm text-white font-medium">
            <span>{user?.firstname[0]}</span>
            <span>{user?.lastname[0]}</span>
          </p>
          <div className="text-[#323232]">
            <p className="text-sm font-medium">
              {user?.firstname} {user?.lastname}
            </p>
            <p className="text-xs leading-none">
              <span>Student ID: </span>
              {user?.studentId}
            </p>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="#323232"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </header>
  );
};

export default Header;
