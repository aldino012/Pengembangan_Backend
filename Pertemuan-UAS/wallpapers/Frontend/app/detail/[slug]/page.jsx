// app/detail/[slug]/page.jsx

"use client"; // Komponen ini berjalan di sisi browser (client-side)

import { useEffect, useState } from "react"; // untuk state & efek samping
import { useParams } from "next/navigation"; // untuk mengambil parameter dari URL
import Detail from "../../../components/Detail"; // komponen untuk menampilkan detail wallpaper

// Komponen halaman detail wallpaper
export default function DetailPage() {
  const { slug } = useParams(); // ambil parameter `slug` dari URL (misalnya: /detail/1 → slug = 1)
  const [wallpaper, setWallpaper] = useState(null); // state untuk menyimpan data wallpaper

  // Ambil data wallpaper dari API ketika halaman dimuat atau slug berubah
  useEffect(() => {
    if (!slug) return; // jika slug belum ada, jangan fetch dulu

    const fetchData = async () => {
      const res = await fetch(`http://localhost:5000/api/wallpapers/${slug}`); // ambil data dari backend
      const data = await res.json(); // ubah response jadi JSON
      setWallpaper(data); // simpan data ke state
    };

    fetchData(); // panggil fungsi fetchData
  }, [slug]); // jalankan ulang jika slug berubah

  // Jika data belum ada, tampilkan tulisan loading
  if (!wallpaper) return <p className="text-white">Loading...</p>;

  // Jika data sudah ada, tampilkan detail wallpaper
  return (
    <main className="min-h-screen bg-[#1e1e2f] text-white p-5">
      {/* kirim data wallpaper ke komponen Detail */}
      <Detail wallpaper={wallpaper} />
    </main>
  );
}
