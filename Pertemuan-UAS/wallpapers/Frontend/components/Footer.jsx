"use client";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Logo from "@/public/img/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-[#e0e0e0] py-10 w-full mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <Image
            src={Logo}
            alt="Logo My Wallpaper"
            width={50}
            height={50}
            className="object-contain"
          />
          <span className="text-[#fbc02d] text-2xl font-bold tracking-wide">
            My Wallpaper
          </span>
        </div>

        {/* Moto */}
        <div className="text-center italic text-[#cccccc] text-lg max-w-md">
          "Tampil Lebih Hidup dengan Wallpaper Berkualitas"
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-2xl">
          <Link
            href="#"
            className="hover:text-[#fbc02d] transition-transform hover:scale-110"
          >
            <FaFacebookF />
          </Link>
          <Link
            href="#"
            className="hover:text-[#fbc02d] transition-transform hover:scale-110"
          >
            <FaTwitter />
          </Link>
          <Link
            href="#"
            className="hover:text-[#fbc02d] transition-transform hover:scale-110"
          >
            <FaInstagram />
          </Link>
        </div>
      </div>
    </footer>
  );
}
