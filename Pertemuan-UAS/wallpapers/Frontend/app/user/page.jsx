"use client";

import { useEffect, useState } from "react";

export default function UserDashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] text-center">
      <h1 className="text-3xl font-bold text-[#fbc02d] mb-4">
        Selamat Datang di User Dashboard
      </h1>

      {user ? (
        <div className="bg-[#2c2c3c] text-[#e0e0e0] p-6 rounded-lg shadow-lg w-full max-w-sm">
          <div className="flex justify-center mb-4">
            <img
              src={
                user.photo
                  ? `http://localhost:5000/profile/${user.photo}`
                  : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-[#fbc02d] object-cover"
            />
          </div>

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
        <p className="text-[#e0e0e0]">Memuat data user...</p>
      )}
    </div>
  );
}
