import React, { useState } from "react";

const paymentMethods = [
  { name: "Google Pay", icon:"https://ik.imagekit.io/b5qewhvhb/akhilgraphics/gpay.webp?updatedAt=1752385221297" },
  { name: "PhonePe", icon: "https://ik.imagekit.io/b5qewhvhb/akhilgraphics/PhonePay.png?updatedAt=1752385238955" },
  { name: "Debit Card", icon: "https://ik.imagekit.io/b5qewhvhb/akhilgraphics/debitcard.png?updatedAt=1752385221332" },
  { name: "Credit Card", icon: "https://ik.imagekit.io/b5qewhvhb/akhilgraphics/creditcard.webp?updatedAt=1752385221284" },
  { name: "UPI", icon: "https://ik.imagekit.io/b5qewhvhb/akhilgraphics/upi.webp?updatedAt=1752385516461" },
  { name: "Net Banking", icon: "https://ik.imagekit.io/b5qewhvhb/akhilgraphics/net%20banking.png?updatedAt=1752385516374" },
  { name : "Paytm", icon :" https://ik.imagekit.io/b5qewhvhb/akhilgraphics/paytm.jpg?updatedAt=1752385221255"}
];

const AddMoney: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [message, setMessage] = useState("");

  const handleAddMoney = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt < 500) {
      setMessage("⚠️ Minimum amount should be ₹500.");
      return;
    }
    if (!method) {
      setMessage("⚠️ Please select a payment method.");
      return;
    }
    setMessage(`✅ ₹${amt} will be added via ${method}.`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Add Money</h2>

        <input
          type="number"
          placeholder="Enter amount (min ₹500)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="mb-4">
          <p className="mb-2 font-medium text-gray-700">Select Payment Method:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {paymentMethods.map((pm) => (
              <label
                key={pm.name}
                className={`border rounded-lg px-3 py-2 flex flex-col items-center justify-center cursor-pointer text-sm text-center ${
                  method === pm.name
                    ? "bg-blue-100 border-blue-500"
                    : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={pm.name}
                  checked={method === pm.name}
                  onChange={() => setMethod(pm.name)}
                  className="hidden"
                />
                <img src={pm.icon} alt={pm.name} className="h-10 w-10 mb-2" />
                {pm.name}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddMoney}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Money
        </button>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AddMoney;
