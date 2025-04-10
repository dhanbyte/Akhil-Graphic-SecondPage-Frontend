import { Link } from "react-router-dom";
import { useData } from "../HomePage/DataContext";

const ParentCard = () => {
  const { categories } = useData();

  return (
    <div>
      <h1 className="text-center text-blue-900 text-2xl">Printing Services</h1>
     
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {categories.length === 0 ? (
        <p>Loading categories...</p>
      ) : (
     
        categories.map((cat) => (
          <div key={cat._id}>
            <Link  className="block text-center shadow-md p-4 rounded-lg" to={`/subcategories/${cat.slug}`}>
     
            <img src={cat.image}  className="w-full h-40 object-cover rounded-md" alt={cat.name} width={100} />
            <h3 className="mt-4 text-lg font-semibold">{cat.name}</h3>
        
            <br />
            </Link>
          </div>
          
          
        ))
        
      )}
       <div >
            <div className="block text-center shadow-md p-4 rounded-lg">
     
            <img src='https://media.istockphoto.com/id/1302168946/vector/coming-soon-red-ribbon-label-banner-open-available-now-sign-or-coming-soon-tag-vector.jpg?s=612x612&w=0&k=20&c=uzI1Ztsm3NcyQCscb1kQ3goarshfkR_n2ZDhAwgYPWQ='  className="w-full h-40 object-cover rounded-md"  width={100} />
            <h3 className="mt-4 text-lg font-semibold">Comming Soon...</h3>
        
            <br />
            </div>
          </div>      

      </div>
      

      
    </div>

  );
};

export default ParentCard;
