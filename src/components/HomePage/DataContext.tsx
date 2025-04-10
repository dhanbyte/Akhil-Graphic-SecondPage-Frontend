import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface DataContextType {
  categories: any[];
  subcategories: any[];
  products: any[];
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DataContextType>({
    categories: [],
    subcategories: [],
    products: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, subcategoriesRes, productsRes] = await Promise.all([
          fetch(`https://akhil-graphic-part-twobackend.onrender.com/api/categories`).then((res) => res.json()),
          fetch(`https://akhil-graphic-part-twobackend.onrender.com/api/subcategories`).then((res) => res.json()),
          fetch(`https://akhil-graphic-part-twobackend.onrender.com/api/products`).then((res) => res.json()),]);

        setData({ categories: categoriesRes, subcategories: subcategoriesRes, products: productsRes });

        console.log("✅ Fetched Data:", { categoriesRes, subcategoriesRes, productsRes });
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};
