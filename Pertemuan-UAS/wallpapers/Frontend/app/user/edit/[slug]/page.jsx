"use client"; // Menandakan bahwa komponen ini berjalan di sisi klien (browser)

import { useParams } from "next/navigation"; // untuk membaca parameter dari URL
import { useEffect, useState } from "react"; // untuk state & efek samping
import WallpaperForm from "@/components/WallpaperForm"; // form untuk edit wallpaper

// Komponen halaman edit wallpaper
export default function EditPage() {
  const { slug } = useParams(); // ambil parameter `slug` dari URL (misalnya: /user/edit/1 → slug = 1)
  const baseUrl = "http://localhost:5000"; // base URL backend API

  // State untuk menyimpan data & status
  const [data, setData] = useState(null); // data wallpaper
  const [loading, setLoading] = useState(true); // status loading
  const [errorMsg, setErrorMsg] = useState(""); // pesan error (jika ada)

  // Ambil data wallpaper dari API saat halaman dimuat atau slug berubah
  useEffect(() => {
    if (!slug) {
      // jika slug kosong → tampilkan error
      setErrorMsg("Slug tidak valid");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // panggil API untuk mendapatkan detail wallpaper
        const res = await fetch(`${baseUrl}/api/wallpapers/${slug}`, {
          cache: "no-store", // jangan pakai cache
        });

        if (!res.ok) {
          // jika response gagal
          setErrorMsg(`Wallpaper tidak ditemukan (status ${res.status})`);
          setLoading(false);
          return;
        }

        const json = await res.json(); // ubah response ke JSON

        // siapkan data awal untuk form edit
        setData({
          uploader: json.uploader,
          name: json.name,
          description: json.description,
          resolution: json.resolution,
          image_url: json.image_url?.startsWith("http")
            ? json.image_url
            : `${baseUrl}${json.image_url}`, // jika bukan URL absolut, tambahkan baseUrl
        });
      } catch (err) {
        // jika fetch gagal
        setErrorMsg(`Gagal mengambil data: ${err.message}`);
      } finally {
        // set loading menjadi false di akhir
        setLoading(false);
      }
    };

    fetchData(); // jalankan fungsi
  }, [slug]);

  // Jika masih loading → tampilkan pesan loading
  if (loading) {
    return <p className="text-center text-gray-400 mt-10">Memuat data...</p>;
  }

  // Jika ada error → tampilkan pesan error
  if (errorMsg) {
    return <p className="text-red-500 text-center mt-10">{errorMsg}</p>;
  }

  // Jika data sudah ada → tampilkan form edit
  return (
    <main className="min-h-screen bg-[#1a1a2e] py-10 px-4">
      {/* mode edit & kirim data awal + slug ke form */}
      <WallpaperForm mode="edit" slug={slug} initialData={data} />
    </main>
  );
}
