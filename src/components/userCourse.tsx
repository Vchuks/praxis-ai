import Image from "next/image";
import Link from "next/link";
import cam from "../../public/assets/cam.png";
import article from "../../public/assets/article.png";
import ask from "../../public/assets/ask.png";
import { Fragment } from "react";

const UserCourse = () => {
  const data = [
    {
      id: "1",
      pname: "Product Design",
      plist: [
        {
          id: 1,
          topic: "Intro. to product design",
        },
        {
          id: 2,
          topic: "Intro. to product design",
        },
        {
          id: 3,
          topic: "Intro. to product design",
        },
        {
          id: 4,
          topic: "Intro. to product design",
        },
        {
          id: 5,
          topic: "Intro. to product design",
        },
        {
          id: 6,
          topic: "Intro. to product design",
        },
      ],
    },
    {
      id: "2",
      pname: "Product Management",
      plist: [
        {
          id: 1,
          topic: "Intro. to product management",
        },
        {
          id: 2,
          topic: "Intro. to product management",
        },
      ],
    },
    {
      id: "3",
      pname: "Data Analytics",
      plist: [
        {
          id: 1,
          topic: "Intro. to data analytics",
        },
        {
          id: 2,
          topic: "Intro. to data analytics",
        },
      ],
    },
    {
      id: "4",
      pname: "Data Analytics",
      plist: [
        {
          id: 1,
          topic: "Intro. to data analytics",
        },
        {
          id: 2,
          topic: "Intro. to data analytics",
        },
      ],
    },
    {
      id: "5",
      pname: "Data Analytics",
      plist: [
        {
          id: 1,
          topic: "Intro. to data analytics",
        },
        {
          id: 2,
          topic: "Intro. to data analytics",
        },
      ],
    },
  ];

  return (
    <div className="w-full">
      {data.map((each) => {
        return (
          <Fragment key={each.id}>
            <div className="grid grid-cols-7 w-full my-4 items-center bg-[#F5F6FA] py-2">
              <p className="w-[0.30rem] h-full rounded-2xl bg-[#F8991D]"></p>
              <h3 className="text-[#F8991D] col-span-5 text-lg font-semibold text-center">
                {each.pname}
              </h3>
            </div>
            <div className="px-4 max-h-52 overflow-y-auto no-scrollbar">
              {each.plist.map((topics) => {
                return (
            
                  <div
                    key={topics.id}
                    className="flex items-center w-full justify-between py-2"
                  >
                    <p className="font-light text-sm w-full truncate">{topics.topic}</p>
                    <div className="flex items-center w-32 gap-[2px] ">
                      <Link href="#" className="">
                        <Image
                          src={cam}
                          alt=""
                          className=""
                        />
                      </Link>
                      <Link href="#">
                        <Image
                          src={article}
                          alt=""
                        />
                      </Link>
                      <Link href="#">
                        <Image
                          src={ask}
                          alt=""
                        />
                      </Link>
                    </div>
                  </div>
                  
                );
              })}
              
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default UserCourse;
