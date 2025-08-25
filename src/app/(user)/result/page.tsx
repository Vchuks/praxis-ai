"use client";
import { useEffect, useState, useCallback, useRef, Fragment } from "react";
import { useResultStore } from "@/stores";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import logo from "../../../../public/assets/vlogo.png";
import Link from "next/link";
import Quiz, { QuizDataObject } from "@/components/quiz";

// Enhanced type definitions
export interface ResponseItem {
  title: string;
  snippet: string;
  link: string;
}

interface ContentData {
  content: string;
}

interface QuizQuestion {
  id?: string;
  question_text: string;
  options?: string[];
  correct_answer?: string;
  type?: string;
  articles:ResponseItem[]
}

interface QuizData {
  topic: string;
  questions: QuizQuestion[];
}

// Define FAQ types properly
type FaqT = {
  question: string;
  answer: string;
};

interface FaqData {
  faqs: FaqT[];
}

// Update UserAnswer to include all possible data types properly
interface UserAnswer {
  data: ResponseItem[] | ContentData | QuizData | FaqData | string | [];
  response_type: string;
  question?: string;
}
// interface UserQuestion {
//   course_topic: string;
//   topicName?: string;
//   format?: string;
// }

interface ConversationEntry {
  id: string;
  question: string;
  answer: UserAnswer;
  timestamp: number;
  format: string | null;
}

// Utility functions
const isResponseItemArray = (
  data: ResponseItem[] | ContentData | QuizData | FaqData | string | []
): data is ResponseItem[] => {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    typeof data[0] === "object" &&
    "title" in data[0] &&
    "snippet" in data[0] &&
    "link" in data[0]
  );
};

const isContentData = (
  data: ResponseItem[] | ContentData | QuizData | FaqData | string | []
): data is ContentData => {
  return typeof data === "object" && data !== null && "content" in data;
};

const isQuizData = (
  data: ResponseItem[] | ContentData | QuizData | FaqData | string | []
): data is QuizData => {
  return (
    typeof data === "object" &&
    data !== null &&
    "topic" in data &&
    "questions" in data &&
    Array.isArray((data as QuizData).questions)
  );
};

const isFaqData = (
  data: ResponseItem[] | ContentData | QuizData | FaqData | string | []
): data is FaqData => {
  return (
    typeof data === "object" &&
    data !== null &&
    "faqs" in data &&
    Array.isArray((data as FaqData).faqs)
  );
};

// Updated Quiz Content Component with proper type checking
const QuizContent = ({ userAnswer }: { userAnswer: UserAnswer }) => {
  if (!isQuizData(userAnswer.data)) {
    return (
      <div className="py-4 w-full lg:w-[45rem] px-2 md:px-4 mt-4">
        <div className="bg-red-100 p-4 rounded-lg">
          <p className="text-red-600">Invalid quiz data format</p>
        </div>
      </div>
    );
  }

  const quizData = userAnswer.data as { 
    topic: string; 
    questions: [] | { content: string; } | QuizDataObject[] 
  };
  
  return (
    <div className="py-4 w-full lg:w-[45rem] px-2 md:px-4 mt-4">
      <Quiz quizData={quizData} />
    </div>
  );
};

