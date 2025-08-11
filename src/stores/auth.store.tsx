import { create } from "zustand";
interface UserType {
  id: string;
  firstname: string;
  lastname: string;
  studentId: string;
  email: string
}

interface AuthState {
  user: UserType | null;
  isAuthenticated: boolean;
  loading: boolean;
  //   login: (email: string, password: string) => Promise<void>
  login: (userd: UserType) => Promise<void>;
  logout: () => void;
  //   updateProfile: (data: Partial<UserType>) => void
}

const initialUser = {
  id: "1",
  firstname: "Mabel",
  lastname: "Praise",
  studentId: "COH3456",
  email: "examchuks@gmail.net"
};

export const useAuthStore = create<AuthState>((set) => ({
    user: { ...initialUser },
//   user: null,
  loading: false,
  isAuthenticated: false,
  login: async (newUser: UserType) => {
    set({ loading: true });
    set({ user: newUser, isAuthenticated: true, loading: false });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));
