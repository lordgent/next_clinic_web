import React, { useEffect } from "react";

interface OperationalHoursModalProps {
  isOpen: boolean;
  onClose: () => void;
  operationalHours: any[];
  onSelectHour: (availableDate: string) => void;
}

const OperationalHoursModal: React.FC<OperationalHoursModalProps> = ({
  isOpen,
  onClose,
  operationalHours,
  onSelectHour,
}) => {
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-1/2 transform transition-all scale-95 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Jam Operasional</h2>
        {operationalHours.length > 0 ? (
        
        <div className="max-h-[400px] overflow-auto">
  <ul className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {operationalHours.map((item, index) => (
      <li key={index} className="border p-4 rounded-lg shadow-md flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <span className="font-medium text-lg">{item.day}</span>
          <span className="text-sm text-gray-600">Kuota Tersedia: {item.quota}</span>
          <button
            onClick={() => onSelectHour(item.available_date)}
            className="bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
          >
            Pilih
          </button>
        </div>

        <div className="text-sm text-gray-500">
          Jam Operasional: {item.open_time} - {item.close_time}
        </div>
      </li>
    ))}
  </ul>
</div>

        ) : (
          <p className="text-gray-500 text-center">Tidak ada data antrian.</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default OperationalHoursModal;
