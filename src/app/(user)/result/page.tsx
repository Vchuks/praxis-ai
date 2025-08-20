"use client";
import { Fragment, useEffect } from "react";
import { useResultStore } from "@/stores";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import logo from "../../../../public/assets/vlogo.png"
import Link from "next/link";
import Quiz from "@/components/quiz";

type ResponseType = {
  title: string;
  snippet: string;
  link: string;
};
const ResultPage = () => {
  const { userQuestion, userAnswer, loading, error } = useResultStore();

  const router = useRouter();
  

  // Debug logging
  useEffect(() => {
    console.log("Result Page State:", {
      userQuestion,
      userAnswer,
      loading,
      error,
    });
  }, [userQuestion, userAnswer, loading, error]);

  // Redirect back if no question is set
  useEffect(() => {
    if (!loading && !userQuestion && !error) {
      router.push("/welcome");
    }
  }, [userQuestion, loading, error, router]);

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
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

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="text-red-600 text-center">
          <h2 className="text-xl font-semibold mb-2">
            Oops! Something went wrong
          </h2>
          {/* <p className="text-gray-600 mb-4">{error}</p> */}
        </div>
        <div className="space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#F8991D] text-white rounded hover:bg-[#e8821a] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No question state
  if (!userQuestion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <p className="text-gray-600">No question selected</p>
        <button
          onClick={() => router.push("/welcome")}
          className="px-4 py-2 bg-[#F8991D] text-white rounded hover:bg-[#e8821a] transition-colors"
        >
          Select a Topic
        </button>
      </div>
    );
  }

  // Success state with answer
  return (
    <div className="max-w-4xl mx-auto px-2 lg:px-0 py-6 space-y-6">
      {/* Question Display */}
      <div className="bg-white w-11/12 lg:w-3/4 ml-auto rounded-l-[100px] md:rounded-l-[200px] rounded-br-[100px] md:rounded-br-[200px] p-4">
        <p className="text-sm mb-2 leading-loose pl-4">
          {userQuestion.course_topic}
        </p>
        {/* <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Format:</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F8991D] text-white">
            {userQuestion.format}
          </span>
        </div> */}
      </div>

      {/* Answer Display */}
      <div className="flex gap-4 mt-16">
        <Image src={logo} alt="" className="w-6"/>
        <p>Praxis</p>
        <ChevronDownIcon className="w-4"/>
      </div>
      {userAnswer ? (
        <div className="w-full lg:w-[40rem] rounded-lg text-sm ">
         
          {/* Handle different response types */}
          {Array.isArray(userAnswer.data) ? (
            <>
              <div className="space-y-4">
                {userAnswer.data.length === 0 ? (
                  <p className="text-gray-500 italic">No content available</p>
                ) : (
                  userAnswer.response_type !== "quiz" && userAnswer.data.map((item: ResponseType, index) => {
                    return (
                      <Fragment key={`index-${index}`}>
                        <div  className="pl-6 pr-4 lg:pl-16 rounded-lg">
                          <div>
                            <ul className="list-disc">
                              <li className="font-bold">{item.title}</li>
                              <span>{item.link} - </span>
                              <span>{item.snippet}</span>
                            </ul>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })
                )}
              </div>
              {userAnswer.response_type === "videos" &&<div className="py-4  w-full lg:w-[45rem] px-2 md:px-4 mt-4">
                <div className="bg-white p-4 rounded-t-xl mb-2">
                  <p className="text-[20px]">{userQuestion.topicName}</p>
                </div>
                {userAnswer.data.map((item: ResponseType, index) => {
                  const getV = item.link.split("watch?v=");

                  return (
                    <div key={`video-${index}`} className="w-full mb-4 bg-white">
                      <div className="flex flex-col lg:flex-row gap-4 bg-white ">
                        <div className=" rounded-tl-3xl pt-3 lg:pt-0">
                          <iframe
                            width="260"
                            height="180"
                            src={`${getV[0]}/embed/${getV[1]}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="object-contain m-auto rounded-ss-2xl rounded-ee-2xl"
                          ></iframe>
                        </div>
                        <div className="w-full lg:w-2/4 flex flex-col justify-between p-3">
                          <p className="text-base md:text-lg font-semibold">{item.title}</p>
                          <p className="text-sm pt-3 lg:pt-0 snipbox">
                            {item.snippet}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>}
              {userAnswer.response_type === "article" &&<div className="py-4  w-full lg:w-[45rem] px-2 md:px-4 mt-4">
                <div className="bg-white p-4 rounded-t-xl mb-2">
                  <p className="text-[20px]">{userQuestion.topicName}</p>
                </div>
                {userAnswer.data.map((item: ResponseType) => {
                  
                  return (
                    <div key={`article-${item.title}`} className="w-full mb-4 ">
                      <div className="text-blue-950">
                        
                        <Link href={item.link}>{item.title}</Link>
                      </div>
                    </div>
                  );
                })}
              </div>}
              {userAnswer.response_type === "quiz" &&<div className="py-4  w-full lg:w-[45rem] px-2 md:px-4 mt-4">
                
                {<Quiz quizData = {userAnswer}/>}
              </div>}

            </>
          ) : (
            <div className="prose max-w-none">
              <p className="pb-4 font-bold">{userQuestion.topicName}</p>
              {typeof userAnswer.data === "object" &&
              userAnswer.data ? (
              <p className="leading-relaxed">{userAnswer.data.content}</p>
              ) : (
                <p className="text-gray-700 leading-relaxed">
                  {typeof userAnswer.data === "string"
                    ? userAnswer.data
                    : JSON.stringify(userAnswer.data, null, 2)}
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <p className="text-gray-500 italic">No response received</p>
        </div>
      )}
    </div>
  );
};

export default ResultPage;
