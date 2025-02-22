import React, { useEffect, useState } from "react";
import { API_URL } from "@/config/config";
import Link from "next/link";
import Cookies from 'js-cookie';
import LayoutAdmin from "@/components/admin-layout";
import { Plus } from "lucide-react";

interface Clinic {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  photo: string;
  price: string;
}

const ClinicList: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await fetch(`${API_URL}/api/admin/all-clinics`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setClinics(data.data);
      } catch (error) {
        console.error("Error fetching clinics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClinics();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <LayoutAdmin>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Daftar Klinik</h1>
      <button
      className="mb-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
      onClick={() => window.location.href = "/admin/create-clinic"}
    >
      <Plus size={18} />
      Tambahkan Klinik
    </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clinics.map((clinic) => (
          <div key={clinic.id} className="border rounded-lg shadow-md p-4">
            <img
              src={clinic?.photo ? `${API_URL}/storage/${clinic.photo.replace(/\\/g, "/")}` : "/default-image.jpg"}
              alt={clinic.name}
              width={300}
              height={200}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4">{clinic.name}</h2>
            <p className="text-gray-600">{clinic.category}</p>
            <p className="text-gray-500 mt-1">{clinic.address}</p>
            <Link
              href={`/clinic/${clinic.id}`}
              className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Lihat Detail
            </Link>
          </div>
        ))}
      </div>
    </div>
    </LayoutAdmin>
  );
};

export default ClinicList;