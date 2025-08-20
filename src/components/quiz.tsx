import { useResultStore } from "@/stores";
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Fragment, useCallback, useState } from "react";

type QuizDataObject = {
  question: string;
  options: string[];
  correct_answer_index: string;
};
type QuizDataType = {
  quizData: {

    data: [] | {content: string} | QuizDataObject[] ;
  }
};
const Quiz: React.FC<QuizDataType> = ({ quizData }) => {
  const { userQuestion } = useResultStore();
  // Helper function to check if data is quiz array
  const isQuizDataArray = (data: [] | {content: string;} | QuizDataObject[]): data is QuizDataObject[] => {
    return Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' && 'question' in data[0];
  };

  const quizArray = isQuizDataArray(quizData.data) ? quizData.data : [];
  
  const [pageNum, setPageNum] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  type AnswerStatus = {
    [key: string]: "correct" | "incorrect";
  };

  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>({});
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set()
  );

  const handleAnswer = useCallback(
    (
      selectedOption: string,
      questionId: number,
      optionIndex: number,
      correctAnswer: string
    ) => {
      const statusKey = `${questionId}-${optionIndex}`;
      const isCorrect = optionIndex.toString() === correctAnswer;

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
        newStatus[`${questionId}-${correctAnswer}`] = "correct";
      }
      setAnswerStatus(newStatus);
      setAnsweredQuestions((prev) => new Set([...prev, questionId]));
      if (newStatus[statusKey] === "correct") {
        setScore((num) => num + 1);
      }
    },
    [answerStatus]
  );

  const getButtonStyle = (
    questionId: number,
    optionIndex: number,

    correctAnswer: string,
    hasAnswered: boolean
  ) => {
    const statusKey = `${questionId}-${optionIndex}`;
    const status = answerStatus[statusKey];

    if (status === "correct") {
      return "bg-[#C4EFD1] border-[#296A3F]";
    } else if (status === "incorrect") {
      return "bg-[#EFC4C4] border-[#FE000D]";
    } else if (hasAnswered && optionIndex.toString() === correctAnswer) {
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
          <p className="text-[#296A3F]">That&apos;s right!</p>
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
  
if (!isQuizDataArray(quizData.data)) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white border border-gray-300 rounded-lg p-6 text-center">
          <p className="text-gray-600">
            {typeof quizData.data === 'object' && 'content' in quizData.data
              ? quizData.data.content
              : 'No quiz data available. Please generate questions first.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto ">
      {pageNum !== 10 && (
        <p className="text-sm mb-4">
          Below are {quizArray.length} questions on{" "}
          {userQuestion?.topicName}:
        </p>
      )}
      <div className="border border-[#323232] bg-white px-3 md:px-6 py-4 rounded-t-[13px]">
        <h1 className="text-lg md:text-[20px] font-semibold mb-1">
          {userQuestion?.topicName}
        </h1>
        {pageNum !== 10 && (
          <p className="text-base md:text-[20px]">
            Below are {quizArray.length} questions on{" "}
            {userQuestion?.topicName}:{score}
          </p>
        )}
      </div>

      <div className="space-y-6 border font-semibold border-[#323232] border-t-0 rounded-b-[13px]">
        {quizArray.map((item: QuizDataObject, questionIndex: number) => {
          const hasAnswered = answeredQuestions.has(questionIndex);
          return (
            <Fragment key={`qst-${questionIndex}`}>
              {quizArray.indexOf(item) === pageNum ? (
                <div
                  key={item.question}
                  className="bg-white p-3 md:p-6  shadow-sm rounded-b-[13px]"
                >
                  <h3 className="md:text-lg font-semibold  mb-4">
                    {questionIndex + 1}. {item.question}
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

                              item.correct_answer_index,
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
                                item.correct_answer_index
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
                      className="text-end"
                      onClick={() => {
                        return pageNum <= 10
                          ? setPageNum((num) => num + 1)
                          : null;
                      }}
                    >
                      Next&gt;
                    </p>
                  </div>
                </div>
              ) : null}
            </Fragment>
          );
        })}
      </div>
      {pageNum === 10 ? (
        <p className="font-semibold text-2xl pt-3">
          Total Score: {score}/{quizArray.length}
        </p>
      ) : null}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Answered: {answeredQuestions.size} / {quizArray.length} questions
        </p>
      </div>
    </div>
  );
};

export default Quiz;
