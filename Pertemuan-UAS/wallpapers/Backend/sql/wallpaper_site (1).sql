-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 09, 2025 at 06:56 AM
-- Server version: 8.0.42-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wallpaper_site`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin','uploader') DEFAULT 'user',
  `photo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `photo`, `created_at`, `updated_at`) VALUES
(1, 'aldino012', 'yozukakit@gmail.com', '$2b$10$rgPlfJz85tkRPbvDI5Hsz.ah74VI07QAOW3DEoGNiWYPd5vtl2Xaa', 'user', '1749383179586.png', '2025-06-08 11:46:19', '2025-06-08 11:46:19');

-- --------------------------------------------------------

--
-- Table structure for table `wallpapers`
--

CREATE TABLE `wallpapers` (
  `id` int NOT NULL,
  `uploader` varchar(100) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text,
  `resolution` varchar(20) DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `wallpapers`
--

INSERT INTO `wallpapers` (`id`, `uploader`, `name`, `description`, `resolution`, `image_url`, `created_at`) VALUES
(2, 'Van Gogh Agung', 'Elter of Humans Apes', 'Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus.', '1920x1080', '/uploads/resized-image-1749385451183.jpg', '2025-06-08 12:24:11'),
(3, 'Bapak Supono', 'Burung Kakak Tua', 'Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus.', '1920x1080', '/uploads/resized-image-1749385550937.jpg', '2025-06-08 12:25:50'),
(4, 'Ahmed', 'Gunung Everest', 'Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus.', '1920x1080', '/uploads/resized-image-1749385650999.jpg', '2025-06-08 12:27:31'),
(5, 'Jane', 'Amerika Nevada', 'Nevada adalah sebuah negara bagian di wilayah barat Amerika Serikat yang dikenal dengan lanskap gurun yang luas, pegunungan terjal, dan iklim kering. Ibu kotanya adalah Carson City, namun kota terbesarnya adalah Las Vegas, yang terkenal sebagai pusat hiburan dunia dengan kasino, pertunjukan mewah, dan kehidupan malam yang gemerlap. Selain Las Vegas, Reno juga dikenal sebagai kota hiburan dengan julukan \"The Biggest Little City in the World.\" Nevada memiliki sejarah yang erat dengan industri pertambangan, terutama emas dan perak, yang mendorong pertumbuhan wilayah ini sejak abad ke-19. Negara bagian ini juga dikenal karena kebijakan hukumnya yang lebih longgar dibandingkan banyak negara bagian lain, seperti legalisasi perjudian, pernikahan cepat, dan beberapa bentuk industri hiburan dewasa. Meskipun sebagian besar wilayahnya terdiri dari gurun seperti Mojave dan Great Basin, Nevada juga menawarkan keindahan alam seperti Danau Tahoe, Pegunungan Sierra Nevada, dan Taman Nasional Great Basin. Budaya Nevada merupakan perpaduan antara warisan Barat Amerika, pengaruh penduduk asli, dan modernitas yang mencolok, menjadikannya salah satu negara bagian yang unik dalam karakter dan daya tariknya.\r\n', '1920x1080', '/uploads/resized-image-1749385865305.jpg', '2025-06-08 12:31:05'),
(6, 'Quan IM', 'Mongol Warior', 'Tentara Mongol adalah salah satu kekuatan militer paling tangguh dan ditakuti dalam sejarah dunia, terutama pada abad ke-13 di bawah kepemimpinan Jenghis Khan dan penerusnya. Pasukan ini terkenal karena mobilitas luar biasa, disiplin tinggi, strategi militer cerdas, dan kemampuan bertempur di berbagai medan, dari padang rumput Asia Tengah hingga kota-kota besar di Timur Tengah dan Eropa Timur. Mayoritas prajuritnya adalah pasukan kavaleri ringan yang sangat terlatih dalam berkuda dan memanah, memungkinkan mereka melakukan serangan kilat dan manuver yang mengecoh lawan. Tentara Mongol juga unggul dalam penggunaan taktik psikologis, seperti menyebarkan ketakutan lewat pembantaian massal atau menggunakan mata-mata untuk mengumpulkan informasi sebelum menyerang. Mereka memiliki sistem komando yang efisien dengan struktur desimal, serta mampu beradaptasi dengan teknologi dan taktik musuh yang mereka hadapi, seperti menggunakan mesin pengepung dari bangsa Tiongkok saat mengepung kota-kota besar. Kekuatan dan strategi mereka memungkinkan Kekaisaran Mongol berkembang menjadi kekaisaran darat terbesar dalam sejarah, membentang dari Asia Timur hingga Eropa Timur, dan meninggalkan jejak besar dalam geopolitik dan peradaban dunia.\r\n', '1920x1080', '/uploads/resized-image-1749385947521.jpg', '2025-06-08 12:32:27'),
(7, 'Soeharto', 'Presiden Soerharto', 'Presiden Soeharto adalah pemimpin kedua Republik Indonesia yang menjabat dari tahun 1967 hingga 1998, menjadikannya presiden dengan masa kekuasaan terlama dalam sejarah Indonesia. Lahir pada 8 Juni 1921 di Kemusuk, Yogyakarta, Soeharto berasal dari latar belakang militer dan mulai dikenal luas setelah perannya dalam menumpas Gerakan 30 September (G30S) pada tahun 1965, yang kemudian membuka jalan baginya untuk menggantikan Soekarno. Ia membentuk rezim Orde Baru yang berfokus pada stabilitas politik, pertumbuhan ekonomi, dan modernisasi infrastruktur nasional. Di bawah pemerintahannya, Indonesia mencatat pertumbuhan ekonomi yang pesat, program swasembada pangan, serta pembangunan besar-besaran melalui program seperti Repelita (Rencana Pembangunan Lima Tahun). Namun, masa kekuasaannya juga ditandai dengan praktik korupsi yang meluas, pembatasan kebebasan pers, pelanggaran hak asasi manusia, serta kekuasaan yang sangat terpusat. Soeharto dikenal sebagai figur yang kharismatik tetapi otoriter, dan dukungan militer menjadi salah satu pilar utama kekuasaannya. Ia akhirnya mengundurkan diri pada Mei 1998 setelah gelombang reformasi dan krisis ekonomi Asia mengguncang Indonesia, menandai berakhirnya Orde Baru dan dimulainya era reformasi. Warisan politiknya masih menjadi topik kontroversial, dengan sebagian masyarakat mengenangnya sebagai bapak pembangunan, sementara yang lain mengkritiknya sebagai simbol otoritarianisme dan nepotisme.', '1920x1080', '/uploads/resized-image-1749386003620.jpeg', '2025-06-08 12:33:23'),
(9, 'random guy', 'Random 2', 'Presiden Soeharto adalah pemimpin kedua Republik Indonesia yang menjabat dari tahun 1967 hingga 1998, menjadikannya presiden dengan masa kekuasaan terlama dalam sejarah Indonesia. Lahir pada 8 Juni 1921 di Kemusuk, Yogyakarta, Soeharto berasal dari latar belakang militer dan mulai dikenal luas setelah perannya dalam menumpas Gerakan 30 September (G30S) pada tahun 1965, yang kemudian membuka jalan baginya untuk menggantikan Soekarno. Ia membentuk rezim Orde Baru yang berfokus pada stabilitas politik, pertumbuhan ekonomi, dan modernisasi infrastruktur nasional. Di bawah pemerintahannya, Indonesia mencatat pertumbuhan ekonomi yang pesat, program swasembada pangan, serta pembangunan besar-besaran melalui program seperti Repelita (Rencana Pembangunan Lima Tahun). Namun, masa kekuasaannya juga ditandai dengan praktik korupsi yang meluas, pembatasan kebebasan pers, pelanggaran hak asasi manusia, serta kekuasaan yang sangat terpusat. Soeharto dikenal sebagai figur yang kharismatik tetapi otoriter, dan dukungan militer menjadi salah satu pilar utama kekuasaannya. Ia akhirnya mengundurkan diri pada Mei 1998 setelah gelombang reformasi dan krisis ekonomi Asia mengguncang Indonesia, menandai berakhirnya Orde Baru dan dimulainya era reformasi. Warisan politiknya masih menjadi topik kontroversial, dengan sebagian masyarakat mengenangnya sebagai bapak pembangunan, sementara yang lain mengkritiknya sebagai simbol otoritarianisme dan nepotisme.\r\n', '1920x1080', '/uploads/resized-image-1749386475909.jpg', '2025-06-08 12:41:16'),
(10, 'random guy', 'Random 3', 'Presiden Soeharto adalah pemimpin kedua Republik Indonesia yang menjabat dari tahun 1967 hingga 1998, menjadikannya presiden dengan masa kekuasaan terlama dalam sejarah Indonesia. Lahir pada 8 Juni 1921 di Kemusuk, Yogyakarta, Soeharto berasal dari latar belakang militer dan mulai dikenal luas setelah perannya dalam menumpas Gerakan 30 September (G30S) pada tahun 1965, yang kemudian membuka jalan baginya untuk menggantikan Soekarno. Ia membentuk rezim Orde Baru yang berfokus pada stabilitas politik, pertumbuhan ekonomi, dan modernisasi infrastruktur nasional. Di bawah pemerintahannya, Indonesia mencatat pertumbuhan ekonomi yang pesat, program swasembada pangan, serta pembangunan besar-besaran melalui program seperti Repelita (Rencana Pembangunan Lima Tahun). Namun, masa kekuasaannya juga ditandai dengan praktik korupsi yang meluas, pembatasan kebebasan pers, pelanggaran hak asasi manusia, serta kekuasaan yang sangat terpusat. Soeharto dikenal sebagai figur yang kharismatik tetapi otoriter, dan dukungan militer menjadi salah satu pilar utama kekuasaannya. Ia akhirnya mengundurkan diri pada Mei 1998 setelah gelombang reformasi dan krisis ekonomi Asia mengguncang Indonesia, menandai berakhirnya Orde Baru dan dimulainya era reformasi. Warisan politiknya masih menjadi topik kontroversial, dengan sebagian masyarakat mengenangnya sebagai bapak pembangunan, sementara yang lain mengkritiknya sebagai simbol otoritarianisme dan nepotisme.\r\n', '1920x1080', '/uploads/resized-image-1749386489446.jpg', '2025-06-08 12:41:29'),
(11, 'Black Pink', 'Black pink', 'BLACKPINK adalah grup musik perempuan asal Korea Selatan yang dibentuk oleh agensi YG Entertainment dan resmi debut pada 8 Agustus 2016. Terdiri dari empat anggota—Jisoo, Jennie, Rosé, dan Lisa—BLACKPINK dengan cepat meraih popularitas global berkat perpaduan gaya musik K-pop, hip-hop, EDM, dan pop modern yang energik dan catchy. Mereka dikenal tidak hanya karena lagu-lagu hits seperti “Ddu-Du Ddu-Du,” “Kill This Love,” dan “How You Like That,” tetapi juga karena penampilan panggung yang kuat, visual memukau, serta koreografi yang dinamis dan presisi. BLACKPINK juga menjadi ikon fashion dunia, dengan setiap anggota menjadi duta merek untuk berbagai rumah mode mewah seperti Chanel, Dior, Celine, dan Yves Saint Laurent. Kesuksesan mereka tidak hanya terbatas di Korea, melainkan juga mendunia, menjadikan mereka salah satu grup K-pop pertama yang tampil di festival musik internasional bergengsi seperti Coachella dan memiliki basis penggemar besar yang dikenal sebagai BLINK. Dengan pencapaian di tangga lagu global, YouTube, dan berbagai penghargaan musik internasional, BLACKPINK telah menjadi simbol kekuatan \"girl group\" modern yang mampu menjembatani budaya Timur dan Barat di industri hiburan global.', '1920x1080', '/uploads/resized-image-1749387016943.jpg', '2025-06-08 12:50:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `wallpapers`
--
ALTER TABLE `wallpapers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `wallpapers`
--
ALTER TABLE `wallpapers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
