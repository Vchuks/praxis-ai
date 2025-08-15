import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useCallback, useMemo, useState } from "react";

const Quiz = () => {
  const data = useMemo(() => {
return [
    {
      id: "1",
      question: "What can you eat?",
      answer: [
        {
          id: 1,
          option: "water",
        },
        {
          id: 2,
          option: "food",
        },
      ],
      correctAns: "food",
    },
    {
      id: "2",
      question: "What is the primary goal of UX design?",
      answer: [
        {
          id: 1,
          option: "Make websites look pretty",
        },
        {
          id: 2,
          option: "Create user-friendly experiences",
        },
        {
          id: 3,
          option: "Increase server performance",
        },
      ],
      correctAns: "Create user-friendly experiences",
    },
    {
      id: "3",
      question: "What does 'wireframe' mean in UX design?",
      answer: [
        {
          id: 1,
          option: "A basic structural blueprint of a page",
        },
        {
          id: 2,
          option: "A type of cable",
        },
        {
          id: 3,
          option: "A design tool",
        },
      ],
      correctAns: "A basic structural blueprint of a page",
    },
  ]
  }, []) 
    

  type AnswerStatus = {
    [key: string]: 'correct' | 'incorrect';
  };

  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>({});
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());

  const handleAnswer = useCallback(
    (
      selectedOption: { id: number; option: string },
      questionId: string,
      optionIndex: number,
      correctAnswer: string
    ) => {
      const statusKey = `${questionId}-${optionIndex}`;
      const isCorrect = selectedOption.option === correctAnswer;
      
      // Clear previous answers for this question
      const newStatus = { ...answerStatus };
      Object.keys(newStatus).forEach(key => {
        if (key.startsWith(`${questionId}-`)) {
          delete newStatus[key];
        }
      });
      
      // Set the status for the selected answer
      newStatus[statusKey] = isCorrect ? 'correct' : 'incorrect';
      
      // If incorrect, also highlight the correct answer
      if (!isCorrect) {
        const question = data?.find(q => q.id === questionId);
        if (question) {
          const correctIndex = question.answer.findIndex(ans => ans.option === correctAnswer);
          if (correctIndex !== -1) {
            newStatus[`${questionId}-${correctIndex}`] = 'correct';
          }
        }
      }
      
      setAnswerStatus(newStatus);
      setAnsweredQuestions(prev => new Set([...prev, questionId]));
    },
    [answerStatus, data]
  );

  const getButtonStyle = (questionId: string, optionIndex: number, option: string, correctAnswer: string, hasAnswered: boolean) => {
    const statusKey = `${questionId}-${optionIndex}`;
    const status = answerStatus[statusKey];
    
    if (status === 'correct') {
      return 'bg-[#C4EFD1] border-[#296A3F]';
    } else if (status === 'incorrect') {
      return 'bg-[#EFC4C4] border-[#FE000D]';
    } else if (hasAnswered && option === correctAnswer) {
      return 'bg-[#C4EFD1] border-[#296A3F]';
    } else {
      return 'bg-[#F5F6FA] border-[#E5E7EB] hover:bg-[#F0F1F5]';
    }
  };

  const renderFeedback = (questionId: string, optionIndex: number) => {
    const statusKey = `${questionId}-${optionIndex}`;
    const status = answerStatus[statusKey];
    
    if (status === 'correct') {
      return (
        <div className="font-extrabold text-sm flex gap-2 mt-2">
          <CheckIcon className="w-5 text-[#296A3F]" />
          <p className="text-[#296A3F]">That&apos;s right!</p>
        </div>
      );
    } else if (status === 'incorrect') {
      return (
        <div className="font-extrabold text-sm flex gap-2 mt-2">
          <XMarkIcon className="w-5 text-[#FE000D]" />
          <p className="text-[#FE000D]">Not quite</p>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Beginner User Experience (UX) Quiz
        </h1>
        <p className="text-gray-600">
          Below are {data.length} questions on User Experience (UX) Design:
        </p>
      </div>
      
      <div className="space-y-6">
        {data.map((item, questionIndex) => {
          const hasAnswered = answeredQuestions.has(item.id);
          
          return (
            <div key={item.id} className="bg-white p-6 rounded-lg border border-gray-300 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {questionIndex + 1}. {item.question}
              </h3>
              
              <div className="space-y-3">
                {item.answer.map((option, optionIndex) => {
                  const letters = "ABCDEF";
                  const letter = letters.charAt(optionIndex < letters.length ? optionIndex : 0);
                  
                  return (
                    <div key={option.id}>
                      <button
                        className={`w-full rounded-lg p-4 border-2 text-left transition-all duration-200 ${
                          getButtonStyle(item.id, optionIndex, option.option, item.correctAns, hasAnswered)
                        } ${hasAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                        onClick={() => !hasAnswered && handleAnswer(option, item.id, optionIndex, item.correctAns)}
                        disabled={hasAnswered}
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-semibold text-gray-700 mt-0.5">
                            {letter}.
                          </span>
                          <span className="text-gray-800">
                            {option.option}
                          </span>
                        </div>
                        {renderFeedback(item.id, optionIndex)}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Answered: {answeredQuestions.size} / {data.length} questions
        </p>
      </div>
    </div>
  );
};

export default Quiz;