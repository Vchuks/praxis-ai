import Image from "next/image";
import Link from "next/link";
import cam from "../../public/assets/cam.png";
import article from "../../public/assets/article.png";
import ask from "../../public/assets/ask.png";
import { Fragment, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Tooltip } from "react-tooltip";
import { useCourseStore, useResultStore } from "@/stores";

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

const UserCourse = () => {
  const { userCourses } = useCourseStore();
  const {setUserQuestion} = useResultStore()

  const tooltipData = [
    {
      id: 1,
      pic: cam,
      desc: "video",
    },
    {
      id: 2,
      pic: article,
      desc: "article",
    },
    {
      id: 3,
      pic: ask,
      desc: "quiz",
    },
  ];

  const [courseDropdown, setCourseDropdown] = useState<number | null>(null);

  const handleCourseDropdown = (id: number) => {
    setCourseDropdown(courseDropdown === id ? null : id);
  };
  const [subTopicDropdown, setSubTopicDropdown] = useState<string | null>(null);

  const handleSubTopicDropdown = (id: string) => {
    setSubTopicDropdown(subTopicDropdown === id ? null : id);
  };

  return (
    <div className="w-full">
      {userCourses.map((each) => {
        return (
          <Fragment key={each.coursename}>
            <div
              className="grid grid-cols-7 w-full my-4 items-center bg-[#F5F6FA] py-2 cursor-pointer"
              onClick={() => handleCourseDropdown(each.course_code)}
            >
              <p className="w-[0.30rem] h-full rounded-2xl bg-[#F8991D]"></p>
              <h3 className="text-[#F8991D] col-span-5 text-lg font-semibold text-center">
                {each.coursename}
              </h3>
              <ChevronDownIcon className="w-5" />
            </div>
            {courseDropdown === each.course_code ? (
              <div className="px-4  rounded-b-lg pb-4 overflow-y-auto no-scrollbar">
                {each?.course_topics?.map((topics: TopicType) => {
                  return (
                    <Fragment key={topics.id}
                    >
                      <div
                        className="flex items-center w-full justify-between py-2 cursor-pointer"
                        onClick={() => handleSubTopicDropdown(topics.id)}
                      >
                        <p className="text-sm w-full truncate">
                          {topics.topic}
                        </p>
                        
                      </div>
                      {subTopicDropdown === topics.id && topics?.sub_topic?.map((subT: SubTopicType) => (
                        <div
                          key={subT.id}
                          className="px-1 py-1 font-light shadow text-sm w-full flex items-start"
                        >
                          <p className="mb-2 w-full">{subT.name}</p>
                          <div className="flex items-center w-32 gap-[2px] cursor-pointer ">
                          {tooltipData.map((tooltip) => (
                            <div
                              onClick={()=> setUserQuestion({course_topic: `${topics.topic}`,format: `${tooltip.desc}`})}
                              className="relative"
                              key={tooltip.id}
                              data-tooltip-id={`tooltip-${tooltip.id}`}
                              data-tooltip-content={tooltip.desc}
                            >
                              <Image src={tooltip.pic} alt="" className="" />
                            </div>
                          ))}
                          {tooltipData.map((item) => (
                            <Tooltip
                              key={`tooltip-component-${item.id}`}
                              id={`tooltip-${item.id}`}
                              className="text-sm"
                            />
                          ))}
                        </div>
                        </div>
                      ))}
                    </Fragment>
                  );
                })}
              </div>
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
};

export default UserCourse;
