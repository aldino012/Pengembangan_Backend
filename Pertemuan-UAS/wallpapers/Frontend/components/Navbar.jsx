"use client"; // Komponen ini berjalan di sisi client

import { useState, useEffect } from "react"; // state & efek samping
import { useRouter, useSearchParams } from "next/navigation"; // navigasi & baca query
import Image from "next/image"; // untuk optimisasi gambar
import Link from "next/link"; // untuk navigasi antar halaman
import Logo from "@/public/img/logo.png"; // logo aplikasi
import { BiSearch } from "react-icons/bi"; // icon pencarian

export default function Navbar() {
  const router = useRouter(); // untuk redirect halaman
  const searchParams = useSearchParams(); // untuk membaca query string

  const initialSearch = searchParams.get("search") || ""; // ambil query search dari URL (jika ada)
  const [searchTerm, setSearchTerm] = useState(initialSearch); // state untuk input pencarian
  const [user, setUser] = useState(null); // state untuk user login

  useEffect(() => {
    setSearchTerm(initialSearch); // sync searchTerm dengan URL saat URL berubah

    // cek apakah ada data user tersimpan
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [initialSearch]); // dijalankan ulang jika query berubah

  // menangani perubahan pada input pencarian
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const query = value.trim()
      ? `?search=${encodeURIComponent(value.trim())}`
      : "";
    router.push(`/${query}`); // update URL dengan query search
  };

  // logout user
  const handleLogout = () => {
    localStorage.removeItem("token"); // hapus token
    localStorage.removeItem("user"); // hapus data user
    setUser(null); // reset user
    router.push("/"); // redirect ke home
  };

  // klik avatar → arahkan ke dashboard
  const handleAvatarClick = () => {
    if (!user) return; // kalau belum login, tidak lakukan apapun
    if (user.role === "admin") {
      router.push("/admin"); // kalau admin → ke halaman admin
    } else {
      router.push("/user"); // kalau user biasa → ke halaman user
    }
  };

  return (
    <header>
      {/* NAVBAR */}
      <div className="bg-[#1a1a2e] px-4 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} alt="Logo" width={50} height={50} />
          <span className="text-[#fbc02d] font-bold text-lg md:text-xl">
            My Wallpaper
          </span>
        </Link>

        {/* Menu Navigasi */}
        <nav>
          <ul className="flex flex-col font-bold md:flex-row gap-2 md:gap-5 text-[#e0e0e0] text-lg items-center">
            <li>
              <Link href="/" className="hover:text-[#fbc02d]">
                Home
              </Link>
            </li>
            <li>
              <Link href="#about" className="hover:text-[#fbc02d]">
                About
              </Link>
            </li>
            <li>
              <Link href="#services" className="hover:text-[#fbc02d]">
                Services
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-[#fbc02d]">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Login/Register atau Avatar + Logout */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {!user ? (
            // kalau belum login, tampilkan tombol login & register
            <div className="flex flex-col md:flex-row gap-2">
              <Link
                href="/login"
                className="btn bg-[#fbc02d] text-[#1a1a2e] hover:bg-[#a8afeb] hover:-translate-y-1 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn bg-[#fbc02d] text-[#1a1a2e] hover:bg-[#a8afeb] hover:-translate-y-1 transition"
              >
                Register
              </Link>
            </div>
          ) : (
            // kalau sudah login, tampilkan avatar & logout
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="btn bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>

              <button
                onClick={handleAvatarClick}
                className="avatar hover:opacity-80 transition"
              >
                <div className="w-10 rounded-full overflow-hidden">
                  <img
                    alt="User Profile"
                    src={
                      user?.photo
                        ? `http://localhost:5000/profile/${user.photo}`
                        : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    onError={(e) => {
                      e.target.src =
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
                    }}
                  />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* HERO SECTION */}
      <div
        className="bg-cover bg-center bg-no-repeat h-[300px] flex flex-col justify-center items-center text-center px-4"
        style={{ backgroundImage: "url('/img/images.jpg')" }}
      >
        {/* SEARCH BOX */}
        <div className="relative w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="input input-bordered w-full bg-white text-black rounded-full px-4 pr-10"
          />
          <BiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black text-lg pointer-events-none" />
        </div>

        {/* QUICK TAGS */}
        <div className="mt-4">
          <ul className="flex flex-wrap justify-center items-center gap-4">
            {["Horor", "Aesthetics", "Nature", "Tech"].map((item) => (
              <li key={item}>
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="px-5 py-2 bg-[#2c2c3c] text-[#fbc02d] font-bold rounded-full hover:bg-[#fbc02d] hover:text-[#1a1a2e] transition opacity-70 hover:opacity-100"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
