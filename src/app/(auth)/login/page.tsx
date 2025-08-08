"use client";

// import { useAuthStore } from "@/stores";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useState } from "react";


const Login = () => {
    // const {login} = useAuthStore()
  const [passwordType, setPasswordType] = useState("password");
  const handlePassword = () => {
    return passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };
  return (
    <div className="bg-wrapper flex items-center ">
      <div className="w-11/12 lg:w-2/4 bg-white m-auto px-4 pt-8 pb-8 md:p-14 rounded-2xl">
        <h2 className="w-fit py-2 bg-clip-text text-transparent bg-gradient-to-br from-[#222057]  to-[#F8991D] to-80% font-inter font-[900] text-4xl">Welcome Back!</h2>
        <p>Login to your Praxis AI account</p>
        <form className="flex flex-col gap-4 py-7">
          <div className="flex flex-col my-2">
            <label htmlFor="email" className="text-sm pb-2">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              id="email"
              className="border border-[#22205747] rounded-lg px-6 py-3"
            />
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-sm pb-2">Password</label>
            <input
              type={passwordType}
              placeholder="Enter password"
              id="password"
              className=" border border-[#22205747] rounded-lg px-6 py-3"
            />

            <div className="absolute top-12 right-4 cursor-pointer" onClick={handlePassword}>
              {passwordType === "password" ? (
                <EyeSlashIcon className="w-4" />
              ) : (
                <EyeIcon className="w-4" />
              )}
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <input type="checkbox" id="remember" className=" accent-[#222057] mr-2" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <p className="font-semibold text-[#222057]">Forgot password?</p>
          </div>
          <Link href="/welcome">
          <button className="bg-gradient-to-br from-[#222057] from-5% my-4 to-[#F8991D] to-90% w-full text-white font-medium py-4 rounded-lg">Login</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
