"use client"; // Komponen ini berjalan di sisi browser (client-side)

import { useEffect, useState } from "react";

// Komponen halaman dashboard admin
export default function DashboardPage() {
  const [admin, setAdmin] = useState(null); // state untuk menyimpan data admin

  // Saat halaman dimuat, ambil data user dari localStorage
  useEffect(() => {
    const user = localStorage.getItem("user"); // ambil string user
    if (user) {
      setAdmin(JSON.parse(user)); // ubah string menjadi objek & simpan ke state
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      {/* Judul halaman */}
      <h1 className="text-3xl font-bold text-[#fbc02d] mb-2">
        Selamat datang di Dashboard Anda
      </h1>

      <p className="mb-6 text-[#e0e0e0]">
        Berikut adalah data diri Anda yang tersimpan di sistem.
      </p>

      {/* Kartu Profil Admin */}
      <div className="bg-[#1a1a2e] rounded-lg shadow-lg p-6 w-full max-w-sm text-left text-[#e0e0e0]">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#fbc02d]">
          Profil Anda
        </h2>

        {/* Jika admin sudah ada (sudah dimuat) tampilkan */}
        {admin ? (
          <div className="space-y-4">
            {/* Foto profil */}
            <div className="flex justify-center">
              <img
                src={
                  admin.photo
                    ? `http://localhost:5000/profile/${admin.photo}`
                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-[#fbc02d] object-cover"
                onError={(e) => {
                  // Jika foto gagal dimuat, gunakan foto default
                  e.target.src =
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
                }}
              />
            </div>

            {/* Informasi admin */}
            <div className="space-y-2">
              <p>
                <span className="font-semibold text-[#fbc02d]">Username:</span>{" "}
                {admin.username}
              </p>
              <p>
                <span className="font-semibold text-[#fbc02d]">Email:</span>{" "}
                {admin.email}
              </p>
              <p>
                <span className="font-semibold text-[#fbc02d]">Role:</span>{" "}
                {admin.role}
              </p>
            </div>
          </div>
        ) : (
          // Jika data belum dimuat, tampilkan pesan loading
          <p className="text-center">Memuat data...</p>
        )}
      </div>
    </div>
  );
}
