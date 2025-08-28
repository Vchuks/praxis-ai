"use client";
import Image from "next/image";
import vlogo from "../../../../public/assets/vlogo.png";
import { useAuthStore, useResultStore } from "@/stores";
import SearchBox from "@/components/searchBox";
import { useEffect, useState } from "react";

const WelcomePage = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { loading, userQuestion } = useResultStore();
  const [animate, setAnimate] = useState<boolean>(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F8991D]"></div>
        <p className="text-gray-600">Loading your {userQuestion?.format}...</p>
        {userQuestion && (
          <p className="text-sm text-gray-500 text-center max-w-md">
            Topic: {userQuestion.course_topic}
          </p>
        )}
      </div>
    );
  }

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  const getName = user?.student_name.split(" ")
  return (
    <div className="flex min-h-[90svh] lg:min-h-[85svh] flex-col justify-between pb-4 md:pb-0">
      <div
        className={`w-full transition-all duration-1000 ease-in-out  lg:w-3/4 flex flex-col m-auto py-6 items-center pt-8 sm:pt-14 md:pt-0 ${
          animate
            ? "transform translate-y-0 scale-100"
            : "transform -translate-y-full scale-70"
        }`}
      >
        <Image src={vlogo} alt="" className="w-24" />
        <h2 className=" text-3xl md:text-5xl bg-clip-text text-transparent font-medium bg-gradient-to-r from-[#222057] from-20% to-[#F8991D] to-90%">
          Hello, <span>{getName && getName?.length > 1 ? getName[0] : "Martin"}</span>
        </h2>
      </div>
      <div className="pt-4 md:pb-8 md:mt-14 md:mb-20 lg:mb-0  lg:mt-0 xl:mt-14">
        <div className="w-full md:w-11/12 xl:w-[48rem] m-auto md:mt-20 lg:mt-0  bg-white rounded-lg md:rounded-2xl p-4 py-6  md:p-6 mb-10 md:mb-24 lg:mb-5 2xl:mb-14">
          <h3 className="text-sm md:text-xl font-semibold">
            Welcome to{" "}
            <span className="bg-clip-text py-4 text-transparent bg-gradient-to-b from-[#222057]  to-[#F8991D] ">
              Praxis
            </span>
            , PluralCode’s AI learning assistant
          </h3>
          <p className="text-sm pt-6">
            Learning shouldn’t stop in the classroom & Praxis AI makes sure of that. Access structured learning and materials on your course from billions of sources around the world, practice quizzes, projects and more. Start by telling me what you want to learn, or choose from the list.
          </p>
        </div>
        <SearchBox />
      </div>
    </div>
  );
};

export default WelcomePage;
