import React, { useEffect, useState } from "react";
import Layout from "../../../components/layouts";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailService, fetchQueue } from "../../../store/slices/service/service";
import { fetchServiceInfo } from '../../../store/slices/service-info/serviceInfoSlice';
import { fetchCekTransaction } from '../../../store/slices/transcation/transactionSlice';
import { RootState, AppDispatch } from "../../../store/store";
import { useRouter } from "next/router";
import OperationalHoursModal from "@/components/modal-operational-hours";
import { Loader2 } from 'lucide-react';
import { API_URL } from "@/config/config";

const DetailService = () => {
  const [isLoading, setIsLoading] = useState(false); 

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { name } = router.query;

  const {
    serviceDetail,
    loadingDetail,
    queue
  } = useSelector((state: RootState) => state.services);

  const {
    serviceInfo
  } = useSelector((state: RootState) => state.serviceInfo);

  const {
    cekTransaction,
    loadingTransactionCek
  } = useSelector((state: RootState) => state.transaction);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTakeQueue = (id?: string) => {
    if (!id) return alert("Clinic ID tidak tersedia");
    setIsModalOpen(true);
    dispatch(fetchQueue(id));
  };

  useEffect(() => {
    if (name) dispatch(fetchDetailService(name as string));
  }, [name, dispatch]);

  useEffect(() => {
    if (serviceDetail?.id) {
      dispatch(fetchServiceInfo(serviceDetail.id.toString()));
      dispatch(fetchCekTransaction(serviceDetail.id.toString()));
    }
  }, [serviceDetail?.id, dispatch]);

  useEffect(() => {
    if (serviceDetail?.id) {
      dispatch(fetchCekTransaction(serviceDetail.id.toString()));
    }
  }, [serviceDetail?.id, dispatch]);

  if (loadingDetail) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin w-12 h-12 text-gray-600" />
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
              src={serviceDetail?.photo ? `${API_URL}/storage/${serviceDetail.photo.replace(/\\/g, "/")}` : "/default-image.jpg"}
              alt="Foto Klinik"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-gray-600 text-lg">{serviceDetail?.name || "Tidak tersedia"}</p>
          <p className="text-gray-600 text-md">{serviceDetail?.address || "Tidak tersedia"}</p>
        </div>

        {cekTransaction && !loadingTransactionCek ? (
          <button className="w-full bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed">
            Anda sudah memiliki antrian aktif di sini
          </button>
        ) : loadingTransactionCek ? (
          <button className="w-full bg-gray-400 flex justify-center items-center text-white py-2 rounded-lg cursor-not-allowed">
            <Loader2 className="animate-spin w-4 h-4 text-gray-600" />
          </button>
        ) : (
          <button
            onClick={() => handleTakeQueue(serviceDetail?.id?.toString())}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Ambil Antrian
          </button>
        )}
      </div>

      <OperationalHoursModal 
        setLoading={setIsLoading}
      
        clinicId={serviceDetail?.id?.toString() || ""} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        services={serviceInfo} 
      />
    </Layout>
  );
};

export default DetailService;
