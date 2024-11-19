import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CategoryProp } from "../components/Categories";
import AdCard from "../components/AdCard";

export default function AdsByCategory() {
  const { name } = useParams();
  const [adsByCategory, setAdsByCategory] = useState<CategoryProp[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/ads?category=${name}`
        );
        setAdsByCategory(result.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, [name]);

  return (
    <>
      <h2>Ads by category: {name}</h2>
      {adsByCategory.length === 0 ? (
        <p>No ads in this category</p>
      ) : (
        <section className="recent-ads">
          {adsByCategory.map((el: any) => (
            <div key={el.id}>
              <AdCard
                id={el.id}
                title={el.title}
                picture={el.picture}
                price={el.price}
                category={el.category}
                owner={el.owner}
                createdAt={el.createdAt}
              />
            </div>
          ))}
        </section>
      )}
    </>
  );
}
