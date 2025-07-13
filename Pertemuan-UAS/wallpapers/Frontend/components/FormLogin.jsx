"use client";
// 👉 Komponen ini berjalan di sisi klien/browser.

import { useState } from "react";
// 👉 Import hook useState untuk mengelola state/input form.

export default function FormLogin() {
  // 🔷 State untuk menyimpan nilai email, password, dan loading
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔷 Fungsi yang dipanggil saat form dikirim
  const handleSubmit = async (e) => {
    e.preventDefault(); // 👉 Mencegah reload halaman saat submit

    // ✋ Validasi password
    if (password.length < 6 || password.length > 8) {
      alert("Password harus 6-8 karakter.");
      return;
    }

    setLoading(true); // 👉 Set loading jadi true selama request

    try {
      // 🔷 Kirim request POST ke API untuk login
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json(); // ambil hasil response

      if (!res.ok) {
        alert(data.message || "Login gagal");
        setLoading(false);
        return;
      }

      // 🔷 Simpan token & user ke localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 🔷 Redirect ke halaman utama
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-sm mx-auto bg-[#2c2c3c] text-[#e0e0e0] p-6 rounded shadow"
    >
      {/* Judul */}
      <h2 className="text-2xl font-bold text-center text-[#fbc02d] mb-4">
        Login
      </h2>

      {/* Input Email */}
      <div>
        <label className="block mb-2 text-base font-medium text-[#e0e0e0]">
          Email
        </label>
        <input
          type="email"
          placeholder="Masukkan email Anda"
          className="w-full px-4 py-3 rounded bg-[#1a1a2e] text-[#e0e0e0] text-base border border-[#fbc02d] focus:outline-none focus:ring-2 focus:ring-[#fbc02d]"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // update state email
          required
        />
      </div>

      {/* Input Password */}
      <div>
        <label className="block mb-2 text-base font-medium text-[#e0e0e0]">
          Password
        </label>
        <input
          type="password"
          placeholder="Masukkan password Anda"
          className="w-full px-4 py-3 rounded bg-[#1a1a2e] text-[#e0e0e0] text-base border border-[#fbc02d] focus:outline-none focus:ring-2 focus:ring-[#fbc02d]"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // update state password
          required
        />
        <p className="text-xs text-gray-400 mt-1">
          * Password harus 6-8 karakter
        </p>
      </div>

      {/* Tombol Submit */}
      <button
        type="submit"
        disabled={loading} // kalau loading, disable tombol
        className={`w-full py-3 text-base font-bold rounded transition ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-[#fbc02d] text-[#1a1a2e] hover:bg-[#bfa930]"
        }`}
      >
        {loading ? "Loading..." : "Login"}
      </button>

      {/* Link Lupa Password */}
      <div className="text-center mt-6">
        <a
          href="/forgot-password"
          className="text-[#fbc02d] hover:underline text-sm"
        >
          Lupa password?
        </a>
      </div>

      {/* Link Register */}
      <div className="text-center mt-4">
        <p className="text-sm">
          Belum punya akun?{" "}
          <a href="/register" className="text-[#fbc02d] hover:underline">
            Daftar di sini
          </a>
        </p>
      </div>
    </form>
  );
}
