import { create } from "zustand";
import { CourseType, UserType } from "./auth.store";

export const useCourseStore = create<{
  userCourses: CourseType[];
  loading: boolean;
  error: string | null;
  fetchUserCourses: (user: UserType) => Promise<void>;
  clearCourses: () => void;
  
}>((set) => ({
  userCourses: [],
  loading: false,
  error: null,

  fetchUserCourses: async (user: UserType) => {
    set({ loading: true });
    try {
      let courses: CourseType[] = [];

      if (user.enrolled_courses) {
        courses = user.enrolled_courses;
      }

      set({ userCourses: courses });
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      set({ loading: false });
    }
  },
  clearCourses: () => {
    set({ userCourses: [], error: null });
  },

  // addCourse: (course: CourseType) => {
  //   set(state => ({
  //     userCourses: [...state.userCourses, course],
  //     error: null
  //   }));
  // },

  // removeCourse: (courseId: string) => {
  //   set(state => ({
  //     userCourses: state.userCourses.filter(course => course.id !== courseId),
  //     error: null
  //   }));
  // },

  // updateCourseProgress: (courseId: string, progress: number) => {
  //   set(state => ({
  //     userCourses: state.userCourses.map(course =>
  //       course.id === courseId 
  //         ? { 
  //             ...course, 
  //             progress: Math.min(100, Math.max(0, progress)),
  //             status: progress >= 100 ? 'completed' : 'active'
  //           }
  //         : course
  //     ),
  //     error: null
  //   }));
  // },

  // updateCourseStatus: (courseId: string, status: 'active' | 'completed' | 'paused') => {
  //   set(state => ({
  //     userCourses: state.userCourses.map(course =>
  //       course.id === courseId ? { ...course, status } : course
  //     ),
  //     error: null
  //   }));
  // },
}));
