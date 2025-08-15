import { create } from "zustand";
import { useAuthStore } from "./auth.store";

type userMessageType = {
    course_topic: string
    format: string
}

type UserQuestionType = {
    sessionId: string;
    userMessage: userMessageType[]
}

type UserAnswerType = {
response_type: string;
data: {
    content: string
} | []
}

type ResultType = {
    userQuestion: UserQuestionType | null;
    userAnswer: UserAnswerType | null;
    session_Id: string | null;
    loading: boolean;
    error: string | null;
    getSessionId: () => void;
    setUserQuestion: (data: userMessageType) => Promise<void>;
    setUserAnswer: (data:UserAnswerType) => Promise<void>
}
export const useResultStore = create<ResultType>()((set, get)=>({
    userQuestion: {
        sessionId: "",
        userMessage: []
    },
    userAnswer: {
        response_type: "",
        data: {
            content: ""
        }
    },
    session_Id : null,
    loading: false,
    error: null,
    getSessionId: () => {
        const {user} = useAuthStore.getState() 
        set({session_Id: `lms_student_${user?.student_id_number}_course_${user?.enrolled_courses[0].course_code}`})},

    setUserQuestion: async(userQst) => {
        const {session_Id} = get()
        set({
            loading: false, error: null
        })
        try{
            const response = await fetch("https://us-central1-veritas-ai-466810.cloudfunctions.net/slackBotHandler/api/chat", {
                method: "POST",
                headers: {
                    "X-API-Key": "hrennxbbbbzhyruuio4883jdnm-fhhfnnsmn485hnnmwnfh-ehhssBNDHejjn3",
                    
                },
                
                body: JSON.stringify({
                    sessionId: session_Id,
                    userMessage: [userQst]
                })
            })
            const data = await response.json()
            set({userAnswer: data})
            
            
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Not fetched"
            set({ 
              loading: false, 
              error: errorMessage,
              userAnswer: null 
            });
            throw err
        }
    },
    setUserAnswer: async(data) => {
        set({userAnswer: data})
    },

}))