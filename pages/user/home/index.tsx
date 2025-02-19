import React from "react";
import {
  FaHospitalUser

} from "react-icons/fa";
import CardList from '../../../components/card'
import Layout from "../../../components/layouts";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../store/slices/categorySlice';
import { fetchService } from '../../../store/slices/service/service';
import { RootState,AppDispatch } from '../../../store/store';

const HomePage = () => {

  const dispatch: AppDispatch = useDispatch(); // Menggunakan AppDispatch
  const { categories, loading, error } = useSelector((state: RootState) => state.category);
  const { service } = useSelector((state: RootState) => state.services);

  React.useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchService())
  }, [dispatch]);

  return (
    <Layout>
    <div className="flex flex-col gap-4">
    <div
  className="w-full h-[200px] md:h-[400px] flex items-center text-sm md:text-xl font-semibold text-gray-700 p-4"
  style={{
    backgroundImage: `url('/images/banner.svg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <p className="text-white max-w-[80%] md:max-w-[50%] text-md md:text-2xl font-bold rounded-lg px-2 md:px-4 py-2">
    HealthHub – Solusi Cerdas, Layanan Kesehatan Tanpa Lama Antre di Rumah Sakit
  </p>
</div>



      <div className="flex flex-col gap-6">
        <h3 className="text-xl font-semibold">Layanan</h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex items-center shadow gap-3 bg-white p-4 transition-all cursor-pointer"
            >
              <FaHospitalUser className="w-6 h-6 text-blue-600"/>
              <span className=" text-sm md:text-lg font-semibold">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="text-xl font-semibold">Populer</h3>
        <CardList cards={service} />
      </div>
    </div>
    </Layout>
  );
};

export default HomePage;
