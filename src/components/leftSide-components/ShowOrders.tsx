import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderFetch } from "../../redex/Slices/OrderInputSlice";
import { useUser } from "@clerk/clerk-react";

const ShowOrder = () => {
    
  const dispatch = useDispatch();
  const {user} =useUser()
  const  { data: order = [], isloading, isError } = useSelector((state: any) => state.order);
   const userId = user?.id || "" 
  useEffect(() => {
    dispatch(OrderFetch());
  }, [dispatch]);

  
  const orders = !isloading && !isError ? order.filter((order:any) =>order.userId ===userId):[]

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Order Summary</h1>

      {isloading && <p className="text-center text-blue-500">Loading...</p>}
      {isError && <p className="text-center text-red-500">{isError}</p>}

      {!isloading && !isError && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-xl">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left p-4">Customer Name</th>
                <th className="text-left p-4">Product Name</th>
                <th className="text-left p-4">Quantity</th>
                <th className="text-left p-4">Total Price (₹)</th>
               <th className="text-left p-4">File</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{order.customerName}</td>
                  <td className="p-4">{order.productName}</td>
                  <td className="p-4">{order.quantity}</td>
                  <td className="p-4 font-medium text-green-600">₹{order.totalWithGst}</td>
                
                  <td className="p-4">
                    {order.file ? (
                      <a
                        href={`http://localhost:5500/uploads/${order.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View File
                      </a>
                    ) : (
                      "No File"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowOrder;
