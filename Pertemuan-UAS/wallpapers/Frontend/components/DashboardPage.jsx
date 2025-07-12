"use client";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import WallpaperForm from "./WallpaperForm";
import TabelWallpaper from "./TabelWallpaper";
import AdminDashboard from "@/app/admin/page";

export default function DashboardPage() {
  const pathname = usePathname();

  const renderContent = () => {
    if (pathname === "/admin") {
      return <AdminDashboard />;
    } else if (pathname === "/admin/add") {
      return (
        <div className="p-4 bg-[#1a1a2e] rounded-lg w-full max-w-screen-md mx-auto">
          <WallpaperForm mode="create" />
        </div>
      );
    } else if (pathname === "/admin/table") {
      return <TabelWallpaper />;
    } else {
      return (
        <p className="text-center text-yellow-400 mt-4 text-sm">
          Halaman tidak ditemukan.
        </p>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#1a1a2e] text-[#e0e0e0]">
      <Sidebar />

      <main className="flex-1 p-4 md:p-6 flex flex-col items-center w-full">
        {renderContent()}
      </main>
    </div>
  );
}
