import Sidebar from "../../components/Sidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar />
      <main className="ml-64 flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
