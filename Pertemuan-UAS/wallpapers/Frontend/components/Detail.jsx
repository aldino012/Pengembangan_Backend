"use client"; // Komponen ini berjalan di sisi client (browser)

import { useRouter } from "next/navigation"; // Untuk navigasi (berpindah halaman) secara otomatis

export default function Detail({ wallpaper }) {
  const router = useRouter(); // Inisialisasi fitur router untuk navigasi

  // Fungsi untuk menghapus wallpaper
  const handleDelete = async () => {
    const confirmed = confirm(
      "Apakah kamu yakin ingin menghapus wallpaper ini?" // Tampilkan konfirmasi ke pengguna
    );
    if (!confirmed) return; // Jika pengguna tidak setuju, hentikan

    try {
      // Kirim permintaan DELETE ke backend
      const res = await fetch(
        `http://localhost:5000/api/wallpapers/${wallpaper.id}`,
        {
          method: "DELETE", // Metode penghapusan
        }
      );

      if (!res.ok) throw new Error("Gagal menghapus"); // Kalau gagal, tampilkan pesan error

      alert("Wallpaper berhasil dihapus"); // Beri tahu kalau berhasil
      router.push("/"); // Arahkan kembali ke halaman utama
    } catch (err) {
      console.error(err); // Tampilkan error di console
      alert("Terjadi kesalahan saat menghapus"); // Tampilkan alert ke pengguna
    }
  };

  // Fungsi untuk mengarahkan ke halaman edit
  const handleEdit = () => {
    router.push(`/edit/${wallpaper.id}`); // Arahkan ke halaman edit sesuai ID wallpaper
  };

  return (
    <div className="w-full min-h-screen bg-[#303030] p-5 text-white">
      {/* Judul */}
      <div className="bg-yellow-400 text-[#1e1e2f] py-3 mb-6 rounded text-center shadow-md max-w-full">
        <h1 className="text-3xl font-bold">{wallpaper.name}</h1>
      </div>

      {/* Konten detail */}
      <div className="flex flex-col md:flex-row md:gap-6">
        {/* Gambar wallpaper */}
        <img
          src={`http://localhost:5000${wallpaper.image_url}`} // Alamat gambar
          alt={wallpaper.name}
          className="w-full md:w-1/2 rounded shadow mb-6 md:mb-0"
        />

        {/* Deskripsi */}
        <div className="md:flex-1">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-justify leading-relaxed text-gray-300">
            {wallpaper.description || "No description provided."}{" "}
            {/* Jika tidak ada deskripsi, tampilkan teks default */}
          </p>
        </div>
      </div>

      {/* Bagian unduhan */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Resolution</h2>
        <a
          href={`http://localhost:5000/download/${wallpaper.image_url
            .split("/")
            .pop()}`}
          download
        >
          <button className="bg-yellow-400 text-[#1e1e2f] font-bold px-6 py-2 rounded hover:bg-cyan-500 transition">
            Download {wallpaper.resolution || "Unknown"}{" "}
            {/* Menampilkan resolusi atau teks default */}
          </button>
        </a>
      </div>

      {/* Informasi pengunggah */}
      <div className="flex items-center gap-4 mt-8">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAp3Z1hXfTVTKtbw3vE75-rtfr1ZCFcPSw4A&s" // Foto profil default
          alt="Author"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">Uploader</h2>
          <p>{wallpaper.uploader || "Anonymous"}</p>{" "}
          {/* Jika tidak ada nama, tampilkan 'Anonymous' */}
        </div>
      </div>

      {/* Tombol Edit dan Hapus */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleEdit} // Jalankan fungsi edit saat tombol diklik
          className="bg-yellow-400 text-[#1e1e2f] font-bold px-6 py-2 rounded hover:bg-cyan-500 transition"
        >
          Edit
        </button>
        <button
          onClick={handleDelete} // Jalankan fungsi hapus saat tombol diklik
          className="bg-yellow-400 text-[#1e1e2f] font-bold px-6 py-2 rounded hover:bg-cyan-500 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
