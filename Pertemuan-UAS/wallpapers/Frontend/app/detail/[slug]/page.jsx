// app/detail/[slug]/page.jsx
"use client"; // Menandakan bahwa komponen ini dijalankan di sisi klien

import { useEffect, useState } from "react"; // Mengimpor hook untuk efek samping dan state
import { useParams } from "next/navigation"; // Mengimpor hook untuk mendapatkan parameter URL
import Detail from "../../../components/Detail"; // Mengimpor komponen Detail untuk menampilkan detail wallpaper

export default function DetailPage() { // Fungsi komponen DetailPage
  const { slug } = useParams(); // Mengambil parameter slug dari URL
  const [wallpaper, setWallpaper] = useState(null); // State untuk menyimpan data wallpaper

  useEffect(() => { // Hook useEffect untuk menjalankan efek samping
    if (!slug) return; // Jika slug tidak ada, jangan lakukan apapun
    const fetchData = async () => { // Fungsi async untuk mengambil data dari API
      const res = await fetch(`http://localhost:5000/api/wallpapers/${slug}`); // Fetch data berdasarkan slug
      const data = await res.json(); // Mengonversi response menjadi JSON
      setWallpaper(data); // Menyimpan data ke state
    };
    fetchData(); // Memanggil fungsi fetchData
  }, [slug]); // Efek dijalankan ulang ketika slug berubah

  if (!wallpaper) return <p className="text-white">Loading...</p>; // Menampilkan teks loading jika data belum ada

  return ( // Mengembalikan elemen JSX
    <main className="min-h-screen bg-[#1e1e2f] text-white p-5"> 
      <Detail wallpaper={wallpaper} /> {/* Menggunakan komponen Detail untuk menampilkan data wallpaper */}
    </main>
  );
}

