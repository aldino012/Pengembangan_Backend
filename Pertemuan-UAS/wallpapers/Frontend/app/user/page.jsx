"use client"; // Menandakan bahwa komponen ini dijalankan di sisi klien (browser)

import { useEffect, useState } from "react"; // Mengimpor hook React: useState & useEffect

// Komponen dashboard untuk user
export default function UserDashboardPage() {
  const [user, setUser] = useState(null); // State untuk menyimpan data user

  // Ambil data user dari localStorage saat halaman pertama kali dimuat
  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // ambil data dari localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // ubah string JSON menjadi objek & simpan ke state
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] text-center">
      {/* Judul */}
      <h1 className="text-3xl font-bold text-[#fbc02d] mb-4">
        Selamat Datang di User Dashboard
      </h1>

      {/* Jika user sudah ada (berhasil diambil) */}
      {user ? (
        <div className="bg-[#2c2c3c] text-[#e0e0e0] p-6 rounded-lg shadow-lg w-full max-w-sm">
          {/* Foto profil */}
          <div className="flex justify-center mb-4">
            <img
              src={
                user.photo
                  ? `http://localhost:5000/profile/${user.photo}` // jika user punya foto
                  : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" // jika tidak ada foto
              }
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-[#fbc02d] object-cover"
            />
          </div>

          {/* Informasi user */}
          <h2 className="text-2xl font-bold mb-4 text-[#fbc02d]">
            Informasi Anda
          </h2>

          <div className="space-y-2 text-left">
            <p>
              <span className="font-semibold text-[#fbc02d]">Username:</span>{" "}
              {user.username}
            </p>
            <p>
              <span className="font-semibold text-[#fbc02d]">Email:</span>{" "}
              {user.email}
            </p>
            <p>
              <span className="font-semibold text-[#fbc02d]">Role:</span>{" "}
              {user.role}
            </p>
          </div>
        </div>
      ) : (
        // Jika user masih null / belum ada → tampilkan loading
        <p className="text-[#e0e0e0]">Memuat data user...</p>
      )}
    </div>
  );
}
