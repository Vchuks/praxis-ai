import { create } from "zustand";
import { useAuthStore } from "./auth.store";

export type userMessageType = {
  course_topic: string;
  format: string | null | "";
  topicName: string
};

// type UserQuestionType = {
//   sessionId: string;
//   userMessage: userMessageType[];
// };

export type UserAnswerType = {
  response_type: string;
  data:[] | {content:string, materials: {articles: []}} ;
};

type ResultType = {
  userQuestion: userMessageType | null;
  userAnswer: UserAnswerType | null;
  session_Id: string | null;
  loading: boolean;
  error: string | null;
  getSessionId: () => void;
  setUserQuestion: (data: userMessageType, isCheck: boolean) => Promise<void>;
  setUserAnswer: (data: UserAnswerType) => Promise<void>;
  fetchAnswer: (userQst: userMessageType, isCheck: boolean) => Promise<void>;
};

export const useResultStore = create<ResultType>()((set, get) => ({
  userQuestion: null,
  userAnswer: null,
  session_Id: null,
  loading: false,
  error: null,
  
  getSessionId: () => {
    const { user } = useAuthStore.getState();
    set({
      session_Id: `lms_student_${user?.student_id_number}_course_${user?.enrolled_courses[0].course_code}`,
    });
  },

  setUserQuestion: async (userQst, isCheck) => {
    // Set the question immediately
    set({ 
      userQuestion: userQst, 
      loading: true, 
      error: null,
      userAnswer: null // Clear previous answer
    });

    // Then fetch the answer
    try {
      await get().fetchAnswer(userQst, isCheck);
    } catch (error) {
      // Error is already handled in fetchAnswer
      console.error('Error in setUserQuestion:', error);
    }
  },

  fetchAnswer: async (userQst, isCheck) => {
    const { session_Id } = get();
    const { user } = useAuthStore.getState();
    const getRandom = Math.floor(Math.random() * 5)

    
    if (!session_Id) {
      const error = "Session ID not found";
      set({ loading: false, error });
      throw new Error("Session not available");
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "x-api-key",
      "hrennxbbbbzhyruuio4883jdnm-fhhfnnsmn485hnnmwnfh-ehhssBNDHejjn3"
    );

    try {
      const response = await fetch(
        "https://us-central1-veritas-ai-466810.cloudfunctions.net/slackBotHandler/api/chat",
        {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({
            sessionId: `${session_Id}${getRandom}`,
            userMessage: isCheck ? userQst.topicName: JSON.stringify([userQst]),
            student_email: user?.student_email,
            support_format: userQst.format
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.response_type !== "") {
        set({ 
          userAnswer: data, 
          error: null, 
          loading: false 
        });
      } else {
        throw new Error("No data found in response!");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch answer";
      set({
        loading: false,
        error: errorMessage,
        userAnswer: null,
      });
      throw err;
    }
  },

  setUserAnswer: async (data) => {
    set({ userAnswer: data });
  },
}));