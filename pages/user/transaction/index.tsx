import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTransaction } from "../../../store/slices/transcation/transactionSlice";
import { RootState, AppDispatch } from "../../../store/store";
import { Loader2 } from 'lucide-react';
import Layout from "../../../components/layouts";

const TransactionPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, loadingTransactionAll, errorTransactionAll } = useSelector(
    (state: RootState) => state.transaction
  );

  useEffect(() => {
    dispatch(fetchUserTransaction());
  }, [dispatch]);

  return (
    <Layout>
      <div className="container mx-auto w-full h-full p-6">
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-6 border-b pb-2">
          Histori Transaksi
        </h1>
        {loadingTransactionAll ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin w-12 h-12 text-gray-600" />
          </div>
        ) : errorTransactionAll ? (
          <p className="text-red-500 text-center text-lg">{errorTransactionAll}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="shadow-lg border rounded-xl p-6 bg-white hover:shadow-2xl transition-shadow">
                <h2 className="text-xl font-semibold text-blue-600 mb-2">{transaction.clinic.name}</h2>
                <p className="text-gray-700 font-medium">Kode Transaksi: <span className="font-normal">{transaction.transaction_code}</span></p>
                <p className="text-gray-700 font-medium">Status: <span className="font-normal">{transaction.status}</span></p>
                <p className="text-gray-700 font-medium">Nomor Antrian: <span className="font-normal">{transaction.no_antrian}</span></p>
                <p className="text-gray-700 font-medium">Biaya Admin: <span className="font-normal">{transaction.admin_fee}</span></p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TransactionPage;
