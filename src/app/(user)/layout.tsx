import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

export default function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex max-h-screen">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="md:h-[80vh] xl:h-[86vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
