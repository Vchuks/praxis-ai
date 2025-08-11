"use client"
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import  { useState } from 'react'

const ResetPassword = () => {
const [passwordType, setPasswordType] = useState("password");
  const handlePassword = () => {
    return passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };
const [passwordConfirmType, setPasswordConfirmType] = useState("password");
  const handleConfirmPassword = () => {
    return passwordConfirmType === "password"
      ? setPasswordConfirmType("text")
      : setPasswordConfirmType("password");
  };
  return (
    <div className="bg-wrapper flex items-center ">
      <div className="w-11/12 md:w-[30rem] lg:w-[35rem] bg-white m-auto px-4 pt-8 pb-8 md:p-14 rounded-2xl">
        <h2 className="w-fit py-2 bg-clip-text text-transparent bg-gradient-to-br from-[#222057]  to-[#F8991D] to-80% font-inter font-[900] text-2xl md:text-4xl">Reset Password</h2>
        <p>Enter your new password</p>
        <form className="flex flex-col gap-4 py-7">
          <div className="flex flex-col my-2 relative">
            <label htmlFor="password" className="text-sm pb-2">New Password</label>
            <input
              type={passwordType}
              placeholder="Enter new password"
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
          <div className="flex flex-col relative">
            <label htmlFor="confirm-password" className="text-sm pb-2">Confirm Password</label>
            <input
              type={passwordConfirmType}
              placeholder="Confirm new password"
              id="confirm-password"
              className=" border border-[#22205747] rounded-lg px-6 py-3"
            />

            <div className="absolute top-12 right-4 cursor-pointer" onClick={handleConfirmPassword}>
              {passwordConfirmType === "password" ? (
                <EyeSlashIcon className="w-4" />
              ) : (
                <EyeIcon className="w-4" />
              )}
            </div>
          </div>
          
          <Link href="/login">
          <button className="bg-gradient-to-br from-[#222057] from-5% my-4 to-[#F8991D] to-90% w-full text-white font-medium py-3 rounded-lg">Reset Password</button>
          </Link>
        </form>
      </div>
    </div>
  );

}

export default ResetPassword
