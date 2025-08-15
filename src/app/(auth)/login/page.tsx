"use client";

import { useAuthStore } from "@/stores";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error, clearError } = useAuthStore();

  const handleSubmit = async () => {
    if (!email || !password) {
      return;
    }

    try {
      await login(email, password);
      location.href = "/welcome"
    } catch (error) {
      console.error("Login failed:", error);
      
    }
  };
  const [passwordType, setPasswordType] = useState("password");
  const handlePassword = () => {
    return passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };
  return (
    <div className="bg-wrapper flex items-center ">
      <div className="w-11/12 md:w-[30rem] lg:w-[35rem] bg-white m-auto px-4 pt-8 pb-8 md:p-14 rounded-2xl">
        <h2 className="w-fit py-2 bg-clip-text text-transparent bg-gradient-to-br from-[#222057]  to-[#F8991D] to-80% font-inter font-[900] text-2xl md:text-4xl">
          Welcome Back!
        </h2>
        <p>Login to your Praxis AI account</p>
        <form className="flex flex-col gap-4 py-7">
          <div className="flex flex-col my-2">
            <label htmlFor="email" className="text-sm pb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#22205747] rounded-lg px-6 py-3"
            />
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-sm pb-2">
              Password
            </label>
            <input
              type={passwordType}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value) }
              id="password"
              className=" border border-[#22205747] rounded-lg px-6 py-3"
            />

            <div
              className="absolute top-12 right-4 cursor-pointer"
              onClick={handlePassword}
            >
              {passwordType === "password" ? (
                <EyeSlashIcon className="w-4" />
              ) : (
                <EyeIcon className="w-4" />
              )}
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <input
                type="checkbox"
                id="remember"
                className=" accent-[#222057] mr-2"
              />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <Link href="/forgotpassword">
              <p className="font-semibold text-[#222057]">Forgot password?</p>
            </Link>
          </div>

          <button
            className={`bg-gradient-to-br from-[#222057] from-5% my-4 to-[#F8991D] to-90% w-full text-white font-medium py-3 rounded-lg hover:opacity-90 ${
              loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            } `}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
              {error}
              <button
                onClick={clearError}
                className="float-right text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
