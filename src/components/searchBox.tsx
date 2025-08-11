"use client";
import { useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import quiz from "../../public/assets/quiz.png";
import search from "../../public/assets/global-search.png";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <div className="w-full md:w-[48rem] m-auto bg-gradient-to-r p-[2px] md:p-1 rounded-xl md:rounded-3xl from-[#222057] to-[#F8991D]">
      <div className="bg-white w-full border-0 rounded-[10px] md:rounded-[20px] px-3 md:px-5 py-3">
        <input
          type="search"
          name="searchAll"
          className="w-full pt-1 outline-0"
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
          <div className="pt-2 md:pt-4 font-light flex gap-4">
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
            <div className="flex items-center gap-1 md:gap-2 text-xs md:text-base">
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
              <p>Video Research</p>
            </div>
            <div className="flex items-center gap-1 md:gap-2 text-xs md:text-base">
              <Image src={search} alt="" className="w-3 md:w-4 h-fit" />
              <p>Resources</p>
            </div>
            <div className="flex items-center gap-1 md:gap-2 text-xs md:text-base">
              <Image src={quiz} alt="" className="w-2 md:w-3 h-fit" />

              <p>Quiz</p>
            </div>
          </div>
          <Link href="/result">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 md:size-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
