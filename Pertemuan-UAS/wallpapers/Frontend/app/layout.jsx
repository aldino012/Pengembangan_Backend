// Frontend/app/layout.js

// Mengimpor style global untuk seluruh halaman
import "./globals.css";

// Mengimpor komponen Navbar dan Footer dari folder components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Metadata halaman (judul dan deskripsi browser)
export const metadata = {
  title: "My Wallpaper",
  description: "Download high-quality aesthetic wallpapers",
};

// Komponen layout utama yang membungkus semua halaman
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="min-h-screen flex flex-col bg-[#1a1a2e] text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
