import { useState } from "react";

export default function HelpPage() {
  const [selectedHelpCategory, setSelectedHelpCategory] = useState<string | null>(null);

  // Help categories
  const helpCategories = {
    payment: "Payment Issues & FAQs",
    product: "Product Issues & FAQs",
    contact: "Contact Support",
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Help & Support</h1>

      {/* Help Category Selection */}
      <div className="space-y-4">
        {Object.entries(helpCategories).map(([key, value]) => (
          <button
            key={key}
            className="w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200"
            onClick={() => setSelectedHelpCategory(key)}
          >
            {value}
          </button>
        ))}
      </div>

      {/* Displaying help content based on selected category */}
      {selectedHelpCategory === "payment" && (
        <div className="mt-6 text-gray-700">
          <h2 className="text-2xl font-semibold">Payment Issues</h2>
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>How do I add money to my account?</li>
            <li>What should I do if my payment fails?</li>
            <li>Can I request a refund for a failed transaction?</li>
            <li>Why was my payment rejected?</li>
          </ul>
          <p className="mt-4 text-sm text-gray-500">If you are still facing issues, feel free to contact us using the contact information below.</p>
        </div>
      )}

      {selectedHelpCategory === "product" && (
        <div className="mt-6 text-gray-700">
          <h2 className="text-2xl font-semibold">Product Issues</h2>
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>How can I track my order?</li>
            <li>What should I do if I receive a damaged product?</li>
            <li>Can I exchange a product?</li>
            <li>How do I know if a product is in stock?</li>
          </ul>
          <p className="mt-4 text-sm text-gray-500">For any other product-related issues, please contact our support team using the contact details below.</p>
        </div>
      )}

      {selectedHelpCategory === "contact" && (
        <div className="mt-6 text-gray-700">
          <h2 className="text-2xl font-semibold">Contact Support</h2>
          <p className="mt-4">
            If you have any queries related to payments, products, or other issues, you can contact our support team at the following:
          </p>
          <ul className="mt-4 space-y-3">
            <li><strong>Email:</strong> support@yourwebsite.com</li>
            <li><strong>Phone:</strong> +1 (555) 123-4567</li>
            <li><strong>Live Chat:</strong> Available on our website 24/7</li>
          </ul>
          <p className="mt-4 text-sm text-gray-500">Our team is here to assist you with any issues you may have.</p>
        </div>
      )}

      {/* Back to help categories button */}
      {selectedHelpCategory && (
        <button
          onClick={() => setSelectedHelpCategory(null)}
          className="mt-8 py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          Back to Help Categories
        </button>
      )}
    </div>
)


    }