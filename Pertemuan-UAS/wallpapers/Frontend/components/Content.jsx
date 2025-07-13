"use client"; // Komponen ini dijalankan di sisi klien (browser)

import { useState, useEffect } from "react"; // hook React: useState & useEffect
import { useSearchParams } from "next/navigation"; // untuk mengambil query parameter dari URL
import Link from "next/link"; // untuk navigasi antar halaman

// 🔗 Fungsi utilitas untuk membuat slug dari nama wallpaper (contoh: "My Wallpaper" -> "my-wallpaper")
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // spasi jadi tanda minus
    .replace(/[^\w\-]+/g, "") // hapus karakter yang aneh
    .replace(/\-\-+/g, "-") // hilangkan minus beruntun
    .replace(/^-+/, "") // hilangkan minus di awal
    .replace(/-+$/, ""); // hilangkan minus di akhir
}

// Komponen utama untuk menampilkan grid wallpaper
export default function WallpaperGrid() {
  const searchParams = useSearchParams(); // ambil parameter query dari URL
  const searchQuery = searchParams.get("search") || ""; // ambil nilai "search", jika tidak ada kosong

  const [wallpapers, setWallpapers] = useState([]); // state untuk semua wallpaper
  const [filteredWallpapers, setFilteredWallpapers] = useState([]); // state untuk wallpaper hasil filter pencarian
  const [loading, setLoading] = useState(true); // state untuk status loading
  const [error, setError] = useState(null); // state untuk error jika gagal fetch

  // Ambil semua wallpaper dari API saat halaman pertama kali dimuat
  useEffect(() => {
    const fetchWallpapers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/wallpapers"); // fetch dari backend
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        const wallpapersArray = Array.isArray(data) ? data : data.data || []; // pastikan hasilnya array
        setWallpapers(wallpapersArray);
      } catch (err) {
        setError(err.message || "Gagal mengambil data");
      } finally {
        setLoading(false);
      }
    };

    fetchWallpapers();
  }, []);

  // Filter wallpaper berdasarkan query pencarian
  useEffect(() => {
    if (!searchQuery) {
      setFilteredWallpapers(wallpapers); // jika tidak ada pencarian, tampilkan semua
    } else {
      const lowerSearch = searchQuery.toLowerCase();
      const filtered = wallpapers.filter((wp) =>
        wp.name.toLowerCase().includes(lowerSearch)
      );
      setFilteredWallpapers(filtered); // tampilkan hasil filter
    }
  }, [searchQuery, wallpapers]);

  // Tampilkan pesan loading jika masih mengambil data
  if (loading)
    return (
      <section className="text-white text-center mt-10">
        Loading wallpapers...
      </section>
    );

  // Tampilkan pesan error jika ada
  if (error)
    return (
      <section className="text-red-500 text-center mt-10">
        Error: {error}
      </section>
    );

  // Tampilkan pesan jika tidak ada wallpaper ditemukan
  if (filteredWallpapers.length === 0)
    return (
      <section className="text-white text-center mt-10">
        Tidak ada wallpaper ditemukan.
      </section>
    );

  return (
    <section className="bg-[#1a1a2e] px-0 py-0 w-full">
      {/* Judul & deskripsi */}
      <div className="text-center mt-5 mb-4 px-4">
        <h1 className="text-[#fbc02d] text-2xl font-bold mb-2">
          {searchQuery
            ? `Search results for "${searchQuery}"`
            : "All Wallpaper"}
        </h1>
        <p className="text-[#e0e0e0] text-base leading-relaxed max-w-2xl mx-auto">
          {searchQuery
            ? `Showing wallpapers matching your search.`
            : "Find the best wallpapers for your device. Explore a wide range of categories and styles."}
        </p>
      </div>

      {/* Grid Wallpaper */}
      <div className="w-full px-5 md:px-[20px]">
        <div
          className={`
            flex flex-col gap-[10px] 
            md:grid md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] 
            md:gap-[10.5px] md:justify-items-center md:items-center
          `}
        >
          {filteredWallpapers.map((wallpaper) => {
            const slug = slugify(wallpaper.name || "no-name"); // buat slug dari nama
            return (
              <div
                key={wallpaper.id}
                className="gallery-item w-full md:max-w-[200px] rounded overflow-hidden bg-base-100"
              >
                {/* Nama Wallpaper */}
                <div className="bg-[#bfa930] text-[#1a1a2e] text-center py-2 font-bold text-sm md:text-[14px]">
                  {wallpaper.name}
                </div>

                {/* Gambar Wallpaper */}
                <div className="gallery-img w-full h-auto md:h-[300px] overflow-hidden">
                  <Link href={`/detail/${wallpaper.id}`}>
                    <img
                      src={`http://localhost:5000${wallpaper.image_url}`}
                      alt={wallpaper.name}
                      className="w-full h-full object-cover block"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
