

import { Home, Server, Users,LogOut,SquarePen} from "lucide-react";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className="w-64 h-screen bg-blue-600 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul>
        <li className="flex items-center p-2 hover:bg-blue-700 cursor-pointer">
          <Home className="w-5 h-5 mr-2" /> Dashboard
        </li>
        <li className="flex items-center p-2 hover:bg-blue-700 cursor-pointer">
        <SquarePen className="w-5 h-5 mr-2" /> Services
        </li>
        <li className="flex items-center p-2 hover:bg-blue-700 cursor-pointer">
          <Users className="w-5 h-5 mr-2" /> Users
        </li>
        <li className="flex items-center p-2 hover:bg-blue-700 cursor-pointer">
          <LogOut className="w-5 h-5 mr-2" /> Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
