import Image from "next/image";
import cam from "../../public/assets/cam.png";
import article from "../../public/assets/global-search.png";
import ask from "../../public/assets/quiz.png";
import dots from "../../public/assets/dots.png";
import faq from "../../public/assets/faq.png";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { Tooltip } from "react-tooltip";
import { useCourseStore, useResultStore, useSmallNavStore } from "@/stores";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
// import { eachboxType } from "@/stores/courses.store";

type SubTopicType = {
  id: string;
  name: string;
  faq: [];
};

type TopicType = {
  id: string;
  topic: string;
  sub_topic: SubTopicType[];
};

type CourseType = {
  course_code: number;
  coursename: string;
  course_topics: TopicType[];
};

const UserCourse = () => {
  const { userCourses, sandbox } = useCourseStore();
  const { setUserQuestion } = useResultStore();
  const { showNav, setShowNav } = useSmallNavStore();

  const tooltipData = [
    {
      id: 1,
      pic: cam,
      desc: "video",
      label: "video",
    },
    {
      id: 2,
      pic: dots,
      desc: "",
      label: "dots",
      child: [
        {
          id: 3,
          pic: article,
          desc: "article",
          label: "General Study",
        },
        {
          id: 4,
          pic: ask,
          desc: "quiz",
          label: "Quiz",
        },
        {
          id: 5,
          pic: faq,
          desc: "faq",
          label: "FAQs",
        },
      ],
    },
  ];

  const [courseDropdown, setCourseDropdown] = useState<number | null>(null);
  const [subTopicDropdown, setSubTopicDropdown] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [subTID, setSubTID] = useState<string | null>(null);
  const [sandID, setSandID] = useState<string | null>(null);
  const [openSmall, setOpenSmall] = useState<string | null>(null);
  const [openSmall2, setOpenSmall2] = useState<string | null>(null);

  const router = useRouter();
  const dotsRef = useRef<HTMLDivElement>(null)
  const dotsRef2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dotsRef.current && !dotsRef.current.contains(event.target as Node)) {
        setOpenSmall(null);
      }
    };
    const handleClickOutside2 = (event: MouseEvent) => {
      if (dotsRef2.current && !dotsRef2.current.contains(event.target as Node)) {
        setOpenSmall2(null);
      }
    };

    // Only add listener when dropdown is open
    if (openSmall) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    if (openSmall2) {
      document.addEventListener('mousedown', handleClickOutside2);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutside2);
    };
  }, [openSmall, openSmall2]);


  useMemo(() => {
    setCourseDropdown(userCourses[0]?.course_code);
  }, [userCourses]);

  const handleCourseDropdown = useCallback(
    (id: number) => {
      setCourseDropdown(courseDropdown === id ? null : id);
      setSandboxDropdown(null);
      if (courseDropdown !== id) {
        setSubTopicDropdown(null);
      }
    },
    [courseDropdown]
  );

  const handleSubTopicDropdown = useCallback(
    (id: string) => {
      setSubTopicDropdown(subTopicDropdown === id ? null : id);
    },
    [subTopicDropdown]
  );

  const [sandboxDropdown, setSandboxDropdown] = useState<string | null>(null);
  const [sandboxSubTopicDropdown, setSandboxSubTopicDropdown] = useState<
    string | null
  >(null);

  const handleSandboxDropdown = useCallback(
    (id: string) => {
      setSandboxDropdown(sandboxDropdown === id ? null : id);
      setCourseDropdown(null);
      if (sandboxDropdown !== id) {
        setSandboxSubTopicDropdown(null);
      }
    },
    [sandboxDropdown]
  );

  const handleSandboxSubTopicDropdown = useCallback(
    (id: string) => {
      setSandboxSubTopicDropdown(sandboxSubTopicDropdown === id ? null : id);
    },
    [sandboxSubTopicDropdown]
  );

  const handleFormatSelection = useCallback(
    async (
      topicName: string,
      subTopicName: string,
      format: string,
      actionId: string,
      subId: string
    ) => {
      if (showNav) {
        setShowNav(false);
      }
      try {
        setLoadingAction(actionId);
        setSubTID(subId);
        setSandID(sandID);
        const questionData = {
          topicName: topicName,
          course_topic: `${topicName} - ${subTopicName}`,
          format: format,
        };

        const getD = format === "article" ? true : false;
        // Set the user question and wait for completion
        await setUserQuestion(questionData, getD);

        // Navigate to results page after data is set
        router.push("/result");
        setShowNav(false);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error("Something went wrong. Please try again.", error);
        }
      } finally {
        setLoadingAction(null);
        setSubTID(null);
        setSandID(sandID);
        setOpenSmall(null);
      }
    },
    [setUserQuestion, router, setShowNav,showNav, sandID]
  );

  const handleTools = (id: string) => {
    setOpenSmall(id);
  };
  const handleTools2 = (id: string) => {
    setOpenSmall2(id);
  };

  if (!userCourses || userCourses.length === 0) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-gray-500">No courses available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {userCourses.map((each: CourseType) => {
        return (
          <Fragment key={`course-${each.course_code}`}>
            <div
              className="grid grid-cols-7 w-full my-4 items-center bg-[#F5F6FA] py-2 cursor-pointer hover:bg-[#F0F1F5] transition-colors duration-200"
              onClick={() => handleCourseDropdown(each.course_code)}
              role="button"
              aria-expanded={courseDropdown === each.course_code}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCourseDropdown(each.course_code);
                }
              }}
            >
              <p className="w-[0.30rem] h-8 rounded-2xl bg-[#222057]"></p>
              <h3 className="text-[#222057] col-span-5 text-lg font-semibold text-center">
                {each.coursename}
              </h3>
              {courseDropdown === each.course_code ? (
                <ChevronUpIcon className="w-5 text-[#222057]" />
              ) : (
                <ChevronDownIcon className="w-5 text-[#222057]" />
              )}
            </div>
            <div
              className={`
  transition-all duration-500 ease-out overflow-hidden
  ${
    courseDropdown === each.course_code
      ? "max-h-[800px] opacity-100"
      : "max-h-0 opacity-0"
  }
`}
            >
              {courseDropdown === each.course_code && (
                <div className="relative px-4 rounded-b-lg pb-4 overflow-y-auto no-scrollbar">
                  {each?.course_topics?.map((topics: TopicType) => {
                    return (
                      <Fragment key={`topic-${topics.id}`}>
                        <div
                          className={`flex items-center w-full justify-between py-3 cursor-pointer hover:bg-gray-50 rounded transition-colors duration-200
                          
                          `}
                          onClick={() => handleSubTopicDropdown(topics.id)}
                          role="button"
                          aria-expanded={subTopicDropdown === topics.id}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleSubTopicDropdown(topics.id);
                            }
                          }}
                        >
                          <p className="text-sm w-full truncate font-medium text-gray-700">
                            {topics.topic}
                          </p>
                          <ChevronRightIcon
                            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                              subTopicDropdown === topics.id ? "rotate-90" : ""
                            }`}
                          />
                        </div>
                        <div
                          className={`transition-all duration-500 ease-out overflow-hidden
                              ${
                                subTopicDropdown === topics.id
                                  ? "max-h-[400px] opacity-100"
                                  : "max-h-0 opacity-0"
                              }
                                   `}
                        >
                          {subTopicDropdown === topics.id &&
                            topics?.sub_topic?.map((subT: SubTopicType) => (
                              <div
                                key={`subtopic-${subT.id}`}
                                className={` ml-2 px-2 py-2 font-light shadow-sm rounded-lg flex items-start mb-4 bg-white ${
                                  subT.id === subTID
                                    ? "opacity-100"
                                    : subTID === null
                                    ? "opacity-100"
                                    : "opacity-70"
                                } 
                            
                            `}
                              >
                                <p
                                  className="mb-2 text-sm w-full text-gray-600 leading-relaxed cursor-pointer"
                                  onClick={() =>
                                    handleFormatSelection(
                                      topics.topic,
                                      subT.name,
                                      "video",
                                      subT.id,
                                      subT.id
                                    )
                                  }
                                >
                                  {subT.name}
                                </p>
                                <div className=" flex items-baseline gap-3 md:gap-2 w-20 justify-end" ref={dotsRef}>
                                  {tooltipData.map((tooltip) => {
                                    const actionId = `${subT.id}-${tooltip.id}`;
                                    const isLoading =
                                      loadingAction === actionId;

                                    return (
                                      <Fragment
                                        key={`action-${tooltip.id}-${subT.id}`}
                                      >
                                        <button
                                          className={` rounded-lg transition-all duration-200 hover:shadow-md ${
                                            isLoading
                                              ? "bg-gray-100 cursor-wait"
                                              : "bg-white hover:bg-gray-50 active:scale-95"
                                          }`}
                                          onClick={() => {
                                            return tooltip.desc !== ""
                                              ? handleFormatSelection(
                                                  topics.topic,
                                                  subT.name,
                                                  tooltip.desc,
                                                  actionId,
                                                  subT.id
                                                )
                                              : handleTools(subT.id);
                                          }}
                                          disabled={isLoading}
                                          data-tooltip-id={`tooltip-${tooltip.id}`}
                                          data-tooltip-content={tooltip.desc}
                                          aria-label={`${tooltip.desc} for ${subT.name}`}
                                        >
                                          {isLoading ? (
                                            <div className="w-6 h-6 animate-spin rounded-full border-2 border-[#F8991D] border-t-transparent" />
                                          ) : (
                                            <Image
                                              src={tooltip.pic}
                                              alt={tooltip.desc}
                                              className={`${
                                                tooltip.desc === ""
                                                  ? "w-4 h-5"
                                                  : "w-6 h-6"
                                              } object-contain cursor-pointer`}
                                            />
                                          )}
                                        </button>

                                        {/* dots to reveal other icons */}
                                        {openSmall === subT.id && (
                                          <div
                                            className={`w-fit absolute left-32 bg-white z-20 py-2 px-4 flex flex-col gap-2 
                          shadow-2xl shadow-[#0000001A] rounded-l-2xl rounded-ee-2xl
                          transition-all duration-300 ease-out transform-gpu
                          ${
                            openSmall === subT.id
                              ? "opacity-100 scale-100 translate-y-0"
                              : "opacity-0 scale-95 translate-y-[-10px] pointer-events-none"
                          }`}
                                          >
                                            {tooltip.child &&
                                              tooltip.child.map((eachC) => {
                                                const actionId2 = `${subT.id}-${eachC.id}`;
                                                const isLoading =
                                                  loadingAction === actionId2;
                                                return (
                                                  <button
                                                    key={eachC.id}
                                                    className={` rounded-lg transition-all duration-200  hover:shadow-md ${
                                                      isLoading
                                                        ? "bg-gray-100 cursor-wait"
                                                        : "bg-white hover:bg-gray-50 active:scale-95"
                                                    }`}
                                                    onClick={() => {
                                                      return handleFormatSelection(
                                                        topics.topic,
                                                        subT.name,
                                                        eachC.desc,
                                                        actionId2,
                                                        subT.id
                                                      );
                                                    }}
                                                    disabled={isLoading}
                                                    data-tooltip-id={`tooltip-${eachC.id}`}
                                                    data-tooltip-content={
                                                      eachC.desc
                                                    }
                                                    aria-label={`${eachC.desc} for ${subT.name}`}
                                                  >
                                                    <div className="flex gap-2">
                                                      {isLoading ? (
                                                        <div className="w-4 h-4 animate-spin rounded-full border-2 border-[#F8991D] border-t-transparent" />
                                                      ) : (
                                                        <Image
                                                          src={eachC.pic}
                                                          alt={eachC.desc}
                                                          className="w-4 h-4 object-contain cursor-pointer"
                                                          // width={24}
                                                          // height={24}
                                                        />
                                                      )}
                                                      <p className="text-sm">
                                                        {eachC.label}
                                                      </p>
                                                    </div>
                                                  </button>
                                                );
                                              })}
                                          </div>
                                        )}
                                      </Fragment>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              )}
            </div>
          </Fragment>
        );
      })}
      {sandbox.map((each: TopicType) => {
        return (
          <Fragment key={`course-${each.id}`}>
            <div
              className="grid grid-cols-7 w-full my-4 items-center bg-[#F5F6FA] py-2 cursor-pointer hover:bg-[#F0F1F5] transition-colors duration-200"
              onClick={() => handleSandboxDropdown(each.id)}
              role="button"
              aria-expanded={sandboxDropdown === each.id}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSandboxDropdown(each.id);
                }
              }}
            >
              <p className="w-[0.30rem] h-8 rounded-2xl bg-[#222057]"></p>
              <h3 className="text-[#222057] col-span-5 text-lg font-semibold text-center">
                {each.topic}
              </h3>
              {sandboxDropdown === each.id ? (
                <ChevronUpIcon className="w-5 text-[#222057]" />
              ) : (
                <ChevronDownIcon className="w-5 text-[#222057]" />
              )}
            </div>
            <div
              className={`
  transition-all duration-500 ease-out overflow-hidden
  ${
    sandboxDropdown === each.id
      ? "max-h-[800px] opacity-100"
      : "max-h-0 opacity-0"
  }
`}
            >
              {sandboxDropdown === each.id && (
                <div className="relative px-4 rounded-b-lg pb-4 overflow-y-auto no-scrollbar">
                  {each?.sub_topic?.map((topics: SubTopicType) => {
                    return (
                      <Fragment key={`topic-${topics.id}`}>
                        <div
                          className={`flex items-center w-full justify-between py-3 cursor-pointer hover:bg-gray-50 rounded transition-colors duration-200
                          
                          `}
                          onClick={() => {
                            return handleFormatSelection(
                              topics.name,
                              each.topic,
                              "video",
                              topics.id,
                              topics.id
                            );
                          }}
                          role="button"
                          aria-expanded={sandboxSubTopicDropdown === topics.id}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleSandboxSubTopicDropdown(topics.id);
                            }
                          }}
                        >
                          <p className="text-sm w-full truncate font-medium text-gray-600">
                            {topics.name}
                          </p>
                          <div className=" flex items-baseline gap-3 md:gap-2 w-20 justify-end" ref={dotsRef2}>
                            {tooltipData.map((tooltip) => {
                              const actionId = `${topics.id}-${tooltip.id}`;
                              const isLoading = loadingAction === actionId;

                              return (
                                <Fragment
                                  key={`action-${tooltip.id}-${topics.id}`}
                                >
                                  <button
                                    className={` rounded-lg transition-all duration-200 hover:shadow-md ${
                                      isLoading
                                        ? "bg-gray-100 cursor-wait"
                                        : "bg-white hover:bg-gray-50 active:scale-95"
                                    }`}
                                    onClick={() => {
                                      return tooltip.desc !== ""
                                        ? handleFormatSelection(
                                            topics.name,
                                            each.topic,
                                            tooltip.desc,
                                            actionId,
                                            topics.id
                                          )
                                        : handleTools2(topics.id);
                                    }}
                                    disabled={isLoading}
                                    data-tooltip-id={`tooltip-${tooltip.id}`}
                                    data-tooltip-content={tooltip.desc}
                                    aria-label={`${tooltip.desc} for ${each.topic}`}
                                  >
                                    {isLoading ? (
                                      <div className="w-6 h-6 animate-spin rounded-full border-2 border-[#F8991D] border-t-transparent" />
                                    ) : (
                                      <Image
                                        src={tooltip.pic}
                                        alt={tooltip.desc}
                                        className={`${
                                          tooltip.desc === ""
                                            ? "w-4 h-5"
                                            : "w-6 h-6"
                                        } object-contain cursor-pointer`}
                                      />
                                    )}
                                  </button>

                                  {/* dots to reveal other icons */}
                                  {openSmall2 === topics.id && (
                                    <div
                                      className={`w-fit absolute left-32 bg-white z-20 py-2 px-4 flex flex-col gap-2 
                          shadow-2xl shadow-[#0000001A] rounded-l-2xl rounded-ee-2xl
                          transition-all duration-300 ease-out transform-gpu
                          ${
                            openSmall2 === topics.id
                              ? "opacity-100 scale-100 translate-y-0"
                              : "opacity-0 scale-95 translate-y-[-10px] pointer-events-none"
                          }`}
                                    >
                                      {tooltip.child &&
                                        tooltip.child.map((eachC) => {
                                          const actionId2 = `${topics.id}-${eachC.id}`;
                                          const isLoading =
                                            loadingAction === actionId2;
                                          return (
                                            <button
                                              key={eachC.id}
                                              className={` rounded-lg transition-all duration-200  hover:shadow-md ${
                                                isLoading
                                                  ? "bg-gray-100 cursor-wait"
                                                  : "bg-white hover:bg-gray-50 active:scale-95"
                                              }`}
                                              onClick={() => {
                                                return handleFormatSelection(
                                                  topics.name,
                                                  each.topic,
                                                  eachC.desc,
                                                  actionId2,
                                                  topics.id
                                                );
                                              }}
                                              disabled={isLoading}
                                              data-tooltip-id={`tooltip-${eachC.id}`}
                                              data-tooltip-content={eachC.desc}
                                              aria-label={`${eachC.desc} for ${each.topic}`}
                                            >
                                              <div className="flex gap-2">
                                                {isLoading ? (
                                                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-[#F8991D] border-t-transparent" />
                                                ) : (
                                                  <Image
                                                    src={eachC.pic}
                                                    alt={eachC.desc}
                                                    className="w-4 h-4 object-contain cursor-pointer"
                                                    // width={24}
                                                    // height={24}
                                                  />
                                                )}
                                                <p className="text-sm">
                                                  {eachC.label}
                                                </p>
                                              </div>
                                            </button>
                                          );
                                        })}
                                    </div>
                                  )}
                                </Fragment>
                              );
                            })}
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              )}
            </div>
          </Fragment>
        );
      })}

      {/* Tooltips - Place outside the map to avoid duplication */}
      {tooltipData.map((item) => {
        return (
          <Fragment key={item.id}>
            {item.child ? (
              item.child.map((item) => (
                <Tooltip
                  key={`tooltip-component-${item.id}`}
                  id={`tooltip-${item.id}`}
                  className="text-sm bg-gray-800 text-white px-2 py-1 rounded shadow-lg z-30"
                  place="top"
                />
              ))
            ) : (
              <Tooltip
                key={`tooltip-component-${item.id}`}
                id={`tooltip-${item.id}`}
                className="text-sm bg-gray-800 text-white px-2 py-1 rounded shadow-lg"
                place="top"
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default UserCourse;
