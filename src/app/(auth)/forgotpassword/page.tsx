"use client";

import { useAuthStore } from "@/stores";
import Link from "next/link";
import { useState } from "react";

const ForgotPassword = () => {
  const [verify, setVerify] = useState<boolean>(false);
  const { user } = useAuthStore();

  const handleVerification = () => {
    setVerify(true);
  };
  return (
    <div className="bg-wrapper flex items-center ">
      {!verify && (
        <div className="w-11/12 md:w-[30rem] lg:w-[35rem] bg-white m-auto px-4 pt-8 pb-8 md:p-14 rounded-2xl">
          <div className="w-full text-center flex flex-col items-center">
            <h2 className="w-fit py-2 bg-clip-text text-transparent bg-gradient-to-br from-[#222057] to-[#F8991D] to-80% font-inter font-[900] text-2xl md:text-4xl">
              Forgot Password?
            </h2>
            <p className="">Please enter your email to re-set your password</p>
          </div>
          <form className="flex flex-col gap-4 py-7">
            <div className="flex flex-col my-2">
              <label htmlFor="email" className="text-sm pb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                id="email"
                className="border border-[#22205747] rounded-lg px-6 py-3"
              />
            </div>

            <button
              className="bg-gradient-to-br from-[#222057] from-5% my-4 to-[#F8991D] to-90% w-full text-white font-medium py-3 rounded-lg"
              onClick={handleVerification}
            >
              Get Verification Code
            </button>
          </form>
        </div>
      )}

      {verify && (
        <div className="w-11/12 md:w-[30rem] lg:w-[35rem] bg-white m-auto px-4 pt-8 pb-8 md:p-14 rounded-2xl">
          <div className="w-full text-center flex flex-col items-center">
            <h2 className="w-fit py-2 bg-clip-text text-transparent bg-gradient-to-br from-[#222057] to-[#F8991D] to-80% font-inter font-[900] text-2xl md:text-4xl">
              Forgot Password?
            </h2>
            <p className="w-80">
              Please enter the four digit number that was sent to{" "}
              {user?.student_email.slice(0, 4)}****@****.
              {user?.student_email.slice(user?.student_email.length - 3)}
            </p>
          </div>
          <form className="flex flex-col gap-4 py-7">
            <div className="flex justify-center gap-3">
              
              <input
                type="text"
                placeholder="0"
                className="border w-10 text-center border-[#00000024] rounded-lg p-2 text-sm focus:border-[#222057] placeholder:text-[#23232333]"
              />
              <input
                type="text"
                placeholder="0"
                className="border w-10 text-center border-[#00000024] rounded-lg p-2 text-sm focus:border-[#222057] placeholder:text-[#23232333]"
              />
              <input
                type="text"
                placeholder="0"
                className="border w-10 text-center border-[#00000024] rounded-lg p-2 text-sm focus:border-[#222057] placeholder:text-[#23232333]"
              />
              <input
                type="text"
                placeholder="0"
                className="border w-10 text-center border-[#00000024] rounded-lg p-2 text-sm focus:border-[#222057] placeholder:text-[#23232333]"
              />
            </div>
            <div className="flex justify-center gap-4 text-sm pt-3">
                <p>00:45</p>
                <p className="text-[#23232366]">Resend</p>
            </div>

            <Link href="/resetpassword"><button className="bg-gradient-to-br from-[#222057] from-5% my-4 to-[#F8991D] to-90% w-full text-white font-medium py-3 rounded-lg">
              Continue
            </button>
            </Link>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
