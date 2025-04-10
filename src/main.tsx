import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../src/Style/index.css";
import MainlayoutPage from "./Layout/Mainlayout";
import { DataProvider } from "./components/HomePage/DataContext"; // ✅ Context Import
import ChildCard from "./components/HomePage/ChildCard";
import SubChildCard from "./components/HomePage/SubChildCard";
import ParentCard from "./components/HomePage/ParentCard";
import { ClerkProvider } from "@clerk/clerk-react";
import {store} from '../src/redex/App/store'
import ProfilePage from "./components/leftSide-components/profilePage";
import HelpPage from "./components/leftSide-components/helpPAge";
import ShowOrder from "./components/leftSide-components/ShowOrders";
import { Provider } from "react-redux";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainlayoutPage />,
    children: [
      { path: "/", element: <ParentCard /> },
      { path: "/subcategories/:category_slug", element: <ChildCard /> },
      { path: "/products/:subcategory_slug", element: <SubChildCard /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/help", element: <HelpPage /> },
      { path: "/order", element:<ShowOrder/>}
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <DataProvider>
          <Provider store={store}>
        <RouterProvider router={router} />
        </Provider>
        </DataProvider>
      </ClerkProvider>
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
