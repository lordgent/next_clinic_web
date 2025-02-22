import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { formatRupiah } from "@/utils/formatNumber";
import { Loader2 } from "lucide-react";
import { API_URL } from "@/config/config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Service {
  id: string;
  name: string;
  price: string;
}

interface OperationalHoursModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  clinicId: string;
  setLoading: (loading: boolean) => void;
}

const OperationalHoursModal: React.FC<OperationalHoursModalProps> = ({
  isOpen,
  onClose,
  clinicId,
  services,
  setLoading,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleServiceSelection = (serviceId: string) => {
    setSelectedServiceId(serviceId);
  };

  if (!isOpen) return null;

  const isSubmitEnabled = Boolean(selectedServiceId);

  const onSubmit = async () => {
    setIsSubmitting(true);
    setLoading(true);
    try {
      const token = Cookies.get("token");
      const formattedDate = selectedDate ? format(selectedDate, "dd-MM-yyyy") : "";

      const response = await fetch(`${API_URL}/api/user/transaction`, {
        method: "POST",
        body: JSON.stringify({
          clinic_id: clinicId,
          service_info_id: selectedServiceId,
          booking_date: formattedDate,

        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) window.location.reload();
    } catch (error) {
      alert("Terjadi kesalahan jaringan");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 md:p-8" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg transform transition-all max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-semibold mb-4">Tanggal Booking dan Pilihan Service</h2>

        {/* Date Picker */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-4">Tanggal Booking</h3>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd-MM-yyyy"
            locale={id}
            inline
            className="border p-2 rounded-lg w-full"
          />
        </div>

        {/* Service List */}
        {services.length > 0 ? (
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-4">Pilih Layanan</h3>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.id} className={`border p-4 rounded-lg shadow-md transition-all ${selectedServiceId === service.id ? "bg-blue-200" : "hover:bg-blue-100"}`}>
                  <div className="flex flex-col space-y-2">
                    <span className="font-medium text-lg">{service.name}</span>
                    <span className="text-sm text-gray-600">Harga: {formatRupiah(parseInt(service.price))}</span>
                  </div>
                  <button onClick={() => handleServiceSelection(service.id)} className="bg-blue-600 text-white py-1 px-4 rounded-md w-full mt-2">
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
        <button onClick={onSubmit} disabled={!isSubmitEnabled || isSubmitting} className={`mt-4 w-full py-2 rounded-lg flex justify-center items-center ${isSubmitEnabled && !isSubmitting ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}>
          {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : "Pesan"}
        </button>

        <button onClick={onClose} className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600" disabled={isSubmitting}>
          Tutup
        </button>
      </div>
    </div>
  );
};

export default OperationalHoursModal;
