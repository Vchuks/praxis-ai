import Image from "next/image";
import UserCourse from "./userCourse";
import closeicon from "../../public/assets/menu-close.png";
import logoutLogo from "../../public/assets/logout.png";
import { useAuthStore, useSmallNavStore } from "@/stores";
import Link from "next/link";

const SmallSidebar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const {setShowNav} = useSmallNavStore()
  const getName = user?.student_name.split(" ") 

  return (
    <section className="w-full block md:hidden bg-[#00000024] fixed top-0 h-full z-10 ">
    <aside className=" w-[20rem] h-full absolute top-0 bg-white border border-[#EAEAEA] rounded-l-4xl">
      <div className="w-full bg-white p-4 rounded-tl-4xl flex justify-between items-center">
        <div className="flex items-center gap-3 ">
          <p className="rounded-full p-2 bg-[#222057] text-sm text-white font-medium">
            <span>{getName && getName[0].toUpperCase()[0]}</span>
              <span>{getName && getName[1] ? getName[1].toUpperCase()[0] : getName && getName[0].toUpperCase()[1]}</span>
          </p>
          <div className="text-[#323232]">
            <p className="text-sm font-medium">
              {user?.student_name} 
            </p>
            <p className="text-xs leading-none">
              <span>Student ID: </span>
              {user?.student_id_number}
            </p>
          <p className="text-[#F8991D] pt-1 cursor-pointer text-xs font-bold" onClick={logout}>Log out</p>
          </div>
        </div>
        <Image src={closeicon} alt="" className="w-7" onClick={()=> setShowNav(false)} />
      </div>
      <div className="in  overflow-y-auto pb-40 sm:pb-2">
        <UserCourse />
      </div>
      <div className="w-full bg-white sticky bottom-0 px-4 pt-3 pb-4">
        <div className="bg-gradient-to-r from-[#222057] to-[#F8991D] p-[2px] rounded-[30px]">
          <Link href="https://pluralcode.academy/portal/dashboard.html">
          <div className="bg-white w-full text-center h-12 flex justify-center items-center rounded-[30px] gap-5">
            <p className="bg-clip-text text-transparent bg-gradient-to-r from-[#222057] to-[#F8991D] font-semibold text-sm ">
              Back to Dashboard
            </p>
            <Image src={logoutLogo} alt="" className="w-3" />
          </div>
          </Link>
        </div>
      </div>
    </aside>
    </section>
  );
};

export default SmallSidebar;
