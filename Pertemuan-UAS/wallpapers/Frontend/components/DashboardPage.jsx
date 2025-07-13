"use client"; // Komponen ini dijalankan di sisi klien (browser)

import { usePathname } from "next/navigation"; // hook untuk mendapatkan path URL saat ini
import Sidebar from "./Sidebar"; // komponen sidebar
import WallpaperForm from "./WallpaperForm"; // komponen form tambah/edit wallpaper
import TabelWallpaper from "./TabelWallpaper"; // komponen tabel daftar wallpaper
import AdminDashboard from "@/app/admin/page"; // komponen dashboard admin utama

// Komponen utama untuk dashboard admin
export default function DashboardPage() {
  const pathname = usePathname(); // ambil path URL saat ini

  // Fungsi untuk menentukan konten yang ditampilkan berdasarkan URL
  const renderContent = () => {
    if (pathname === "/admin") {
      // jika path /admin tampilkan dashboard
      return <AdminDashboard />;
    } else if (pathname === "/admin/add") {
      // jika path /admin/add tampilkan form tambah
      return (
        <div className="p-4 bg-[#1a1a2e] rounded-lg w-full max-w-screen-md mx-auto">
          <WallpaperForm mode="create" />
        </div>
      );
    } else if (pathname === "/admin/table") {
      // jika path /admin/table tampilkan tabel wallpaper
      return <TabelWallpaper />;
    } else {
      // jika path lain tampilkan pesan error
      return (
        <p className="text-center text-yellow-400 mt-4 text-sm">
          Halaman tidak ditemukan.
        </p>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#1a1a2e] text-[#e0e0e0]">
      {/* Sidebar untuk navigasi */}
      <Sidebar />

      {/* Konten utama */}
      <main className="flex-1 p-4 md:p-6 flex flex-col items-center w-full">
        {renderContent()}
      </main>
    </div>
  );
}
