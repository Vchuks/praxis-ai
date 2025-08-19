"use client";

import { useAuthStore } from "@/stores";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import wel1 from "../../../../public/assets/wel1.png";
import wel2 from "../../../../public/assets/well2.png";
import wel3 from "../../../../public/assets/wel3.png";
import wel4 from "../../../../public/assets/wel4.png";
import Image from "next/image";

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
      location.href = "/welcome";
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

  const [viewScreen, setViewScreen] = useState<number>(1);

  const welcomePack = [
    {
      id: 1,
      title: "Hey! I’m  Praxis, Your AI Tutor",
      desc: "Learning shouldn’t stop in the classroom & Praxis AI makes sure of that. Access structured learning and materials from billions of sources around the world, practice quizzes, projects and more.",
      pix: wel1,
    },
    {
      id: 2,
      title: "Test Your Knowledge With  Quizzes",
      desc: "Get instant pop up quizzes and projects to test your learning, get them automatically graded, get feedback on your performance and areas you need to improve on, as well as suggestions on materials to brush up on your knowledge deficit.",
      pix: wel2,
    },
    {
      id: 3,
      title: "Get Structured Learning Materials",
      desc: "The power of AI, access to billions of materials worldwide, all packed into Pluralcode’s world-class curriculum & accredited across the United States, Canada & Europe. Praxis’ structured learning will prepare you for global dominance.",
      pix: wel3,
    },
    {
      id: 4,
      title: "Personalized Soft Skills Training",
      desc: "Pluralcode’s SandBox training is designed to prepare you for success un your chosen field. Soft skills training, personal branding, entrepreneurship and freelance trainings are all accessible and thought by Praxis AI.",
      pix: wel4,
    },
  ];
  return (
    <div className="bg-wrapper flex items-baseline lg:items-center ">
      <div className={`inh hidden md:block w-full md:pt-20 pb-4 lg:pt-4 overflow-y-scroll`}>
        {welcomePack.map(each => {
          return each.id === viewScreen && viewScreen <5 && 
        <div key={each.id} className="w-full  m-auto xl:pt-4">
          <h2 className="cursor-pointer bg-clip-text text-transparent bg-gradient-to-br from-[#222057] to-[#F8991D] to-80% md:text-3xl lg:text-4xl font-[900] text-center" >{each.title}</h2>
          <p className="text-white font-light pt-2 pb-4 w-full md:px-2 lg:px-0 lg:w-[32rem] m-auto text-center text-sm lg:text-base">{each.desc}</p>
          <Image src={each.pix} alt="" className={`w-80 lg:w-96 m-auto pt-10 `} />
          {viewScreen < 4
          ?<p className="text-end pr-12 pt-8 text-white font-bold" onClick={()=>{
            setViewScreen((num)=> num + 1)
          }}>Next &gt;</p>: null
        }
        </div> 
        })}
      </div>
      <div
        className={`w-full md:bg-white inh flex md:block lg:flex  items-center`}
      >
        <div className="w-11/12 md:w-full lg:w-10/12 bg-white m-auto px-6 pt-8 pb-8 md:mt-20  lg:mt-auto lg:p-14 rounded-2xl">
          <h2 className="w-fit font-inter m-auto py-2 bg-clip-text text-transparent bg-gradient-to-br from-[#222057]  to-[#F8991D] to-80%  font-[900] text-2xl md:text-4xl text-center">
            Welcome Back!
          </h2>
          <p className="text-center">Login to your Praxis AI account</p>
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
                onChange={(e) => setPassword(e.target.value)}
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
    </div>
  );
};

export default Login;
