import { useUser } from "@clerk/clerk-react";

export default function ProfilePage() {
  const { user } = useUser(); // Clerk se user ka data fetch kar rahe hain

  if (!user) {
    return <p>Loading user data...</p>; // Agar user ka data load nahi hota to yeh show hoga
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Profile Header */}
      <div className="text-center">
        <img
          src={user.imageUrl || "https://via.placeholder.com/150"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h1 className="text-3xl font-semibold">{user.fullName}</h1>
        <p className="text-gray-500">{user.username || "No username set"}</p>
      </div>

      {/* User Information */}
      <div className="mt-8 space-y-6">
        <div className="flex justify-between">
          <span className="text-gray-700">Email:</span>
          <span className="text-gray-500">{user.primaryEmailAddress?.emailAddress}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">Phone:</span>
          <span className="text-gray-500">{user.primaryPhoneNumber?.phoneNumber || "Not Provided"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">User ID:</span>
          <span className="text-gray-500">{user.id}</span>
        </div>
      </div>

      {/* Edit Button */}
      <div className="mt-8 text-center">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition"
          onClick={() => alert("Redirecting to Edit Profile Page")}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
