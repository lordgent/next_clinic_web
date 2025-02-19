import { useState } from "react";

import { Activity, Menu, Search, User } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop,setIsDesktop]= useState(false);

  return (
    <div className="bg-blue-600 w-full flex items-center justify-center py-4">
      <div className="w-full max-w-[1200px] flex justify-between items-center px-6">
        <Link href="/user/home" className="text-white flex items-center text-xl font-bold">
        <Activity />
        HealthHub
        </Link>

        <div className="hidden md:flex items-center bg-white rounded-lg p-2">
          <Search className="text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 outline-none w-full"
          />
        </div>

        <div className="items-center flex">

        <div 
            onClick={() => setIsDesktop(!isDesktop)} 
             className="text-white bg-white hidden md:flex border border-white rounded-full p-2">
            <User size={22} className="text-blue-600"   />
          </div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white ml-4"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

    {isDesktop && (
      <div className="absolute hidden top-14 right-40 w-[250px] bg-blue-600 p-4 space-y-2 md:block">
      <Link href="/profile" className="block text-white">
        Profil Saya
      </Link>
      <Link href="/user/transaction" className="block text-white">
        Histori Transaksi
      </Link>
      <Link href="/logout" className="block text-white">
        Logout
      </Link>
    </div>
    )}

      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-blue-600 p-4 space-y-2 md:hidden">
          <Link href="/profile" className="block text-white">
            Profil Saya
          </Link>
          <Link href="/user/transaction" className="block text-white">
            Histori Transaksi
          </Link>
          <Link href="/logout" className="block text-white">
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
