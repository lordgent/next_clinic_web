import { Activity } from "lucide-react";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10 w-full ">
      <div className="container mx-auto px-4 flex flex-col md:w-[1200px] w-auto md:flex-row justify-between items-center">
        <div className="text-center w-1/3 md:text-left mb-4 md:mb-0">
          <h2 className="text-xl font-semibold flex items-center gap-2"> <Activity />HealthHub</h2>
          <p className="text-sm">Temukan layanan kesehatan terbaik di sekitarmu</p>
          <p className="text-sm">memudahkan Anda untuk mendapatkan layanan kesehatan dengan lebih cepat dan praktis
            dengan memesan tiket antrian untuk konsultasi dokter tanpa harus pergi ke rumah sakit terlebih dahulu
          </p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-blue-400"><FaFacebook size={20} /></a>
          <a href="#" className="hover:text-blue-400"><FaTwitter size={20} /></a>
          <a href="#" className="hover:text-pink-400"><FaInstagram size={20} /></a>
        </div>
      </div>
      <div className="text-center text-sm mt-4 border-t border-gray-700 pt-4">
        
        <div className="flex gap-4 items-center justify-center"> 
          
          <p className="flex gap-2  items-center">
          
          <b>HealthHub</b> All Rights Reserved.</p>
          </div>

      </div>
      <p className="text-center"> &copy; {new Date().getFullYear()} </p>
    </footer>
  );
};

export default Footer;
