import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { formatRupiah } from "@/utils/formatNumber";
import { Loader2 } from "lucide-react";

interface Service {
  id: string;
  name: string;
  price: string;
}

interface OperationalHours {
  id: string;
  day: string;
  quota: number;
  available_date: string;
  open_time: string;
  close_time: string;
}

interface OperationalHoursModalProps {
  isOpen: boolean;
  onClose: () => void;
  operationalHours: OperationalHours[];
  services: Service[];
  clinicId: string;
  setLoading: (loading: boolean) => void; 
}

const OperationalHoursModal: React.FC<OperationalHoursModalProps> = ({
  isOpen,
  onClose,
  clinicId,
  operationalHours,
  services,
  setLoading,
}) => {
  const [selectedHourId, setSelectedHourId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ State loading untuk modal

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleHourSelection = (id: string) => {
    setSelectedHourId(id);
  };

  const handleServiceSelection = (serviceId: string) => {
    setSelectedServiceId(serviceId);
  };

  if (!isOpen) return null;

  const isSubmitEnabled = selectedHourId && selectedServiceId;

  const onSubmit = async (selectedHourId: string, selectedServiceId: string) => {
    setIsSubmitting(true); 
    setLoading(true); 

    const payload = {
      clinic_id: clinicId,
      booking_id: selectedHourId,
      service_info_id: selectedServiceId,
    };

    try {
      const token = Cookies.get("token");
      const response = await fetch("http://185.170.198.166:8000/api/user/transaction", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        window.location.reload
      }
    } catch (error) {
      alert("Terjadi kesalahan jaringan");
    } finally {
      setIsSubmitting(false); 
      setLoading(false); 
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg transform transition-all scale-95 opacity-100 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Jam Operasional dan Pilihan Service</h2>

        {/* Operational Hours List */}
        {operationalHours.length > 0 ? (
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-4">Jam Operasional</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {operationalHours.map((item) => (
                <li
                  key={item.id}
                  className={`border p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out ${
                    selectedHourId === item.id ? "bg-blue-200 opacity-80" : "hover:bg-blue-100"
                  }`}
                >
                  <div className="flex flex-col space-y-2">
                    <span className="font-medium text-lg">{item.day}</span>
                    <span className="text-sm text-gray-600">Kuota Tersedia: {item.quota}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Jam Operasional: {item.open_time} - {item.close_time}
                  </div>
                  <button
                    onClick={() => handleHourSelection(item.id)}
                    className="bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out w-full mt-2"
                  >
                    {selectedHourId === item.id ? "Terpilih" : "Pilih"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 text-center mb-6">Tidak ada data antrian.</p>
        )}

        {/* Service List */}
        {services.length > 0 ? (
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-4">Pilih Layanan</h3>
            <ul className="space-y-4">
              {services.map((service) => (
                <li
                  key={service.id}
                  className={`border p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out ${
                    selectedServiceId === service.id ? "bg-blue-200 opacity-80" : "hover:bg-blue-100"
                  }`}
                >
                  <div className="flex flex-col space-y-2">
                    <span className="font-medium text-lg">{service.name}</span>
                    <span className="text-sm text-gray-600">Harga: {formatRupiah(parseInt(service.price))}</span>
                  </div>
                  <button
                    onClick={() => handleServiceSelection(service.id)}
                    className="bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out w-full mt-2"
                  >
                    {selectedServiceId === service.id ? "Terpilih" : "Pilih"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Tidak ada pilihan service tersedia.</p>
        )}

        {/* Submit Button */}
        <button
          onClick={() => {
            if (selectedHourId && selectedServiceId) {
              onSubmit(selectedHourId, selectedServiceId);
            }
          }}
          disabled={!isSubmitEnabled || isSubmitting}
          className={`mt-4 w-full py-2 rounded-lg transition flex justify-center items-center ${
            isSubmitEnabled && !isSubmitting
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : "Pesan"}
        </button>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          disabled={isSubmitting}
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default OperationalHoursModal;
