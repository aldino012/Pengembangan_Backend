"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setAdmin(JSON.parse(user));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-3xl font-bold text-[#fbc02d] mb-2">
        Selamat datang di Dashboard Anda
      </h1>
      <p className="mb-6 text-[#e0e0e0]">
        Berikut adalah data diri Anda yang tersimpan di sistem.
      </p>

      <div className="bg-[#1a1a2e] rounded-lg shadow-lg p-6 w-full max-w-sm text-left text-[#e0e0e0]">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#fbc02d]">
          Profil Anda
        </h2>

        {admin ? (
          <div className="space-y-4">
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
                  e.target.src =
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
                }}
              />
            </div>

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
          <p className="text-center">Memuat data...</p>
        )}
      </div>
    </div>
  );
}
