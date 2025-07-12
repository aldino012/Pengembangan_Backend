// app/components/UserSidebar.jsx
"use client";
import Link from "next/link";

export default function UserSidebar() {
  return (
    <aside className="w-full md:w-64 bg-[#1a1a2e] p-4 border-b md:border-b-0 md:border-r border-[#bfa930]">
      <h2 className="text-xl font-bold mb-6 text-[#fbc02d]">User Dashboard</h2>
      <ul className="flex flex-row md:flex-col gap-2 md:space-y-2 overflow-x-auto md:overflow-x-visible">
        <li className="flex-shrink-0">
          <Link
            href="/user"
            className="block p-3 rounded-lg hover:bg-[#2d2d44] text-[#e0e0e0] hover:text-[#fbc02d] transition-colors whitespace-nowrap"
          >
            Your Profile
          </Link>
        </li>
      </ul>
    </aside>
  );
}
