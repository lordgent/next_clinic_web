import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { API_URL } from "@/config/config";
import LayoutAdmin from "@/components/admin-layout";

interface Category {
  id: string;
  name: string;
}

const CreateClinicForm: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    address: "",
    phone: "",
    photo: "",
  });
  const [loading, setLoading] = useState(false);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/api/admin/categories`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${API_URL}/api/admin/clinic`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      alert("Terjadi kesalahan!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutAdmin>

    
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Tambah Klinik</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nama Klinik" value={formData.name} onChange={handleChange} className="w-full p-2 mb-3 border rounded" required />
        <select name="category_id" value={formData.category_id} onChange={handleChange} className="w-full p-2 mb-3 border rounded" required>
          <option value="">Pilih Kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <input type="text" name="address" placeholder="Alamat" value={formData.address} onChange={handleChange} className="w-full p-2 mb-3 border rounded" required />
        <input type="text" name="phone" placeholder="Telepon" value={formData.phone} onChange={handleChange} className="w-full p-2 mb-3 border rounded" required />
        <input type="file" onChange={handleFileChange} className="w-full p-2 mb-3 border rounded" accept="image/*" />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
    </LayoutAdmin>
  );
};

export default CreateClinicForm;
