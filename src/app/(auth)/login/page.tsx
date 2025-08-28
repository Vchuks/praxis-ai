"use client";

import { useAuthStore } from "@/stores";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {  useState } from "react";
import wel1 from "../../../../public/assets/wel1.png";
import wel2 from "../../../../public/assets/well2.png";
import wel3 from "../../../../public/assets/wel3.png";
import wel4 from "../../../../public/assets/wel4.png";
import Image from "next/image";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error, clearError } = useAuthStore();
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev'>('next');

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
      title: "Hey! I'm Praxis, Your AI Tutor",
      desc: "Learning shouldn't stop in the classroom & Praxis AI makes sure of that. Access structured learning and materials from billions of sources around the world, practice quizzes, projects and more.",
      pix: wel1,
    },
    {
      id: 2,
      title: "Test Your Knowledge With Quizzes",
      desc: "Get instant pop up quizzes and projects to test your learning, get them automatically graded, get feedback on your performance and areas you need to improve on, as well as suggestions on materials to brush up on your knowledge deficit.",
      pix: wel2,
    },
    {
      id: 3,
      title: "Get Structured Learning Materials",
      desc: "The power of AI, access to billions of materials worldwide, all packed into Pluralcode's world-class curriculum & accredited across the United States, Canada & Europe. Praxis' structured learning will prepare you for global dominance.",
      pix: wel3,
    },
    {
      id: 4,
      title: "Personalized Soft Skills Training",
      desc: "Pluralcode's SandBox training is designed to prepare you for success in your chosen field. Soft skills training, personal branding, entrepreneurship and freelance trainings are all accessible and taught by Praxis AI.",
      pix: wel4,
    },
  ];

  // Handle navigation with animation
  const handleNext = () => {
    if (viewScreen < 4 && !isAnimating) {
      setIsAnimating(true);
      setAnimationDirection('next');
      
      setTimeout(() => {
        setViewScreen((num) => num + 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const handlePrev = () => {
    if (viewScreen > 1 && !isAnimating) {
      setIsAnimating(true);
      setAnimationDirection('prev');
      
      setTimeout(() => {
        setViewScreen((num) => num - 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  
  return (
    <div className="bg-wrapper flex items-center h-full">
      <div className="inh hidden md:block w-full md:pt-20 pb-4 lg:pt-10">
        <div className="relative w-full h-11/12 lg:h-[99%]">
          {welcomePack.map((each) => {
            const isActive = each.id === viewScreen;
            const shouldRender = isActive || isAnimating;
            
            if (!shouldRender) return null;

            return (
              <div
                key={each.id}
                className={`
                  absolute inset-0 w-full m-auto xl:pt-4 transition-all duration-500 ease-in-out
                  ${isActive && !isAnimating 
                    ? 'opacity-100 transform translate-x-0 scale-100' 
                    : isAnimating
                      ? animationDirection === 'next'
                        ? each.id === viewScreen 
                          ? 'opacity-0 transform -translate-x-full scale-95'
                          : 'opacity-100 transform translate-x-0 scale-100'
                        : each.id === viewScreen
                          ? 'opacity-0 transform translate-x-full scale-95'
                          : 'opacity-100 transform translate-x-0 scale-100'
                      : 'opacity-0 transform translate-x-full scale-95'
                  }
                `}
              >
                {/* Animated Title */}
                <h2 
                  className={`
                    cursor-pointer w-full lg:w-[32rem] m-auto bg-clip-text text-transparent 
                    bg-gradient-to-br from-[#222057] to-[#F8991D] to-80% md:text-2xl lg:text-4xl 
                    font-[900] text-center transition-all duration-700 ease-out 
                    ${isActive && !isAnimating 
                      ? 'opacity-100 transform translate-y-0' 
                      : 'opacity-0 transform translate-y-8'
                    }
                  `}
                  style={{
                    transitionDelay: isActive && !isAnimating ? '200ms' : '0ms'
                  }}
                >
                  {each.title}
                </h2>

                {/* Animated Description */}
                <p 
                  className={`
                    text-white font-light pt-2 pb-4 w-full md:px-2 lg:px-4 lg:w-[30rem] 
                    xl:w-[35rem] m-auto text-center text-xs lg:text-sm xl:text-base 
                    transition-all duration-700 ease-out
                    ${isActive && !isAnimating 
                      ? 'opacity-100 transform translate-y-0' 
                      : 'opacity-0 transform translate-y-8'
                    }
                  `}
                  style={{
                    transitionDelay: isActive && !isAnimating ? '400ms' : '0ms'
                  }}
                >
                  {each.desc}
                </p>

                {/* Animated Image */}
                <div 
                  className={`
                    flex justify-center transition-all duration-800 ease-out
                    ${isActive && !isAnimating 
                      ? 'opacity-100 transform scale-100' 
                      : 'opacity-0 transform scale-90'
                    }
                  `}
                  style={{
                    transitionDelay: isActive && !isAnimating ? '600ms' : '0ms'
                  }}
                >
                  <Image 
                    src={each.pix} 
                    alt={`Welcome screen ${each.id}`}
                    className="w-80 h-[22rem] xl:h-96 object-contain lg:w-64 xl:w-80 lg:pt-6 transform hover:scale-103 transition-transform duration-300"
                  />
                </div>

                {/* Navigation Buttons */}
                {viewScreen < 4 && (
                  <button
                    className={`
                      absolute top-70 lg:top-80 xl:top-96 -right-10 lg:right-0 pr-12 pt-8 text-gray-300 
                      font-semibold cursor-pointer hover:text-white transition-all duration-300
                      transform hover:translate-x-1
                      ${isActive && !isAnimating 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-4'
                      }
                    `}
                    style={{
                      transitionDelay: isActive && !isAnimating ? '800ms' : '0ms'
                    }}
                    onClick={handleNext}
                    disabled={isAnimating}
                  >
                    Next &gt;
                  </button>
                )}

                {viewScreen > 1 && viewScreen <= 4 && (
                  <button
                    className={`
                      absolute top-70 lg:top-80 xl:top-96 left-2 lg:left-10 pr-12 pt-8 text-gray-300 
                      font-semibold cursor-pointer hover:text-white transition-all duration-300
                      transform hover:-translate-x-1
                      ${isActive && !isAnimating 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 -translate-x-4'
                      }
                    `}
                    style={{
                      transitionDelay: isActive && !isAnimating ? '800ms' : '0ms'
                    }}
                    onClick={handlePrev}
                    disabled={isAnimating}
                  >
                    &lt; Prev
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2">
          {welcomePack.map((_, index) => (
            <button
              key={index}
              className={`
                w-2 h-2 rounded-full transition-all duration-300 ease-in-out
                ${index + 1 === viewScreen 
                  ? 'bg-[#F8991D] scale-125' 
                  : 'bg-gray-400 hover:bg-gray-300'
                }
              `}
              onClick={() => {
                if (!isAnimating && index + 1 !== viewScreen) {
                  setIsAnimating(true);
                  setAnimationDirection(index + 1 > viewScreen ? 'next' : 'prev');
                  setTimeout(() => {
                    setViewScreen(index + 1);
                    setIsAnimating(false);
                  }, 150);
                }
              }}
              disabled={isAnimating}
            />
          ))}
        </div>
      </div>

      <div className="w-full md:bg-white inh flex items-center">
        <div className="w-11/12 md:w-full lg:w-10/12 bg-white m-auto px-6 pt-8 pb-8 md:mt-20 lg:mt-8 xl:mt-auto 2xl:mt-20 lg:p-14 rounded-2xl transform hover:shadow-2xl transition-all duration-300">
          <h2 className="w-fit font-inter m-auto py-2 bg-clip-text text-transparent bg-gradient-to-br from-[#222057] to-[#F8991D] to-80% font-[900] text-2xl md:text-4xl text-center animate-pulse">
            Welcome Back!
          </h2>
          <p className="text-center opacity-80">Login to your Praxis AI account</p>
          
          <form className="flex flex-col gap-4 py-7">
            <div className="flex flex-col my-2 transform hover:scale-105 transition-transform duration-200">
              <label htmlFor="email" className="text-sm pb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-[#22205747] rounded-lg px-6 py-3 focus:border-[#F8991D] focus:outline-none focus:ring-2 focus:ring-[#F8991D]/20 transition-all duration-300"
              />
            </div>
            
            <div className="flex flex-col relative transform hover:scale-105 transition-transform duration-200">
              <label htmlFor="password" className="text-sm pb-2">
                Password
              </label>
              <input
                type={passwordType}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="border border-[#22205747] rounded-lg px-6 py-3 focus:border-[#F8991D] focus:outline-none focus:ring-2 focus:ring-[#F8991D]/20 transition-all duration-300"
              />
              <div
                className="absolute top-12 right-4 cursor-pointer hover:scale-110 transition-transform duration-200"
                onClick={handlePassword}
              >
                {passwordType === "password" ? (
                  <EyeSlashIcon className="w-4 text-gray-500 hover:text-[#F8991D]" />
                ) : (
                  <EyeIcon className="w-4 text-gray-500 hover:text-[#F8991D]" />
                )}
              </div>
            </div>
            
            <div className="flex justify-between text-sm">
              <div className="flex items-center hover:scale-105 transition-transform duration-200">
                <input
                  type="checkbox"
                  id="remember"
                  className="accent-[#222057] mr-2"
                />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <Link href="#">
                <p className="font-semibold text-[#222057] hover:text-[#F8991D] transition-colors duration-200">
                  Forgot password?
                </p>
              </Link>
            </div>

            <button
              className={`
                bg-gradient-to-br from-[#222057] from-5% my-4 to-[#F8991D] to-90% 
                w-full text-white font-medium py-3 rounded-lg hover:opacity-90 
                transform hover:scale-105 hover:shadow-lg transition-all duration-300
                ${loading ? "cursor-not-allowed opacity-50 animate-pulse" : "cursor-pointer"}
              `}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded animate-shake">
                {error}
                <button
                  onClick={clearError}
                  className="float-right text-red-500 hover:text-red-700 hover:scale-110 transition-all duration-200"
                >
                  ×
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Login;