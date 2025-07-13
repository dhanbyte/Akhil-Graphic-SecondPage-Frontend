import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user } = useUser();

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <header className="flex flex-col md:flex-row items-center justify-between bg-white text-gray-700 h-auto md:h-[10vh] px-4 py-2 shadow-sm w-full">
      
      {/* Navigation Links */}
      <nav className="flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-6 text-sm md:text-base w-full md:w-auto mb-2 md:mb-0">
        <Link to="/" className="hover:text-blue-500 hidden md:block">Home</Link>
        <Link to="/order" className="hover:text-blue-500">Order Status</Link>
        <Link to="/AddMoney" className="hover:text-blue-500">Add Money</Link>
        <Link to="/help" className="hover:text-blue-500 hidden md:block">Help</Link>
      </nav>

      {/* User Info */}
      <div className="flex flex-col items-center md:flex-row gap-1 md:gap-4 text-xs md:text-base">
        <Link to="/" className="flex items-center gap-2">
          <img src={user.imageUrl} className="h-7 w-7 rounded-full object-cover" alt="User" />
          <h1 className="whitespace-nowrap">{user.fullName}</h1>
        </Link>
        <span className="text-center md:text-left">
          Amount - ₹<span className="text-green-600">1000</span>
        </span>
      </div>
    </header>
  );
}
