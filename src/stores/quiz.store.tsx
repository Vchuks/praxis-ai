// Perfect balance of power and simplicity
const useQuizStore = create((set) => ({
  currentQuestion: 0,
  answers: {},
  timeRemaining: 3600,
  
  answerQuestion: (questionId, answer) => set((state) => ({
    answers: { ...state.answers, [questionId]: answer }
  })),
  
  nextQuestion: () => set((state) => ({
    currentQuestion: state.currentQuestion + 1
  })),
  
  updateTimer: () => set((state) => ({
    timeRemaining: Math.max(0, state.timeRemaining - 1)
  }))
}))