import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Slidbar";
import Navbar from "../components/Navbar";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";

export default function MainlayoutPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex  h-screen">

      {/* ❌ Agar user login nahi hai to sirf Login Page dikhega */}
      <SignedOut>
        <div className="login-page w-full flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Welcome! Please Sign In</h1>
            <SignIn />
          </div>
        </div>
      </SignedOut>
           <SignedIn>
     <div className="fixed ">

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
     </div>
     
      <div className={`flex-1 lg:pl-[16%]  transition-all ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <Navbar  />

          
        <main className="p-2   lg:p-4">
          <Outlet />
        </main>
      </div>
      </SignedIn>
    </div>
  );
}