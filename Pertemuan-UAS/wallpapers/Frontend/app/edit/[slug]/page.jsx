// app/edit/[slug]/page.jsx
import WallpaperForm from "@/components/WallpaperForm";

// Fungsi EditPage akan menerima props yang berisi parameter URL
export default async function EditPage(props) {
  // Dapatkan parameter slug dari props
  const { slug } = props.params;

  // Buat URL untuk mengambil data wallpaper dari API
  const baseUrl = "http://localhost:5000";

  // Lakukan request GET ke API untuk mengambil data wallpaper
  const res = await fetch(`${baseUrl}/api/wallpapers/${slug}`, {
    // Jangan cache response agar data selalu up-to-date
    cache: "no-store",
  });

  // Jika response tidak OK, tampilkan pesan error
  if (!res.ok) {
    return (
      <p className="text-red-500 text-center mt-10">
        Wallpaper tidak ditemukan
      </p>
    );
  }

  // Dapatkan data dari response
  const data = await res.json();

  // Buat objek initialData yang berisi data dari API
  const initialData = {
    // Ambil nilai uploader dari data API
    uploader: data.uploader,
    // Ambil nilai name dari data API
    name: data.name,
    // Ambil nilai description dari data API
    description: data.description,
    // Ambil nilai resolution dari data API
    resolution: data.resolution,
    // Jika image_url tidak ada, gabungkan dengan baseUrl
    image_url: data.image_url?.startsWith("http")
      ? data.image_url
      : `${baseUrl}${data.image_url}`,
  };

  // Return komponen yang berisi form edit wallpaper
  return (
    <main className="min-h-screen bg-[#1a1a2e] py-10 px-4">
      <WallpaperForm
        // Mode edit untuk mengedit wallpaper yang sudah ada
        mode="edit"
        // Slug yang akan diedit
        slug={slug}
        // Data awal yang akan ditampilkan di form
        initialData={initialData}
      />
    </main>
  );
}

