import { useNavigate } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../generated/graphql-types";

export type CategoryProp = {
  id: number;
  name: string;
};

export default function Categories() {
  const { loading, error, data } = useGetAllCategoriesQuery();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log("data", data);

  if (data) {
    return (
      <div>
        {data.getAllCategories.map((category: any, index: any) => (
          <span key={category.id}>
            <a
              href={`/ads/category/${category.name}`}
              className="category-navigation-link"
            >
              {category.name}
            </a>
            {index < data.getAllCategories.length - 1 && " • "}
          </span>
        ))}
        <button
          className="btn-new-category"
          onClick={() => {
            navigate("/category/new");
          }}
        >
          +
        </button>
      </div>
    );
  }
}