// Updated FAQ rendering section
const renderFaqContent = (entry: ConversationEntry, subTID: string | null, handleFaqDropdown: (id: string) => void) => {
  if (!isFaqData(entry.answer.data)) {
    return (
      <div className=" p-4 rounded-lg">
        <p className="text-red-600">Invalid FAQ data format</p>
      </div>
    );
  }

  return (
    <div>
      {entry.answer.data.faqs.map((each: FaqT, index: number) => (
        <Fragment key={`faq-${index}-${each.question}`}>
          <div>
            <p 
              className="font-semibold text-lg p-4 shadow-sm cursor-pointer hover:bg-gray-50" 
              onClick={() => handleFaqDropdown(each.answer)}
            >
              {each.question}
            </p>
          </div>
          {subTID === each.answer && (
            <div className="shadow-md rounded-b-md">
            <p className="px-4 py-6 w-full lg:w-[45rem] leading-relaxed text-base mb-3">
              {each.answer}
            </p>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

const extractYouTubeVideoId = (
  url: string
): { embedUrl: string; isValid: boolean } => {
  try {
    const parts = url.split("watch?v=");
    if (parts.length === 2 && parts[1]) {
      return {
        embedUrl: `${parts[0]}/embed/${parts[1]}`,
        isValid: true,
      };
    }
  } catch (error) {
    console.error("Error extracting YouTube video ID:", error);
  }
  return { embedUrl: "", isValid: false };
};

// Component for rendering video content
const VideoContent = ({
  items,
  topicName,
}: {
  items: ResponseItem[];
  topicName: string;
}) => (
  <div className="py-4 w-full lg:w-[45rem] px-2 md:px-4 mt-4">
    <div className="bg-white p-4 rounded-t-xl mb-2">
      <h2 className="text-xl font-semibold">{topicName}</h2>
    </div>
    <div className="bg-white">
      {items.map((item, index) => {
        const { embedUrl, isValid } = extractYouTubeVideoId(item.link);

        return (
          <div
            key={`video-${index}`}
            className="w-full mb-4 bg-white rounded-lg overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row gap-4 bg-white">
              <div className="rounded-tl-3xl  p-3 flex-shrink-0">
                {isValid ? (
                  <iframe
                    width="260"
                    height="180"
                    src={embedUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="object-contain m-auto rounded-ss-2xl rounded-ee-2xl"
                    title={`Video: ${item.title}`}
                    aria-label={`Educational video about ${item.title}`}
                  />
                ) : (
                  <div className="w-[260px] h-[180px] bg-gray-200 p-3 rounded-ss-2xl rounded-ee-2xl flex items-center justify-center">
                    <p className="text-gray-500 text-sm">Video unavailable</p>
                  </div>
                )}
              </div>
              <div className="w-full lg:w-2/4 flex flex-col justify-between p-3">
                <h3
                  className="text-base md:text-lg font-semibold mb-2"
                  role="heading"
                  aria-level={3}
                >
                  {item.title}
                  <p className="text-xs font-light">Youtube</p>
                </h3>
                <p className="text-sm h-16 snipbox text-gray-700 leading-relaxed">
                  {item.snippet}
                </p>
              </div>
            </div>
            <div></div>
          </div>
        );
      })}
    </div>
  </div>
);

// Component for rendering article content
const ArticleContent = ({
  items,
  question,
}: {
  items: ResponseItem[];
  question: string;
}) => (
  <div className="py-4 w-full lg:w-[45rem] px-2 md:px-4 mt-4">
    <div className="bg-white p-4 rounded-t-xl mb-2">
      <h2 className="text-xl font-semibold">{question}</h2>
    </div>
    <div className="pl-6 pr-4 lg:pl-16 rounded-lg mt-4">
      {items.map((item, index) => (
        <div key={`article-${index}`} className="">
          <div className="py-3">
            <ul className="list-disc">
              <li className="font-bold">{item.title}</li>
              <span>
                <Link
                  href={item.link}
                  className="hover:text-blue-900 pr-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read article: ${item.title}`}
                >
                  ({item.link})
                </Link>
              </span>
              <span>- {item.snippet}</span>
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);


// Component for rendering general content
const GeneralContent = ({
  data,
  topicName,
}: {
  data: ContentData | string;
  topicName: string;
}) => (
  <div className="prose max-w-none bg-white rounded-lg p-6">
    <h2 className="text-xl font-bold mb-4">{topicName}</h2>
    {isContentData(data) ? (
      <p className="leading-relaxed text-gray-800">{data.content}</p>
    ) : (
      <p className="text-gray-700 leading-relaxed">
        {typeof data === "string" ? data : JSON.stringify(data, null, 2)}
      </p>
    )}
  </div>
);

// Component for rendering a single conversation entry
const ConversationEntry = ({
  entry,
  isLatest,
}: {
  entry: ConversationEntry;
  isLatest: boolean;
}) => {
  const topicName = entry.question;
  console.log(entry);
  const [subTID, setSubTID] = useState<string | null>(null);
  const handleFaqDropdown = useCallback(
    (id: string) => {
      setSubTID(subTID === id ? null : id);
    },
    [subTID]
  );
  return (
    <div className={`conversation-entry ${isLatest ? "mb-8" : "mb-12"}`}>
      {/* Question Display */}
      <section
        className="bg-white w-11/12 lg:w-3/4 ml-auto rounded-l-[100px] md:rounded-l-[200px] rounded-br-[100px] md:rounded-br-[200px] p-4 mb-4"
        aria-labelledby={`question-${entry.id}`}
      >
        <h2
          id={`question-${entry.id}`}
          className="text-sm mb-2 leading-loose pl-4 pt-3"
        >
          {entry.question}
        </h2>
      </section>

      {/* Praxis Header */}
      <div className="flex gap-4 mb-4 items-center">
        <Image src={logo} alt="Praxis logo" className="w-6" />
        <span className="font-medium">Praxis</span>
        <ChevronDownIcon className="w-4" aria-hidden="true" />
      </div>

      {/* Answer Content */}
      <div className="w-full rounded-lg text-sm">
        {entry.format === "video" && isResponseItemArray(entry.answer.data) && (
          <VideoContent items={entry.answer.data} topicName={topicName} />
        )}

        {entry.format === "article" &&
          isResponseItemArray(entry.answer.data) && (
            <ArticleContent
              items={entry.answer.data}
              question={entry.question}
            />
          )}

        {entry.format === "quiz" && <QuizContent userAnswer={entry.answer} />}

        {entry.format === "content" && (isContentData(entry.answer.data) || typeof entry.answer.data === "string") && (
          <GeneralContent
            data={entry.answer.data as ContentData | string}
            topicName={topicName}
          />
        )}

        {entry.format === "faq" && (
          renderFaqContent(entry, subTID, handleFaqDropdown)
        )}
      </div>
    </div>
  );
};

// Loading indicator for new content
const LoadingIndicator = () => (
  <div className="flex items-center justify-start gap-4 py-2">
    <Image src={logo} alt="Praxis logo" className="w-6" />
    <span className="font-medium">Praxis</span>
    <div className="flex gap-1">
      <div className="w-2 h-2 bg-[#F8991D] rounded-full animate-bounce" />
      <div
        className="w-2 h-2 bg-[#F8991D] rounded-full animate-bounce"
        style={{ animationDelay: "0.1s" }}
      />
      <div
        className="w-2 h-2 bg-[#F8991D] rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      />
    </div>
    <span className="text-gray-600 text-sm">Thinking...</span>
  </div>
);

// Error component
const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
    <div className="text-red-600 text-center">
      <h2 className="text-xl font-semibold mb-2">Oops! Something went wrong</h2>
      <p className="text-gray-600 mb-4">
        We encountered an error while loading your content.
      </p>
    </div>
    <button
      onClick={onRetry}
      className="px-6 py-2 bg-[#F8991D] text-white rounded-lg hover:bg-[#e8821a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F8991D] focus:ring-opacity-50"
      aria-label="Retry loading content"
    >
      Try Again
    </button>
  </div>
);

// No content component
const NoContentState = ({ onSelectTopic }: { onSelectTopic: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
    <p className="text-gray-600">No question selected</p>
    <button
      onClick={onSelectTopic}
      className="px-6 py-2 bg-[#F8991D] text-white rounded-lg hover:bg-[#e8821a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F8991D] focus:ring-opacity-50"
      aria-label="Select a topic to get started"
    >
      Select a Topic
    </button>
  </div>
);

// Main component
const ResultPage = () => {
  const { userQuestion, userAnswer, loading, error } = useResultStore();
  const [conversationHistory, setConversationHistory] = useState<
    ConversationEntry[]
  >([]);
  const router = useRouter();

  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Improved scroll to bottom function
  const scrollToBottom = useCallback(() => {
    if (bottomRef.current) {
      // Clear any existing timeout

      // Use multiple approaches to ensure reliable scrolling
      const scrollElement = bottomRef.current;

      // Method 1: Direct scrollIntoView
      scrollElement.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });

      // Method 2: Backup scroll after a delay to handle dynamic content
      scrollTimeoutRef.current = setTimeout(() => {
        scrollElement.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }, 100);
    }
  }, []);

  // Load conversation history from sessionStorage on component mount
  useEffect(() => {
    const savedHistory = JSON.parse(
      sessionStorage.getItem("conversationHistory") || "[]"
    );
    setConversationHistory(savedHistory);

    // Scroll to bottom after loading history
    if (savedHistory.length > 0) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        scrollToBottom();
      });
    }
  }, [scrollToBottom]);

  // Save conversation history to sessionStorage whenever it changes
  useEffect(() => {
    if (conversationHistory.length > 0) {
      sessionStorage.setItem(
        "conversationHistory",
        JSON.stringify(conversationHistory)
      );
    }
  }, [conversationHistory]);

  // Generate unique ID for each conversation entry
  const generateId = useCallback(() => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Add new conversation entry when answer arrives and scroll to bottom
  useEffect(() => {
    if (userAnswer && userQuestion?.course_topic) {
      const newEntry: ConversationEntry = {
        id: generateId(),
        question: userQuestion.course_topic,
        answer: userAnswer,
        format: userQuestion.format,
        timestamp: Date.now(),
      };

      setConversationHistory((prev) => {
        // Check if this exact question-answer pair already exists
        const exists = prev.some(
          (entry) =>
            entry.question === newEntry.question &&
            JSON.stringify(entry.answer) === JSON.stringify(newEntry.answer)
        );

        if (!exists) {
          // Keep only last 20 conversations to avoid excessive storage
          const updated = [...prev, newEntry];
          return updated.slice(-20);
        }
        return prev;
      });

      // Scroll to bottom after new entry is added
      // Use multiple timeouts to handle different rendering scenarios
      setTimeout(() => scrollToBottom(), 100);
      setTimeout(() => scrollToBottom(), 300);
      setTimeout(() => scrollToBottom(), 600);
    }
  }, [
    userAnswer,
    userQuestion?.course_topic,
    userQuestion?.format,
    generateId,
    scrollToBottom,
  ]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);
  // Event handlers
  const handleRetry = () => {
    window.location.reload();
  };

  const handleSelectTopic = () => {
    router.push("/welcome");
  };

  // Render error state
  if (error) {
    return <ErrorState onRetry={handleRetry} />;
  }

  // Render no content state (only if no history exists)
  if (!userQuestion && conversationHistory.length === 0) {
    return <NoContentState onSelectTopic={handleSelectTopic} />;
  }

  // Render main content
  return (
    <main
      className="max-w-4xl  mx-auto px-2 lg:px-0 py-6 space-y-6"
      role="main"
    >
      {/* Render conversation history */}
      {conversationHistory.map((entry, index) => (
        <ConversationEntry
          key={entry.id}
          entry={entry}
          isLatest={index === conversationHistory.length - 1}
        />
      ))}

      {/* Show loading indicator for new questions */}
      {loading && userQuestion && (
        <div className="border-t">
          {/* Show the pending question */}
          <section
            className="bg-gray-100 w-11/12 lg:w-3/4 ml-auto rounded-l-[100px] md:rounded-l-[200px] rounded-br-[100px] md:rounded-br-[200px] px-4  opacity-70"
            aria-labelledby="pending-question"
          >
            <h2
              id="pending-question"
              className="text-sm leading-loose pl-4 pt-3"
            >
              {userQuestion.course_topic}
            </h2>
          </section>

          {/* Loading indicator */}
          <LoadingIndicator />
        </div>
      )}

      {/* Show message if no history and waiting for first answer */}
      {conversationHistory.length === 0 && !loading && userQuestion && (
        <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F8991D]" />
          <p className="text-gray-600">Processing your question...</p>
          <p className="text-sm text-gray-500 text-center max-w-md">
            Topic: {userQuestion.course_topic}
          </p>
        </div>
      )}
      {/* Invisible element to scroll to - positioned at the bottom */}
      <div ref={bottomRef} className="h-4" />
    </main>
  );
};

export default ResultPage;
