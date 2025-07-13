"use client";
// 👉 Memberitahu Next.js bahwa komponen ini harus dijalankan di sisi klien (browser)

import { useRouter } from "next/navigation";
// 👉 Import hook untuk melakukan navigasi (pindah halaman) secara programatik

export default function Detail({ wallpaper }) {
  const router = useRouter();
  // 👉 Inisialisasi router untuk navigasi

  // 🗑️ Fungsi untuk menghapus wallpaper
  const handleDelete = async () => {
    const confirmed = confirm(
      "Apakah kamu yakin ingin menghapus wallpaper ini?"
    ); // tampilkan konfirmasi
    if (!confirmed) return; // kalau tidak jadi, hentikan

    try {
      // Kirim permintaan DELETE ke API
      const res = await fetch(
        `http://localhost:5000/api/wallpapers/${wallpaper.id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Gagal menghapus");
      // kalau gagal (bukan status 200), tampilkan error

      alert("Wallpaper berhasil dihapus");
      router.push("/");
      // setelah dihapus, kembali ke halaman utama
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghapus");
    }
  };

  // ✏️ Fungsi untuk pindah ke halaman edit
  const handleEdit = () => {
    router.push(`/edit/${wallpaper.id}`);
  };

  return (
    <div className="w-full min-h-screen bg-[#303030] p-5 text-white">
      {/* 🌟 Judul wallpaper */}
      <div className="bg-yellow-400 text-[#1e1e2f] py-3 mb-6 rounded text-center shadow-md">
        <h1 className="text-3xl font-bold">{wallpaper.name}</h1>
      </div>

      {/* 📷 Gambar & deskripsi */}
      <div className="flex flex-col md:flex-row md:gap-6">
        {/* Gambar wallpaper */}
        <img
          src={`http://localhost:5000${wallpaper.image_url}`}
          alt={wallpaper.name}
          className="w-full md:w-1/2 rounded shadow mb-6 md:mb-0"
        />

        {/* Deskripsi */}
        <div className="md:flex-1">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-justify leading-relaxed text-gray-300">
            {wallpaper.description || "No description provided."}
            {/* kalau deskripsi kosong, tampilkan default */}
          </p>
        </div>
      </div>

      {/* 📥 Tombol download */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Resolution</h2>
        <a
          href={`http://localhost:5000/download/${wallpaper.image_url
            .split("/")
            .pop()}`}
          download
        >
          <button className="bg-yellow-400 text-[#1e1e2f] font-bold px-6 py-2 rounded hover:bg-cyan-500 transition">
            Download {wallpaper.resolution || "Unknown"}
          </button>
        </a>
      </div>

      {/* 👤 Informasi pengunggah */}
      <div className="flex items-center gap-4 mt-8">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAp3Z1hXfTVTKtbw3vE75-rtfr1ZCFcPSw4A&s"
          alt="Author"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">Uploader</h2>
          <p>{wallpaper.uploader || "Anonymous"}</p>
          {/* kalau tidak ada nama uploader, tampilkan 'Anonymous' */}
        </div>
      </div>

      {/* ✏️🗑️ Tombol Edit & Hapus */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleEdit}
          className="bg-yellow-400 text-[#1e1e2f] font-bold px-6 py-2 rounded hover:bg-cyan-500 transition"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-yellow-400 text-[#1e1e2f] font-bold px-6 py-2 rounded hover:bg-cyan-500 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
