import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
  { id: 1, text: "Promo Spesial Hari Ini!", bgColor: "bg-gray-200" },
  { id: 2, text: "Diskon hingga 50%!", bgColor: "bg-gray-200" },
  { id: 3, text: "Gratis Ongkir untuk Pembelian di atas Rp 100.000!", bgColor: "bg-gray-200" },
];

const BannerCarousel = ({ tkl }:any) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
<div className="w-[1200px] h-[350px] mt-10 pt-10 overflow-hidden flex flex-col items-center justify-center relative top-4">
<AnimatePresence mode="wait">
        <motion.div
          key={banners[index].id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className={`w-full h-full text-center text-white font-semibold py-4 ${banners[index].bgColor}`}
        >
          {banners[index].text} {tkl}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default BannerCarousel
