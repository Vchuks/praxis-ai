"use client";
import Image from "next/image";
import vlogo from "../../../../public/assets/vlogo.png";
import { useAuthStore } from "@/stores";
import SearchBox from "@/components/searchBox";
// import { useCoursesStore } from "@/stores/courses.store";
// import { useEffect } from "react";

const WelcomePage = () => {
  const { user, isAuthenticated } = useAuthStore()
  // const { courses, loadCourses, loading } = useCoursesStore()

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     loadCourses()
  //   }
  // }, [isAuthenticated, loadCourses])

  if (!isAuthenticated) {
    return <div>Please log in</div>
  }
  return (
    <div className="flex flex-col justify-between h-full pb-4 md:pb-0">
      <div className="w-full md:w-2/4 flex flex-col m-auto items-center">
        <Image src={vlogo} alt="" className="w-24" />
        <h2 className=" text-3xl md:text-5xl bg-clip-text text-transparent font-medium bg-gradient-to-r from-[#222057] from-20% to-[#F8991D] to-90%">
          Hello, <span>{user?.student_name.slice(0,6)}</span>
        </h2>
      </div>
      <div>
        <div className="w-full md:w-[48rem] m-auto  bg-white rounded-lg md:rounded-2xl p-4 py-6 md:p-6 mb-5">
          <h3 className="text-sm md:text-2xl font-semibold">
            Welcome to{" "}
            <span className="bg-clip-text py-4 text-transparent bg-gradient-to-b from-[#222057]  to-[#F8991D] ">
              Praxis AI
            </span>
            , PluralCode’s AI learning assistant
          </h3>
          <p className="text-sm pt-6">
            Lorem ipsum dolor sit amet consectetur. Ac tristique pellentesque
            odio sapien vitae. In sed sagittis sit nunc eget. Mauris non tortor
            nunc porta eget quam ut diam. Accumsan vitae euismod integer aliquet
            duis lectus. Facilisis egestas blandit feugiat turpis vitae risus
            enim at egestas. Dignissim nec maecenas sapien ut nulla diam odio
            malesuada urna.{" "}
          </p>
        </div>
        <SearchBox />
      </div>
    </div>
  );
};

export default WelcomePage;
