import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiMonitor,
  FiCalendar,
  FiMessageSquare,
  FiLayout,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";
import { useAuth, SignedIn } from "@clerk/clerk-react";

export default function Sidebar({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  const { signOut } = useAuth(); // ✅ Clerk se signOut function le rahe hain

  return (
    <div className="relative h-screen flex flex-col">
      {/* Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 md:top-0 left-2 z-50 p-2 lg:hidden"
      >
        {isOpen ? "X" : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      {(isOpen || window.innerWidth >= 1024) && (
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween" }}
          className="fixed top-0 left-0 h-screen w-64 bg-white shadow-xl p-4 text-gray-700 z-40 lg:relative lg:block flex flex-col justify-between"
        >
          <div>
            <nav className="py-[8vh] lg:py-0">
              <div className="hidden lg:block">
                <img
                  src="https://akhilgraphics.in/wp-content/uploads/2021/11/cropped-logo-1-1-300x300.png"
                  alt="Logo"
                  className="w-[10vh] h-[10vh] object-cover"
                />
              </div>

              <h2 className="text-sm font-semibold text-gray-400 mb-2">
                User Dashboard
              </h2>
              <Link
                to="/"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
              >
                <FiMonitor />
                <span>Home</span>
              </Link>

              <h2 className="text-sm font-semibold text-gray-400 mt-4 mb-2">
                Account
              </h2>
              <Link
                to="/addmoney"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
              >
                <FiCalendar /> Add Money
              </Link>
              <Link
                to="/order"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
              >
                <FiMessageSquare /> Order Status
              </Link>

              <h2 className="text-sm font-semibold text-gray-400 mt-4 mb-2">
                Help & Support
              </h2>
              <Link
                to="/profile"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
              >
                <FiLayout /> Profile
              </Link>
              <Link
                to="/help"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
              >
                <FiMessageSquare /> Help
              </Link>
            </nav>
          </div>

          {/* ✅ Sign Out Button at Bottom */}
          <SignedIn>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-3 p-2 rounded-lg  text-gray-700 hover:bg-gray-100 w-full"
            >
              <FiLogOut />
              <span>Sign Out</span>
            </button>
          </SignedIn>
        </motion.aside>
      )}
    </div>
  );
}
