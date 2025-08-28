
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Fragment, useCallback, useMemo, useState } from "react";
import CircularScoreProgress from "./scoreProgress";
import { ResponseItem } from "@/app/(user)/result/page";
import { useResultStore, useSmallNavStore } from "@/stores";

export type QuizDataObject = {
  question_text: string;
  options: string[];
  correct_answer: string;
  articles: ResponseItem[]
};
export type QuizDataType = {
  quizData: {
    topic:string,
    questions: [] | { content: string } | QuizDataObject[];
  };
};

type FailedType = {
  qst: number;
  question: string;
  ans: string;
  userAnswer?: string;
  link: string
};

const Quiz: React.FC<QuizDataType> = ({ quizData }) => {
  // const { userQuestion } = useResultStore();

  // Helper function to check if data is quiz array
  const isQuizDataArray = (
    questions: [] | { content: string } | QuizDataObject[]
  ): questions is QuizDataObject[] => {
    return (
      Array.isArray(questions) &&
      questions.length > 0 &&
      typeof questions[0] === "object" &&
      "question_text" in questions[0]
    );
  };
  const quizArray = useMemo(()=>{

    return isQuizDataArray(quizData.questions)
    ? quizData.questions
    : [];
  },[quizData.questions])
    
  const [pageNum, setPageNum] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const {setUserQuestion} = useResultStore()
  const {setShowNav} = useSmallNavStore()

  type AnswerStatus = {
    [key: string]: "correct" | "incorrect";
  };

  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>({});
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set()
  );
  const [failedQst, setFailedQst] = useState<FailedType[]>([]);

  
  const getSolution = useCallback(
    async (topicName: string, isSearch: boolean) => {

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

        setShowNav(false);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(
            `Something went wrong. Please try again. ${error.message}`
          );
        }
      }
    },
    [setUserQuestion, setShowNav]
  );

  const handleAnswer = useCallback(
    (
      selectedOption: string,
      questionId: number,
      optionIndex: number,
      correctAnswer: string,
      eachLink: string
    ) => {
      const statusKey = `${questionId}-${optionIndex}`;
      const isCorrect = selectedOption === correctAnswer;

      // Clear previous answers for this question
      const newStatus = { ...answerStatus };
      Object.keys(newStatus).forEach((key) => {
        if (key.startsWith(`${questionId}-`)) {
          delete newStatus[key];
        }
      });

      // Set the status for the selected answer
      newStatus[statusKey] = isCorrect ? "correct" : "incorrect";

      // If incorrect, also highlight the correct answer
      if (!isCorrect) {
        const correctOptionIndex = quizArray[questionId].options.findIndex(
          (option) => option === correctAnswer
        );
        if (correctOptionIndex !== -1) {
          newStatus[`${questionId}-${correctOptionIndex}`] = "correct";
        }

        // Add to failed questions
        setFailedQst((prev) => {
          const existingIndex = prev.findIndex(
            (item) => item.qst === questionId
          );
          const failedItem: FailedType = {
            qst: questionId,
            question: quizArray[questionId].question_text,
            ans: correctAnswer,
            userAnswer: selectedOption,
            link: eachLink
          };

          if (existingIndex !== -1) {
            // Update existing failed question
            const updated = [...prev];
            updated[existingIndex] = failedItem;
            return updated;
          } else {
            // Add new failed question
            return [...prev, failedItem];
          }
        });
      } else {
        // Remove from failed questions if answered correctly
        setFailedQst((prev) => prev.filter((item) => item.qst !== questionId));
      }

      setAnswerStatus(newStatus);
      setAnsweredQuestions((prev) => new Set([...prev, questionId]));

      // Only increase score if correct and question wasn't already answered correctly
      if (isCorrect && !answeredQuestions.has(questionId)) {
        setScore((num) => num + 1);
      }
    },
    [answerStatus, answeredQuestions, quizArray]
  );

  const getButtonStyle = (
    questionId: number,
    optionIndex: number,
    option: string,
    correctAnswer: string,
    hasAnswered: boolean
  ) => {
    const statusKey = `${questionId}-${optionIndex}`;
    const status = answerStatus[statusKey];

    if (status === "correct") {
      return "bg-[#C4EFD1] border-[#296A3F]";
    } else if (status === "incorrect") {
      return "bg-[#EFC4C4] border-[#FE000D]";
    } else if (hasAnswered && option === correctAnswer) {
      return "bg-[#C4EFD1] border-[#296A3F]";
    } else {
      return "bg-[#F5F6FA] border-[#E5E7EB] hover:bg-[#F0F1F5]";
    }
  };

  const renderFeedback = (questionId: number, optionIndex: number) => {
    const statusKey = `${questionId}-${optionIndex}`;
    const status = answerStatus[statusKey];

    if (status === "correct") {
      return (
        <div className="font-extrabold text-sm flex gap-2 mt-2">
          <CheckIcon className="w-5 text-[#296A3F]" />
          <p className="text-[#296A3F]">Correct answer!</p>
        </div>
      );
    } else if (status === "incorrect") {
      return (
        <div className="font-extrabold text-sm flex gap-2 mt-2">
          <XMarkIcon className="w-5 text-[#FE000D]" />
          <p className="text-[#FE000D]">Not quite</p>
        </div>
      );
    }

    return null;
  };

  if (!isQuizDataArray(quizData.questions)) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white border border-gray-300 rounded-lg p-6 text-center">
          <p className="text-gray-600">
            {typeof quizData.questions === "object" &&
            "content" in quizData.questions
              ? quizData.questions.content
              : "No quiz data available. Please generate questions first."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto ">
      {pageNum !== 10 && (
        <p className="text-sm mb-4">
          Below are {quizArray.length} questions:
        </p>
      )}
      <div className="border border-[#323232] bg-white px-3 md:px-6 py-4 rounded-t-[13px]">
        {pageNum !== 10 ? (
          <h1 className="text-lg md:text-[20px] font-semibold mb-1">
            {quizData?.topic}
          </h1>
        ) : (
          <p className="text-sm md:text-lg font-[900]">
            Result:{" "}
            <span className="font-semibold">{quizData.topic}</span>
          </p>
        )}
        {pageNum !== 10 ? (
          <p className="text-base md:text-[20px]">
            Below are {quizArray.length} questions on {quizData.topic}:
            
          </p>
        ) : (
          <p className="text-sm md:text-lg pt-3">Here is your result below:</p>
        )}
      </div>

      <div className="space-y-6 border font-semibold border-[#323232] border-t-0 rounded-b-[13px]">
        {quizArray.map((item: QuizDataObject, questionIndex: number) => {
          const hasAnswered = answeredQuestions.has(questionIndex);
          return (
            <Fragment key={`qst-${questionIndex}`}>
              {quizArray.indexOf(item) === pageNum ? (
                <div
                  key={item.question_text}
                  className="bg-white p-3 md:p-6  shadow-sm rounded-b-[13px]"
                >
                  <h3 className="md:text-lg font-semibold  mb-4">
                    {questionIndex + 1}. {item.question_text}
                  </h3>

                  <div className="space-y-3">
                    {item.options.map((option, optionIndex) => {
                      const letters = "ABCDEF";
                      const letter = letters.charAt(
                        optionIndex < letters.length ? optionIndex : 0
                      );

                      return (
                        <div key={optionIndex}>
                          <button
                            className={`w-full rounded-lg p-3 md:p-4 text-left transition-all duration-200  ${getButtonStyle(
                              questionIndex,
                              optionIndex,
                              option,
                              item.correct_answer,
                              hasAnswered
                            )} ${
                              hasAnswered ? "cursor-default" : "cursor-pointer"
                            }`}
                            onClick={() =>
                              !hasAnswered &&
                              handleAnswer(
                                option,
                                questionIndex,
                                optionIndex,
                                item.correct_answer,
                                item.articles[0].link
                              )
                            }
                            disabled={hasAnswered}
                          >
                            <div className="flex items-center gap-3 ">
                              <span className="font-semibold mt-0.5">
                                {letter}.
                              </span>
                              <span className="text-gray-800">{option}</span>
                            </div>
                            {renderFeedback(questionIndex, optionIndex)}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <div className="pt-4 w-fit flex font-semibold ml-auto cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-[#222057] to-[#F8991D] pl-4 ">
                    <p
                      className="text-end h-8"
                      onClick={() => {
                        return pageNum <= 10
                          ? setPageNum((num) => num + 1)
                          : null;
                      }}
                    >
                      { hasAnswered ? pageNum === quizArray.length - 1 ? (
                        "View Results"
                      ) :(
                        <span>Next&gt;</span>
                      ) : null}
                    </p>
                  </div>
                </div>
              ) : null}
            </Fragment>
          );
        })}
      </div>
      {pageNum === 10 ? (
        <div className="pt-5 px-4">
          <p className="border-b pt-2 font-bold">Summary</p>
          <div className=" pt-6 flex w-4/5 lg:w-3/5 m-auto items-center">
            <div className="flex w-full gap-6">
              <p>Points</p>
              <p className="font-bold">
                {score}/{quizArray.length}
              </p>
            </div>
            <CircularScoreProgress score={score} color="#008000" size={100} maxScore={10} />
          </div>
          <div className="pt-4 md:pt-10">
            <p className="font-bold">Answers</p>
            <div className="py-2 border-b flex gap-5 pl-10">
              <p>
                Correct{" "}
                <span className="bg-[#E5E6EA] font-bold rounded-full px-[6px] ml-2">
                  {score}
                </span>
              </p>
              <p>
                Incorrect
                <span className="bg-[#E5E6EA] font-bold rounded-full px-[6px] ml-2">
                  {quizArray.length - score}
                </span>
              </p>
            </div>
          </div>
        </div>
      ) : null}
      {failedQst.length > 0 && pageNum >= 10 && (
        <div className="pt-4">
          {failedQst.map((each, optionIndex) => {
            

            return (
              <div
                key={optionIndex}
                className="bg-white p-3 md:p-6  shadow-sm rounded-b-[13px] my-2"
              >
                <p className="md:text-lg font-semibold">{each.question}</p>
                <button
                  className={`w-full rounded-lg p-3 md:p-4 text-left transition-all duration-200 flex gap-4 border bg-[#EFC4C4] border-[#FE000D] my-3 `}
                >
                  <XMarkIcon className="w-5 text-[#FE000D]" />
                  <div className={`flex items-center gap-3 py-2`}>
                    <span className=" text-sm md:text-base">{each.userAnswer}</span>
                  </div>
                  {/* {renderFeedback(each.qst, optionIndex)} */}
                </button>
                <button
                  className={`w-full rounded-lg p-3 md:p-4 text-left transition-all duration-200 flex gap-4 bg-[#C4EFD1] border-[#296A3F] my-3`}
                >
                  <CheckIcon className="w-5 text-[#296A3F]" />

                  <div className="flex items-center gap-3 py-2 ">
                    <span className=" text-sm md:text-base">{each.ans}</span>
                  </div>
                  {/* {renderFeedback(each.qst, optionIndex)} */}
                </button>

                <div className="text-xs md:text-sm py-4 font-semibold flex items-center justify-between">
                  <p className="w-full">
                    You tried, would you like to study more on the topic?
                  </p>
                  <div className="bg-gradient-to-r w-36 md:w-44 from-[#222057] to-[#F8991D] p-[2px] rounded-[30px]">
                    <div className="bg-white w-full text-center h-7 md:h-9 flex justify-center items-center rounded-[30px] gap-5">
                      <p className="bg-clip-text text-transparent bg-gradient-to-r from-[#222057] to-[#F8991D] font-semibold text-xs md:text-sm " onClick={() => getSolution(each.question, true)}>
                        Study More
                      </p>
                      
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Answered: {answeredQuestions.size} / {quizArray.length} questions
        </p>
      </div>
    </div>
  );
};

export default Quiz;
