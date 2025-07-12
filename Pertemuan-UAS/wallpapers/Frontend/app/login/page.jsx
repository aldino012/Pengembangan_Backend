"use client";

import FormLogin from "@/components/FormLogin";

export default function LoginPage() {
  return (
    <section className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <FormLogin />
      </div>
    </section>
  );
}
