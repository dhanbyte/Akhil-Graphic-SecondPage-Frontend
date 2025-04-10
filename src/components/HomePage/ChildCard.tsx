import { useParams, Link } from "react-router-dom";
import { useData } from "../HomePage/DataContext";

const ChildCard = () => {
  const { category_slug } = useParams();
  const { subcategories } = useData();

  const filteredSubcategories = subcategories.filter(
    (sub) => sub.category_slug === category_slug
  );

  console.log("Child" ,filteredSubcategories);
  

  return (
    <div>
      <h2 className="text-center text-blue-900 text-2xl">
        Subcategories for {category_slug}
      </h2>
      <div className="grid md:grid-cols-4 gap-6 p-6">
        {filteredSubcategories.length === 0 ? (
       <div >
       <div className="block text-center shadow-md p-4 rounded-lg">

       <img src='https://media.istockphoto.com/id/1302168946/vector/coming-soon-red-ribbon-label-banner-open-available-now-sign-or-coming-soon-tag-vector.jpg?s=612x612&w=0&k=20&c=uzI1Ztsm3NcyQCscb1kQ3goarshfkR_n2ZDhAwgYPWQ='  className="w-full h-40 object-cover rounded-md"  width={100} />
       <h3 className="mt-4 text-lg font-semibold">Comming Soon...</h3>
   
       <br />
       </div>
     </div>   ) : (
          filteredSubcategories.map((sub) => (
            <Link
              className="block text-center shadow-md p-4 rounded-lg"
              to={`/products/${sub.slug}`}
            >
              <div key={sub.id}>
                <img     className="w-full h-40 object-cover rounded-md"
          src={sub.image} alt={sub.name} width={100} />
          <h3  className="mt-4 text-lg font-semibold">  {sub.name}</h3>
          <p className="text-gray-500">{sub.dec}</p>
      
                <br />
              </div>
            </Link>
          ))
        )}
         
      </div>
    </div>
  );
};



export default ChildCard;
