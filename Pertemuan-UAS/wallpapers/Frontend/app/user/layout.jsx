import UserSidebar from "@/components/SidebarUser";

export default function UserLayout({ children }) {
  return (
    <div className="flex">
      <UserSidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
