// 1. Import komponen WallpaperForm
import WallpaperForm from "@/components/WallpaperForm";

// 2. Buat fungsi EditPage yang menerima props
export default async function EditPage(props) {

  // 3. Dapatkan parameter dari props
  const params = await props.params; // hindari destruktur langsung

  // 4. Dapatkan slug dari parameter
  const slug = params.slug;

  // 5. Buat URL untuk mengambil data wallpaper dari API
  const baseUrl = "http://localhost:5000";

  // 6. Lakukan request GET ke API untuk mengambil data wallpaper
  const res = await fetch(`${baseUrl}/api/wallpapers/${slug}`, {
    cache: "no-store",
  });

  // 7. Periksa apakah response OK
  if (!res.ok) {
    // 8. Jika tidak OK, tampilkan pesan error
    return (
      <p className="text-red-500 text-center mt-10">
        Wallpaper tidak ditemukan
      </p>
    );
  }

  // 9. Dapatkan data dari response
  const data = await res.json();

  // 10. Buat objek initialData yang berisi data dari API
  const initialData = {
    uploader: data.uploader,
    name: data.name,
    description: data.description,
    resolution: data.resolution,
    image_url: data.image_url?.startsWith("http")
      ? data.image_url
      : `${baseUrl}${data.image_url}`,
  };

  // 11. Return komponen yang berisi form edit wallpaper
  return (
    <main className="p-6 w-full">
      <h2 className="text-xl font-bold mb-4 text-[#fbc02d] text-center">Edit Wallpaper</h2>
      <div className="p-4 bg-[#1a1a2e] rounded-lg">
        <WallpaperForm mode="edit" slug={slug} initialData={initialData} />
      </div>
    </main>
  );
}

