/app
layout.jsx berfungsi sebagai memuat semua komponen halaman seperti Navbar Footer
page.jsx berfungsi sebagai memuat halaman utama atau HomePage
globals.css berfungsi style css secara globals
CSS modul yang mungkin dipakai khusus di page.jsx atau komponen tertentu.
favicon.ico adalah icon yang ada di title

/app/user/add/page.jsx
berfungsi memuat halaman Form Tambah bagi uploader atau user

/app/detail/[slug]/page.jsx
berfungsi untuk mengaambil data atau fetching data ke backend berdasarkan [id] dan akan memuat tampilan Detail.jsx

/app/user/edit/[slug]/page.jsx
berfungsi untuk melakukan edit data berdasarkan [id] dan data nya mengambil dari backend

/app/user/layout.jsx
berfungsi sebagai melakukan memanggil tampilan Sidebar.jsx pada components

/app/user/page.jsx
berfungsi sebagai melakukan memanggil tampilan Userdashboard

/app/login/page.jsx
berfungsi untuk memuat/memanggil halaman login dan tampilan nya mengambil dari components

/app/register/page.jsx
berfungsi untuk memuat/memanggil halaman register dan tampilan nya mengambil dari components


# 📁 Dokumentasi Komponen Frontend

Berikut adalah penjelasan fungsi folder `/components` beserta semua komponen yang ada di dalamnya.

---

## 📂 `/components`

Folder ini berfungsi sebagai **wadah untuk semua komponen UI** yang bersifat reusable (dapat digunakan di banyak halaman), seperti Navbar, Footer, Content, Form, dsb.

---

### 📄 `/components/Content.jsx`
Komponen utama yang menampilkan **semua wallpaper** di homepage.

---

### 📄 `/components/DashboardPage.jsx`
Komponen khusus untuk **admin**, berfungsi sebagai dashboard untuk melakukan **CRUD** (Create, Read, Update, Delete) wallpaper atau data lain.

---

### 📄 `/components/Detail.jsx`
Komponen utama untuk menampilkan **detail** dari satu wallpaper tertentu, termasuk informasi lengkapnya.

---

### 📄 `/components/Footer.jsx`
Komponen bagian bawah (footer) situs.  
Biasanya berisi informasi seperti hak cipta, link tambahan, atau kontak.

---

### 📄 `/components/FormLogin.jsx`
Form untuk halaman **login**.  
Memuat input email, password, dan tombol submit.

---

### 📄 `/components/FormRegister.jsx`
Form untuk halaman **registrasi**.  
Memuat input nama, email, password, dan tombol submit untuk mendaftar akun baru.

---

### 📄 `/components/Navbar.jsx`
Navigasi utama yang berada di bagian atas situs.  
Berisi link ke halaman utama, login, register, dashboard, dll.

---

### 📄 `/components/Sidebar.jsx`
Sidebar khusus untuk **admin**.  
Berisi menu navigasi ke dashboard admin, tambah, edit, tabel wallpaper, dll.

---

### 📄 `/components/SidebarUser.jsx`
Sidebar khusus untuk **user biasa**.  
Berisi menu navigasi ke dashboard user, edit profil, logout, dll.

---

### 📄 `/components/TabelWallpaper.jsx`
Komponen tabel yang menampilkan daftar wallpaper dalam bentuk tabel.  
Biasanya digunakan oleh admin, lengkap dengan tombol **edit** dan **hapus** untuk masing-masing wallpaper.

---

### 📄 `/components/WallpaperForm.jsx`
Form untuk **menambahkan** atau **mengedit** wallpaper.  
Biasanya berisi input seperti judul, deskripsi, dan upload file gambar.

---

## ✨ Ringkasan Komponen

| 📄 Komponen                   | 📝 Fungsi |
|-------------------------------|-----------|
| `Content.jsx`                 | Menampilkan semua wallpaper di homepage |
| `DashboardPage.jsx`           | Dashboard admin untuk CRUD |
| `Detail.jsx`                  | Menampilkan detail satu wallpaper |
| `Footer.jsx`                  | Footer situs |
| `FormLogin.jsx`               | Form login user |
| `FormRegister.jsx`            | Form registrasi user |
| `Navbar.jsx`                  | Navigasi utama (atas) |
| `Sidebar.jsx`                 | Sidebar admin |
| `SidebarUser.jsx`             | Sidebar user |
| `TabelWallpaper.jsx`          | Tabel daftar wallpaper untuk admin |
| `WallpaperForm.jsx`           | Form tambah/edit wallpaper |

---

Dokumentasi ini menjelaskan fungsi masing-masing komponen di folder `/components` pada proyek frontend wallpaper-mu.  
Jika ingin, dokumentasi untuk folder lain (`/app`, `/public`, dll.) juga bisa saya buatkan. Cukup bilang saja. 🚀


/public 
berfungsi menyimpan semua assets gambar

