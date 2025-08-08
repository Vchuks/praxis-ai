import Image from "next/image";
import UserCourse from "./userCourse";
import logo from "../../public/assets/PluralCode-logo.png";
import logout from "../../public/assets/logout.png";

const Sidebar = () => {
  return (
    <aside className="w-[20rem] bg-white border border-[#EAEAEA] ">
      <div className="w-full sticky top-0 bg-white">
        <div className="w-44 m-auto pt-6 pb-5 ">
          <Image src={logo} alt="" className="w-full" />
          <p className="font-light text-xs text-center">(Ai Tutor)</p>
        </div>
      </div>
      <div className="md:h-[80vh] xl:max-h-[75vh] overflow-y-auto no-scrollbar">
        <UserCourse />
      </div>
      <div className="w-full bg-white sticky bottom-0 px-4 pt-3 pb-4">
        <div className="bg-gradient-to-r from-[#222057] to-[#F8991D] p-[2px] rounded-[30px]">
          <div className="bg-white w-full text-center h-12 flex justify-center items-center rounded-[30px] gap-5">

          <p className="bg-clip-text text-transparent bg-gradient-to-r from-[#222057] to-[#F8991D] font-semibold text-sm ">Back to Dashboard</p>
          <Image src={logout} alt="" className="w-3"/>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
