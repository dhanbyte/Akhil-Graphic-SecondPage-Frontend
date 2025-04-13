import { useParams } from "react-router-dom";
import { useData } from "./DataContext";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const SubChildCard = () => {
  const { user } = useUser();
  const { products } = useData();
  const { subcategory_slug } = useParams();
  const Product = products.find((p) => p.subcategory_slug === subcategory_slug);

  const [showModal, setShowModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState<any>(null);

  const [formData, setFormdata] = useState({
    customerName: "",
    paperType: "",
    windowCutting: "",
    quantity: "500",
    file: null,
    specialRemark: "",
    flapOpening: "",
    userId: "",
    totalWithGst: "",
    productName: Product?.name || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const baseCost = Number(Product.cost);
  const perQtyCost = baseCost / Product.defaultQty;
  const total = Number(formData.quantity) * perQtyCost;
  const gstRate = 0.18;
  const gstAmount = total * gstRate;
  const totalWithGst = total + gstAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      totalWithGst: totalWithGst.toFixed(2),
      userId: user?.id || "",
      productName: Product.name,
    };

    setFormSubmitted(finalData);
    setShowModal(true);

    const formToSend = new FormData();
    for (const key in finalData) {
      if (key === "file" && formData.file) {
        formToSend.append("file", formData.file);
      } else {
        formToSend.append(key, finalData[key as keyof typeof finalData]);
      }
    }

    try {
      const res = await axios.post(
        "https://akhil-graphic-part-twobackend.onrender.com/api/order/orderInput",
        finalData,
        
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Sending Data:", finalData);
      console.log("✅ Order submitted successfully:", res.data);
    } catch (error) {
      console.error("❌ Failed to submit order:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 relative">
      <div className="container mx-auto flex flex-col lg:flex-row gap-6">
        {/* Left - Form */}
        <div className="lg:w-1/2 bg-white rounded-lg shadow p-6">
          <h2 className="text-blue-700 text-2xl font-bold mb-4 text-center">
            {Product.name}
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="customerName"
              className="w-full border border-gray-300 p-2 rounded mb-4"
              placeholder="Customer Name"
              value={formData.customerName}
              onChange={handleChange}
              required
            />

            <label className="block font-medium mb-1">Paper Type</label>
            <select
              name="paperType"
              value={formData.paperType}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
              required
            >
              <option value="">-- Select Paper Type --</option>
              {Product.paperTypes.map((type: string) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <label className="block font-medium mb-1">Flap Opening</label>
            <select
              name="flapOpening"
              value={formData.flapOpening}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
              required
            >
              <option value="">-- Select Flap Opening --</option>
              {Product.flapOpeningOptions.map((type: string) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <label className="block font-medium">Window Cutting</label>
            <div className="mb-4">
              {Product.windowCuttingOptions.map((opt: string) => (
                <label key={opt} className="mr-4">
                  <input
                    type="radio"
                    name="windowCutting"
                    value={opt}
                    checked={formData.windowCutting === opt}
                    onChange={handleChange}
                    required
                  />
                  <span className="ml-1">{opt}</span>
                </label>
              ))}
            </div>

            <label className="block font-medium mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              min={500}
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded mb-4"
              required
            />

            <label className="block font-medium mb-1">Upload File</label>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setFormdata((prev: any) => ({ ...prev, file }));
              }}
              className="w-full border border-gray-300 p-2 rounded mb-4"
            />

            <textarea
              name="specialRemark"
              className="w-full border border-gray-300 p-2 rounded mb-4"
              placeholder="Special Remarks..."
              value={formData.specialRemark}
              onChange={handleChange}
            ></textarea>

            <div className="bg-gray-200 p-4 rounded mb-4 text-sm">
              <div className="flex justify-between mb-1">
                <span>Cost</span>
                <span>₹{Product.cost}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>GST (18%)</span>
                <span>₹{gstAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total Payable</span>
                <span>₹{totalWithGst.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700"
            >
              Add Order (Pay From Wallet)
            </button>
          </form>
        </div>

        {/* Right - Product Image */}
        <div className="lg:w-1/2">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <img
              src={Product.image}
              alt="Product"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700 text-sm font-medium">
              📌 {Product.name}
            </p>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && formSubmitted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">
              🧾 Order Summary
            </h2>
            <ul className="space-y-1 text-sm">
              <li>
                <strong>Customer Name:</strong> {formSubmitted.customerName}
              </li>
              <li>
                <strong>Paper Type:</strong> {formSubmitted.paperType}
              </li>
              <li>
                <strong>Flap Opening:</strong> {formSubmitted.flapOpening}
              </li>
              <li>
                <strong>Window Cutting:</strong> {formSubmitted.windowCutting}
              </li>
              <li>
                <strong>Quantity:</strong> {formSubmitted.quantity}
              </li>
              <li>
                <strong>Remarks:</strong>{" "}
                {formSubmitted.specialRemark || "None"}
              </li>
              <li>
                <strong>GST (18%):</strong> ₹{gstAmount.toFixed(2)}
              </li>
              <li className="font-bold text-green-700">
                Total Payable: ₹{formSubmitted.totalWithGst}
              </li>
            </ul>
            <button
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubChildCard;
