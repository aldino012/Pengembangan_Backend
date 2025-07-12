"use client"; // Komponen ini hanya dijalankan di sisi browser (client)

import { useState } from "react"; // Untuk mengatur state input & pesan

export default function WallpaperForm({
  mode = "create", // Mode form: 'create' (tambah) atau 'edit'
  initialData = {}, // Data awal untuk mode edit
  slug, // ID wallpaper saat edit
  onSuccess, // Fungsi callback setelah sukses
}) {
  const isEdit = mode === "edit"; // Cek apakah form ini dalam mode edit

  // State untuk mengatur status loading, error, sukses, dan preview gambar
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [previewImage, setPreviewImage] = useState(initialData.image_url || "");

  // Fungsi saat pengguna memilih gambar
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Ambil file pertama
    if (file) {
      const ext = file.name.split(".").pop().toLowerCase(); // Ambil ekstensi file
      if (ext !== "jpg" && ext !== "jpeg") {
        setErrorMsg("File harus berformat .jpg atau .jpeg");
        return;
      }
      setErrorMsg("");
      setPreviewImage(URL.createObjectURL(file)); // Tampilkan preview
    }
  };

  // Fungsi saat form dikirim
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form); // Buat objek FormData

    const fileInput = form.elements["image"];

    // Validasi file jika mode create
    if (!isEdit) {
      const file = fileInput.files[0];
      if (!file) {
        setErrorMsg("File gambar wajib diupload");
        setLoading(false);
        return;
      }
      const ext = file.name.split(".").pop().toLowerCase();
      if (ext !== "jpg" && ext !== "jpeg") {
        setErrorMsg("File harus berformat .jpg atau .jpeg");
        setLoading(false);
        return;
      }
    }

    try {
      const endpoint = isEdit
        ? `http://localhost:5000/api/wallpapers/${slug}`
        : `http://localhost:5000/api/wallpapers`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal mengirim data");
      }

      setSuccessMsg(
        isEdit
          ? "Wallpaper berhasil diperbarui!"
          : "Wallpaper berhasil ditambahkan!"
      );

      if (!isEdit) {
        form.reset(); // Kosongkan form setelah tambah
        setPreviewImage(""); // Kosongkan preview
      }

      if (onSuccess) onSuccess(); // Jalankan callback jika ada
    } catch (error) {
      setErrorMsg(error.message); // Tampilkan error jika ada
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-base-200 p-6 rounded-lg shadow-md">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        {/* Judul */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-yellow-400">
            {isEdit
              ? `Edit Wallpaper: ${initialData.name}`
              : "Form Tambah Wallpaper"}
          </h1>
          <p className="text-gray-300 text-sm">
            {isEdit
              ? "Update informasi wallpaper di bawah ini."
              : "Silakan isi form berikut untuk menambahkan wallpaper baru."}
          </p>
        </div>

        {/* Tampilkan pesan error */}
        {errorMsg && (
          <p className="text-red-500 text-center font-semibold">{errorMsg}</p>
        )}

        {/* Tampilkan pesan sukses */}
        {successMsg && (
          <p className="text-green-500 text-center font-semibold">
            {successMsg}
          </p>
        )}

        {/* Input Nama Uploader */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-yellow-400">Nama Uploader</span>
          </label>
          <input
            type="text"
            name="uploader"
            defaultValue={initialData.uploader || ""}
            className="input input-bordered bg-base-100 text-white"
            required
          />
        </div>

        {/* Input Nama Wallpaper */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-yellow-400">Nama Wallpaper</span>
          </label>
          <input
            type="text"
            name="name"
            defaultValue={initialData.name || ""}
            className="input input-bordered bg-base-100 text-white"
            required
          />
        </div>

        {/* Input Deskripsi */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-yellow-400">Deskripsi</span>
          </label>
          <textarea
            name="description"
            rows="5"
            defaultValue={initialData.description || ""}
            className="textarea textarea-bordered bg-base-100 text-white"
            required
          ></textarea>
        </div>

        {/* Input Resolusi (tidak bisa diubah) */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-yellow-400">Resolusi</span>
          </label>
          <input
            type="text"
            name="resolution"
            value={initialData.resolution || "1920x1080"}
            disabled
            className="input input-bordered bg-neutral text-gray-400 cursor-not-allowed"
          />
        </div>

        {/* Input Gambar */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-yellow-400">Gambar</span>
          </label>
          <input
            type="file"
            name="image"
            accept=".jpg,.jpeg"
            className="file-input file-input-bordered bg-base-100 text-white"
            onChange={handleImageChange}
            {...(!isEdit && { required: true })} // Hanya wajib saat tambah
          />
          <span className="text-xs text-gray-400 mt-1 italic">
            *Gambar harus berformat .jpg atau .jpeg
          </span>
        </div>

        {/* Preview Gambar */}
        {previewImage && (
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-1">Preview Gambar:</p>
            <img
              src={previewImage}
              alt="Preview"
              className="rounded shadow max-w-xs"
            />
          </div>
        )}

        {/* Tombol Submit */}
        <div className="form-control mt-6">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-warning w-full"
          >
            {loading
              ? isEdit
                ? "Menyimpan..."
                : "Mengirim..."
              : isEdit
              ? "Simpan Perubahan"
              : "Kirim"}
          </button>
        </div>
      </form>
    </div>
  );
}
