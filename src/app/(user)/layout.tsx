"use client"
import Header from "@/components/header";
import SearchBox from "@/components/searchBox";
import Sidebar from "@/components/sidebar";
import { usePathname } from "next/navigation";

export default function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()
  // console.log(params)
  return (
    <div className="flex max-h-screen">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="md:h-[80vh] xl:h-[86vh] overflow-y-auto">
          {children}
        </div>
        { pathname !== "/welcome" ?<div className="w-full py-4 sticky bottom-0 bg-white box-shadow">
          <SearchBox />
        </div> : null}
      </div>
    </div>
  );
}
