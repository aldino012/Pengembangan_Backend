"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import WallpaperForm from "./WallpaperForm";

export default function TabelWallpaper() {
  const [wallpapers, setWallpapers] = useState([]);
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // 🔷 search term

  const fetchWallpapers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/wallpapers");
      setWallpapers(response.data);
    } catch (error) {
      console.error("Gagal mengambil data wallpaper:", error);
    }
  };

  useEffect(() => {
    fetchWallpapers();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = confirm(
      "Apakah kamu yakin ingin menghapus wallpaper ini?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/wallpapers/${id}`);
      alert("Wallpaper berhasil dihapus");
      fetchWallpapers();
    } catch (error) {
      console.error("Gagal menghapus wallpaper:", error);
      alert("Terjadi kesalahan saat menghapus wallpaper");
    }
  };

  const handleEditClick = (item) => {
    setSelectedWallpaper(item);
  };

  const filteredWallpapers = wallpapers.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-full overflow-x-hidden p-2 md:p-4">
      <h2 className="text-xl font-bold mb-4 text-[#fbc02d] text-center">
        Daftar Wallpaper
      </h2>

      {/* 🔷 SEARCH BOX */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Cari nama atau deskripsi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-md bg-white text-black rounded px-4 py-2"
        />
      </div>

      {/* Tampilan Mobile */}
      <div className="md:hidden space-y-4">
        {filteredWallpapers.length === 0 ? (
          <div className="text-center py-4 text-[#e0e0e0]">
            Tidak ada data wallpaper.
          </div>
        ) : (
          filteredWallpapers.map((item, index) => (
            <div key={item.id} className="bg-[#2d2d44] rounded-lg p-3 shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-[#fbc02d]">
                    {index + 1}. {item.name}
                  </p>
                  <p className="text-sm text-[#e0e0e0]">{item.description}</p>
                  <p className="text-xs text-gray-400">
                    Resolusi: {item.resolution}
                  </p>
                </div>
                <img
                  src={`http://localhost:5000${item.image_url}`}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => handleEditClick(item)}
                  className="px-3 py-1 bg-[#fbc02d] text-[#1a1a2e] text-xs rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1 bg-[#d32f2f] text-white text-xs rounded hover:bg-red-700"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tampilan Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-[#bfa930] text-[#1a1a2e]">
            <tr>
              <th>No</th>
              <th>Nama Wallpaper</th>
              <th>Deskripsi</th>
              <th>Resolusi</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredWallpapers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-[#e0e0e0]">
                  Tidak ada data wallpaper.
                </td>
              </tr>
            ) : (
              filteredWallpapers.map((item, index) => (
                <tr key={item.id} className="bg-[#2d2d44] text-[#e0e0e0]">
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td className="max-w-xs truncate">{item.description}</td>
                  <td>{item.resolution}</td>
                  <td>
                    <img
                      src={`http://localhost:5000${item.image_url}`}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="btn btn-md bg-[#fbc02d] text-[#1a1a2e] hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-md bg-[#d32f2f] text-white hover:bg-red-700"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Form Edit Wallpaper */}
      {selectedWallpaper && (
        <div className="mt-6 p-4 border border-gray-600 rounded-lg bg-[#2c2c3c] relative">
          <button
            onClick={() => setSelectedWallpaper(null)}
            className="absolute top-2 right-2 md:top-4 md:right-4 btn btn-sm bg-red-600 text-white hover:bg-red-700 px-2 py-1 md:px-4 md:py-2 rounded-lg shadow text-xs md:text-sm"
          >
            Tutup
          </button>

          <WallpaperForm
            mode="edit"
            slug={selectedWallpaper.id}
            initialData={{
              uploader: selectedWallpaper.uploader,
              name: selectedWallpaper.name,
              description: selectedWallpaper.description,
              resolution: selectedWallpaper.resolution,
              image_url: `http://localhost:5000${selectedWallpaper.image_url}`,
            }}
            onSuccess={() => {
              setSelectedWallpaper(null);
              fetchWallpapers();
            }}
          />
        </div>
      )}
    </div>
  );
}
