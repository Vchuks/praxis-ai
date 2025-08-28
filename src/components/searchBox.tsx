"use client";
import { useCallback, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
// import quiz from "../../public/assets/quiz.png";
// import searchLogo from "../../public/assets/books.png";
// import faq from "../../public/assets/faq.png";
import chat from "../../public/assets/chat.png";
import Image from "next/image";
import { useResultStore, useSmallNavStore } from "@/stores";
import { useRouter } from "next/navigation";

const SearchBox = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const { setShowNav } = useSmallNavStore();
  const { setUserQuestion, loading } = useResultStore();

  const handleAnswer = useCallback(
    async (topicName: string, isSearch: boolean) => {
      setSearch("");

      try {
        if (topicName === "") {
          return;
        }
        const questionData = {
          topicName: topicName,
          course_topic: `${topicName}`,
          format: "",
        };

        // Set the user question and wait for completion
        await setUserQuestion(questionData, isSearch);

        // Navigate to results page after data is set
        router.push("/result");
        setShowNav(false);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(
            `Something went wrong. Please try again. ${error.message}`
          );
        }
      }
    },
    [setUserQuestion, router, setShowNav]
  );
  return (
    <div className="w-full md:w-[95%] xl:w-[48rem] m-auto bg-gradient-to-r p-[2px] lg:p-1 rounded-xl md:rounded-3xl from-[#222057] to-[#F8991D]">
      <div className="bg-white w-full border-0 rounded-[10px] md:rounded-[20px] px-3 lg:px-5 py-3">
        <input
          type="search"
          name="searchAll"
          value={search}
          placeholder="Chat with Praxis"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-sm md:pt-1 outline-0 bg-white"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAnswer(search, true);
            }
          }}
          role="button"
        />
        {selectedFile && (
          <div className="w-full my-2 p-2 bg-gray-100 rounded">
            <XMarkIcon
              className="w-4 ml-auto cursor-pointer"
              onClick={() => setSelectedFile(null)}
            />
            <p className="text-sm text-gray-700">{selectedFile.name}</p>
          </div>
        )}
        <div className="w-full flex justify-between items-end">
          <div className="pt-2 md:pt-4 font-light flex gap-2 lg:gap-4">
            <button
              onClick={triggerFileInput}
              className="flex items-center justify-center cursor-pointer rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4 md:size-5"
              >
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
              </svg>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,application/pdf,.doc,.docx"
            />
            {/* <div
              className={`flex items-center gap-1 md:gap-2 text-[10px] sm:text-xs md:text-base cursor-pointer ${
                userQuestion?.format === "video"
                  ? " py-1 px-2 rounded-md shadow-md"
                  : "border-0"
              }`}
              onClick={() => handleAnswer(search, false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3 md:size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
              <p className="flex gap-1">Video</p>
            </div>
            <div
              className={`flex items-center gap-1 md:gap-2 text-[10px] sm:text-xs md:text-base cursor-pointer ${
                userQuestion?.format === "article"
                  ? "shadow-md py-1 px-2 rounded-md "
                  : "border-0"
              }`}
              onClick={() => handleAnswer(search, false)}
            >
              <Image
                src={searchLogo}
                alt=""
                className="w-3 md:w-4 items-start"
              />
              <p className="">Resources</p>
            </div>
            <div
              className={`flex items-center gap-1 md:gap-2 text-[10px] sm:text-xs md:text-base cursor-pointer ${
                userQuestion?.format === "quiz"
                  ? " py-1 px-2 rounded-md shadow-md"
                  : "border-0"
              }`}
              onClick={() => handleAnswer(search, false)}
            >
              <Image src={quiz} alt="" className="w-2 md:w-3 items-start" />

              <p>Quiz</p>
            </div>
            <div
              className={`flex items-center gap-1 md:gap-2 text-[10px] sm:text-xs md:text-base cursor-pointer ${
                userQuestion?.format === "faq"
                  ? " py-1 px-2 rounded-md shadow-md "
                  : "border-0"
              }`}
              onClick={() => handleAnswer(search, false)}
            >
              <Image src={faq} alt="" className="w-2 md:w-4 items-start" />

              <p>FAQs</p>
            </div> */}
          </div>
          {loading ? (
            <div className="w-6 h-6 animate-spin rounded-full border-2 border-[#F8991D] border-t-transparent" />
          ) : (
            <Image
              src={chat}
              alt=""
              className="w-4 md:w-6 items-start"
              onClick={() => {
                handleAnswer(search, true);
              }}
            />
          )}

          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 md:size-6 cursor-pointer"
            onClick={() => {
              handleAnswer(search, "article", true);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg> */}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
