import React from 'react';

const Home = () => {
  const handleClick = ()=> {
    window.location.href = "/login"
  }
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <section className="bg-blue-600 text-white text-center py-16 px-4">
        <h1 className="text-4xl font-bold">HealthHub</h1>
        <p className="mt-4 text-lg">
          Web Pemesanan Tiket Antrian untuk Layanan Kesehatan
        </p>
        <p className="mt-2 text-sm">Memudahkan Anda mendapatkan layanan kesehatan dengan lebih cepat dan praktis.</p>
        <button onClick={handleClick} className="mt-8 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-400">
          Mulai Sekarang
        </button>
      </section>

      <section className="py-16 px-4 bg-white text-center">
        <h2 className="text-3xl font-semibold text-gray-800">Kenapa HealthHub?</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Efisien dan Praktis</h3>
            <p className="mt-2">Pesan tiket antrian tanpa perlu pergi ke rumah sakit terlebih dahulu.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Layanan Kesehatan Terpercaya</h3>
            <p className="mt-2">Kami bekerja sama dengan rumah sakit dan klinik terpercaya.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Jadwal Fleksibel</h3>
            <p className="mt-2">Sesuaikan jadwal konsultasi dengan waktu yang tersedia di dokter pilihan Anda.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-blue-50 text-center">
        <h2 className="text-3xl font-semibold text-gray-800">Cara Kerja HealthHub</h2>
        <ol className="mt-8 space-y-4 text-lg text-gray-700">
          <li>Pilih Dokter / Layanan Kesehatan</li>
          <li>Pilih Waktu & Lokasi</li>
          <li>Pesan Tiket Antrian</li>
          <li>Dapatkan Konfirmasi & Pengingat</li>
        </ol>
      </section>

      <section className="py-16 px-4 bg-white text-center">
        <h2 className="text-3xl font-semibold text-gray-800">Testimoni Pengguna</h2>
    <div className="flex md:flex-row flex-col  gap-4 items-center justify-center">

        <div className="mt-8 flex flex-col items-center space-y-6 shadow">
          <blockquote className="max-w-md text-lg text-gray-700">
            "HealthHub mantap!"
          </blockquote>
          <span className="text-gray-600 p-2">– Rafelino, Pengguna HealthHub</span>
        </div>

        <div className="mt-8 flex flex-col items-center space-y-6 shadow">
          <blockquote className="max-w-md text-lg text-gray-700">
            "HealthHub membuat hidup saya jauh lebih mudah! Tidak perlu mengantri panjang di rumah sakit."
          </blockquote>
          <span className="text-gray-600 p-2">– Tasyana Ayu, Pengguna HealthHub</span>
        </div>
</div>
      </section>

      <footer className="bg-blue-600 text-white text-center py-8">
        <p>&copy; 2025 HealthHub. Semua hak dilindungi.</p>
        <p>Email: lorjenx08@gmail.com | Telepon: 08817083978</p>
      </footer>
    </div>
  );
};

export default Home;
