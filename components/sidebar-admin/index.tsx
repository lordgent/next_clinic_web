import { Home, Users, LogOut, SquarePen, Logs } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie"; // Pastikan sudah menginstal js-cookie
import { useRouter } from "next/router";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <div className="w-64 h-screen bg-blue-600 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul>
        <li className="flex items-center p-2 hover:bg-blue-700 cursor-pointer">
          <Link href="/admin/dashboard" className="flex items-center">
            <Home className="w-5 h-5 mr-2" /> Dashboard
          </Link>
        </li>
        <li className="flex items-center p-2 hover:bg-blue-700 cursor-pointer">
          <Link href="/admin/queque" className="flex items-center">
            <Logs
              className="w-5
              h-5 mr-2"
            />
            Antrian
          </Link>
        </li>
        <li className="flex items-center p-2 hover:bg-blue-700 cursor-pointer">
          <Link href="/admin/clinics" className="flex items-center">
            <SquarePen
              className="w-5
              h-5 mr-2"
            />
            Layanan
          </Link>
        </li>
        <li
          onClick={handleLogout}
          className="flex items-center p-2 hover:bg-blue-700 cursor-pointer"
        >
          <LogOut className="w-5 h-5 mr-2" /> Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
