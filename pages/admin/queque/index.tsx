import React, { useState, useEffect } from "react";
import LayoutAdmin from "@/components/admin-layout";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchActiveQueue,
  fetchCurrentQueue,
} from "../../../store/slices/queque/quequeSlice";
import { RootState, AppDispatch } from "../../../store/store";
import Cookies from 'js-cookie';

const AntreanPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currentQueue, loadingCurrent, activeQueue } = useSelector(
    (state: RootState) => state.queque
  );

  const [clinicId, setClinicId] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const savedClinicId = localStorage.getItem("clinicId");
    if (savedClinicId) {
      setClinicId(savedClinicId);
      setIsSubmitted(true);
    }
  }, []);

  useEffect(() => {
    if (clinicId) {
      dispatch(fetchActiveQueue(clinicId));
      dispatch(fetchCurrentQueue(clinicId));
    }
  }, [clinicId, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clinicId.trim() !== "") {
      localStorage.setItem("clinicId", clinicId);
      setIsSubmitted(true);
      dispatch(fetchActiveQueue(clinicId));
      dispatch(fetchCurrentQueue(clinicId));
    } else {
      alert("Masukkan Clinic ID terlebih dahulu!");
    }
  };

  const handleApprove = async (id: string) => {
    try {
        const token = Cookies.get('token');
        const response = await fetch('http://185.170.198.166:8000/api/admin/transaction-update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ "transaction_id": id }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Berhasil memperbarui transaksi!');
        } else {
            console.error('Gagal memperbarui transaksi:', data);
        }
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
};

  const handleResetClinicId = () => {
    localStorage.removeItem("clinicId");
    setClinicId("");
    setIsSubmitted(false);
  };

  return (
    <LayoutAdmin>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Daftar Antrean</h1>

        {!isSubmitted ? (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md"
          >
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Masukkan Clinic ID:
            </label>
            <input
              type="text"
              value={clinicId}
              onChange={(e) => setClinicId(e.target.value)}
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Contoh: 123e4567-e89b-12d3-a456-426614174000"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Lihat Antrian
            </button>
          </form>
        ) : (
          <div className="overflow-x-auto">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-lg font-semibold">Antrian Aktif {currentQueue === null ? "-" :currentQueue?.queue_number}</p>
              <button
                onClick={handleResetClinicId}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Ganti Clinic ID
              </button>
            </div>
            <table className="w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">No</th>
                  <th className="border p-2">Nama Pasien</th>
                  <th className="border p-2">Nomor Antrean</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {!activeQueue.length ? <p>Belum ada Antrian</p> : activeQueue?.map((queue, index) => (
                  <tr key={queue.id} className="border text-center">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{queue.patient_name}</td>
                    <td className="border p-2 font-semibold">
                      {queue.queue_number}
                    </td>
                    <td className="border p-2">
                      <span
                        className={`px-2 py-1 text-white text-sm rounded ${getStatusColor(
                          queue.status
                        )}`}
                      >
                        {queue.status}
                      </span>
                    </td>
                    <td className="border p-2">
                      {queue.status === "called" && (
                        <div className="flex items-center justify-center gap-4">
                            <button
                          onClick={() =>
                            alert(`Antrean ${queue.queue_number} dilewati!`)
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Skip
                        </button>
                        <button
        onClick={() => handleApprove(queue.id as string)}
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
    >
        Approve
    </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </LayoutAdmin>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "waiting":
      return "bg-yellow-500";
    case "called":
      return "bg-blue-500";
    case "missed":
      return "bg-red-500";
    case "completed":
      return "bg-green-500";
    case "cancel":
      return "bg-gray-400";
    default:
      return "bg-gray-200";
  }
};

export default AntreanPage;
