"use client"
import Image from "next/image";
import vlogo from "../../../../public/assets/vlogo.png";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Quiz from "@/components/quiz";
import { useResultStore } from "@/stores";

const Result = () => {
  const qst = `Hello Praxis Ai
    
    provide me with some video resources regarding introduction to product design`;

  const ans = `Here are some product design video tutorials for beginners from YouTube:

<li><b>How to Create, Design, and Manufacture a Product from Scratch</b> by LaunchBoom (http://www.youtube.com/watch?v=33bm9ssnuuM) - This video provides an overview of the entire product creation process.</li>

<li><b>What EXACTLY is Product Design?</b> 🤔 by Andres The Designer (http://www.youtube.com/watch?v=LckQ4VVjHDs) - This video helps clarify what product design entails.</li>

<li><b>How to become a Product Designer (Product Design Pathways)</b> by Relab Studios (http://www.youtube.com/watch?v=5LYpFQAETkU) - This video discusses different pathways to becoming a product designer.</li>

<li><b>How To Sketch Like A Product Designer</b> by Jimmy Design (http://www.youtube.com/watch?v=iVy0qGqmKFU) - This tutorial focuses on sketching techniques relevant to product design.</li>

<li><b>Day 1 of Learn Fusion 360 in 30 Days for Complete Beginners! - 2023 EDITION</b> by Product Design Online (http://www.youtube.com/watch?v=d3qGQ2utl2A) - If you're interested in 3D modeling, this video is the first in a series for learning Fusion 360.</li>`;

const [quiz, setQuiz] = useState<boolean>(false)
const [question, setQuestion] = useState<string>(qst)
const [answer, setAnswer] = useState<string>(ans)
const {userAnswer} = useResultStore()
console.log(userAnswer)
useEffect(()=>{

  if (!userAnswer){
    return
  }else {
    return setAnswer(userAnswer.response_type)

  }
},[userAnswer])

  return (
    <div className=" md:px-4 py-6 text-sm">
      <pre className="bg-white p-4 px-8 rounded-l-[100px] md:rounded-l-[200px] rounded-br-[50px] md:rounded-br-[200px] w-10/12 lg:w-3/4 text-sm md:text-base">
        {question}
      </pre>
      {!quiz &&<div className="w-full md:w-3/4 py-4 px-4 md:px-8">
        <div className="flex gap-2 pb-5">
          <Image src={vlogo} alt="" className="w-5" />
          <p className="text-sm">Praxis Ai</p>
          <ChevronDownIcon className="w-4" />
        </div>
        <pre dangerouslySetInnerHTML={{ __html: answer }} className="text-sm md:text-base mb-5" />
      </div>}
      {quiz && <Quiz/>}
    </div>
  );
};

export default Result;
