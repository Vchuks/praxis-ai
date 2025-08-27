"use client";
import Header from "@/components/header";
import SearchBox from "@/components/searchBox";
import Sidebar from "@/components/sidebar";
import { useAuthStore, useCourseStore, useResultStore } from "@/stores";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { fetchUserCourses, clearCourses } = useCourseStore();
  const { getSessionId } = useResultStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  interface LoadingSpinnerProps {
    message?: string;
  }

  const LoadingSpinner = useCallback(
    ({ message = "Loading..." }: LoadingSpinnerProps) => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    );
  },[])
  

  // Handle authentication and data fetching
  useEffect(() => {
    const initializeLayout = async () => {
      try {
        setError(null);

        if (user && isAuthenticated) {
          // Fetch user data in parallel
          await Promise.all([fetchUserCourses(user), getSessionId()]);
        } else {
          // Clear courses when user logs out
          clearCourses();
          return; // Early return to prevent setting loading to false
        }
      } catch (error) {
        console.error("Error initializing layout:", error);
        setError("Failed to load user data. Please try refreshing the page.");
        // Still allow the layout to render even if data fetching fails
      } finally {
        setIsLoading(false);
      }
    };

    initializeLayout();
  }, [
    user,
    isAuthenticated,
    fetchUserCourses,
    getSessionId,
    clearCourses,
    router,
  ]);

  // Early return for unauthenticated users or loading state

if (!isAuthenticated || !user) {
      if (isLoading) {
        return <LoadingSpinner message="Checking authentication..." />;
      }
      // This shouldn't render due to the redirect, but just in case
     return router.replace("/login")
      
    }
  

  // Show loading spinner while initializing
  if (isLoading) {
    return <LoadingSpinner message="Loading your dashboard..." />;
  }

  // Show error state if something went wrong
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-600 mb-4">⚠️ {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  // Authenticated user layout
  return (
    <div className="flex max-h-screen  font-poppins w-full">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="w-full inh md:overflow-x-hidden overflow-y-auto flex flex-col justify-between">
        <Header />
        <div className="w-full px-4 md:px-0">
          {children}
        </div>
        {pathname !== "/welcome" && (
          <div className="w-full px-4 md:px-2 lg:px-4 xl:px-0 py-4 sticky bottom-0 bg-white box-shadow">
            <SearchBox />
          </div>
        )}
      </div>
    </div>
  );
}
