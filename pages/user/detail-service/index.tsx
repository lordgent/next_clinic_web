import React, { useEffect, useState } from "react";
import Layout from "../../../components/layouts";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailService, fetchQueue } from "../../../store/slices/service/service";
import { RootState, AppDispatch } from "../../../store/store";
import { useRouter } from "next/router";
import { formatRupiah } from "@/utils/formatNumber";
import OperationalHoursModal from "@/components/modal-operational-hours";

interface QueueInfo {
  currentNumber: number;
}

const DetailService = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { name } = router.query;
  const { serviceDetail, loadingDetail } = useSelector((state: RootState) => state.services);
  const { queue, loadingQueue } = useSelector((state: RootState) => state.services);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queueInfo, setQueueInfo] = useState<QueueInfo | null>(null);

  const handleTakeQueue = (id: string) => {
    if (!id) {
      alert("Clinic ID tidak tersedia");
      return;
    }
    
    setIsModalOpen(true);
    dispatch(fetchQueue(id))
      .then(() => {
        // Logic after fetching queue
        // Example, display queue number or update UI
        setQueueInfo({ currentNumber: Math.floor(Math.random() * 100) + 1 });
      })
      .catch((error) => {
        console.error("Error fetching queue:", error);
      });
  };

  const handleSelectedHour = () =>{
    console.log('http://185.170.198.166:8000/storage/' + serviceDetail?.photo.replace(/\\/g, "/") )

  }

  useEffect(() => {
    if (name) {
      dispatch(fetchDetailService(name as string));
    }
  }, [dispatch, name]);

  if (loadingDetail) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Detail Layanan</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Informasi Klinik</h2>
          <div className="w-full h-[180px] md:h-[350px]">
            <img
              src={serviceDetail?.photo ? `http://185.170.198.166:8000/storage/${serviceDetail.photo.replace(/\\/g, "/")}` : "/default-image.jpg"}
              alt="Foto Klinik"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-gray-600">Nama Klinik: {serviceDetail?.name || "Tidak tersedia"}</p>
          <p className="text-gray-600">Alamat: {serviceDetail?.address || "Tidak tersedia"}</p>
          <p className="text-gray-600">
            Harga Start from: {serviceDetail?.price ? formatRupiah(Number(serviceDetail.price.replace(/\./g, ""))) : "N/A"}
          </p>
        </div>

        <button
          onClick={() => handleTakeQueue(serviceDetail?.id ? String(serviceDetail.id) : '')}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Ambil Antrian
        </button>
      </div>
      <OperationalHoursModal onSelectHour={handleSelectedHour} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} operationalHours={queue} />
    </Layout>
  );
};

export default DetailService;
