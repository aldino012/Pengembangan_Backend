"use client";

import { useState } from "react";

export default function FormRegister() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validasi password sama
    if (form.password !== form.confirmPassword) {
      alert("Password dan Konfirmasi Password tidak sama!");
      return;
    }

    // ✅ Validasi panjang password
    if (form.password.length < 6 || form.password.length > 8) {
      alert("Password harus 6-8 karakter.");
      return;
    }

    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("confirmPassword", form.confirmPassword);
    formData.append("role", form.role);
    if (photo) {
      formData.append("photo", photo);
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registrasi gagal.");
      }

      alert("Registrasi berhasil! Silakan login.");
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      alert(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-[#2c2c3c] text-[#e0e0e0] rounded-lg shadow-lg w-full max-w-md mx-auto p-8 md:p-10"
    >
      <h2 className="text-3xl font-bold text-center text-[#fbc02d]">
        Register
      </h2>
      <p className="text-center text-sm text-[#e0e0e0] mb-4">
        Buat akun baru untuk mulai menjelajahi wallpaper.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-base font-medium">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Masukkan username"
            className="w-full px-4 py-3 rounded bg-[#1a1a2e] text-[#e0e0e0] border border-[#fbc02d] focus:outline-none focus:ring-2 focus:ring-[#fbc02d]"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-base font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Masukkan email"
            className="w-full px-4 py-3 rounded bg-[#1a1a2e] text-[#e0e0e0] border border-[#fbc02d] focus:outline-none focus:ring-2 focus:ring-[#fbc02d]"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-base font-medium">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Masukkan password"
            className="w-full px-4 py-3 rounded bg-[#1a1a2e] text-[#e0e0e0] border border-[#fbc02d] focus:outline-none focus:ring-2 focus:ring-[#fbc02d]"
            value={form.password}
            onChange={handleChange}
            required
          />
          <p className="text-xs text-gray-400 mt-1">
            * Password harus 6-8 karakter
          </p>
        </div>

        <div>
          <label className="block mb-1 text-base font-medium">
            Konfirmasi Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Ulangi password"
            className="w-full px-4 py-3 rounded bg-[#1a1a2e] text-[#e0e0e0] border border-[#fbc02d] focus:outline-none focus:ring-2 focus:ring-[#fbc02d]"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-base font-medium">Role</label>
          <select
            name="role"
            className="w-full px-4 py-3 rounded bg-[#1a1a2e] text-[#e0e0e0] border border-[#fbc02d] focus:outline-none focus:ring-2 focus:ring-[#fbc02d]"
            value={form.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-base font-medium">
            Foto Profil
          </label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full text-sm text-[#e0e0e0] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold
            file:bg-[#fbc02d] file:text-[#1a1a2e] hover:file:bg-[#bfa930]"
          />
          {photoPreview && (
            <div className="mt-3">
              <p className="text-sm mb-2">Preview Foto:</p>
              <img
                src={photoPreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-full border border-[#fbc02d]"
              />
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 mt-4 text-base font-bold rounded transition ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-[#fbc02d] text-[#1a1a2e] hover:bg-[#bfa930]"
        }`}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <div className="text-center mt-4">
        <p className="text-sm">
          Sudah punya akun?{" "}
          <a href="/login" className="text-[#fbc02d] hover:underline">
            Login di sini
          </a>
        </p>
      </div>
    </form>
  );
}
