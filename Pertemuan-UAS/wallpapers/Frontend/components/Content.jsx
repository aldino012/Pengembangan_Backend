"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// Fungsi untuk membuat slug dari nama wallpaper
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export default function WallpaperGrid() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [wallpapers, setWallpapers] = useState([]);
  const [filteredWallpapers, setFilteredWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWallpapers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/wallpapers");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        const wallpapersArray = Array.isArray(data) ? data : data.data || [];
        setWallpapers(wallpapersArray);
      } catch (err) {
        setError(err.message || "Gagal mengambil data");
      } finally {
        setLoading(false);
      }
    };

    fetchWallpapers();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredWallpapers(wallpapers);
    } else {
      const lowerSearch = searchQuery.toLowerCase();
      const filtered = wallpapers.filter((wp) =>
        wp.name.toLowerCase().includes(lowerSearch)
      );
      setFilteredWallpapers(filtered);
    }
  }, [searchQuery, wallpapers]);

  if (loading)
    return (
      <section className="text-white text-center mt-10">
        Loading wallpapers...
      </section>
    );

  if (error)
    return (
      <section className="text-red-500 text-center mt-10">
        Error: {error}
      </section>
    );

  if (filteredWallpapers.length === 0)
    return (
      <section className="text-white text-center mt-10">
        Tidak ada wallpaper ditemukan.
      </section>
    );

  return (
    <section className="bg-[#1a1a2e] px-0 py-0 w-full">
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

      <div className="w-full px-5 md:px-[20px]">
        <div
          className={`
            flex flex-col gap-[10px] 
            md:grid md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] 
            md:gap-[10.5px] md:justify-items-center md:items-center
          `}
        >
          {filteredWallpapers.map((wallpaper) => {
            const slug = slugify(wallpaper.name || "no-name");
            return (
              <div
                key={wallpaper.id}
                className="gallery-item w-full md:max-w-[200px] rounded overflow-hidden bg-base-100"
              >
                <div className="bg-[#bfa930] text-[#1a1a2e] text-center py-2 font-bold text-sm md:text-[14px]">
                  {wallpaper.name}
                </div>
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
