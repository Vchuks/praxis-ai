
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'


export interface CourseType {
  coursename: string;
  course_topics: [] ;
  course_code: number;
}
export interface UserType {

  message: string,
  token: string,
  student_name: string,
  student_email: string,
  student_id_number: string,
  enrolled_courses: CourseType[],

  // id: string
  // name: string
  // email: string
  // role: 'student' | 'instructor' | 'admin'
}

interface AuthState {
  user: UserType | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  login: (email:string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<UserType>) => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,

        login: async (email: string, password: string) => {
          set({ loading: true, error: null });
          
          try {
            const response = await fetch('https://backend.pluralcode.institute/student/praxis_login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
              throw new Error('Login failed');
            }

            const userData = await response.json();
            
            // Check if login was successful based on your API response
            if (userData.token) {
              set({ 
                user: userData, 
                isAuthenticated: true, 
                loading: false,
                error: null 
              });
            } else {
              throw new Error(userData.message || 'Login failed');
            }
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Login failed';
            set({ 
              loading: false, 
              error: errorMessage,
              isAuthenticated: false,
              user: null 
            });
            throw error;
          }
        },


        logout: () => {
          set({ user: null, isAuthenticated: false, error: null })
        },

        updateProfile: (data) => {
          const { user } = get()
          if (user) {
            set({ user: { ...user, ...data } })
          }
        },
        clearError: () => {
            set({ error: null });
          },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ 
          user: state.user, 
          isAuthenticated: state.isAuthenticated 
        })
      }
    ),
    { name: 'auth-store' }
  )
)