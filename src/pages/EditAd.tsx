import axios from "axios";
import { useEffect, useState } from "react";
import { CategoryProp } from "../components/Categories";
import { AdCardProps } from "../components/AdCard";
import { useParams } from "react-router-dom";

export default function EditAd() {
  const { id } = useParams();
  const [categories, setCategories] = useState([] as CategoryProp[]);
  const [adDetails, setAdDetails] = useState<AdCardProps>();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get("http://localhost:3000/categories");
        setCategories(result.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    const fetchAdDetails = async () => {
      try {
        const adDetailsResult = await axios.get(
          `http://localhost:3000/ads/${id}`
        );
        setAdDetails(adDetailsResult.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchAdDetails();
    fetchCategories();
  }, [id]);
  if (adDetails) {
    return (
      <form
        className="ad-form"
        onSubmit={(e) => {
          e.preventDefault();
          // Read the form data
          const form = e.target;
          const formData = new FormData(form as HTMLFormElement);

          // Or you can work with it as a plain object:
          const formJson = Object.fromEntries(formData.entries());
          axios.put(`http://localhost:3000/ads/${id}`, formJson);
        }}
      >
        <h2>
          Modifier l'annonce <span>{adDetails.title}</span>
        </h2>
        <label>
          Titre de l'annonce:
          <br />
          <input
            className="text-field"
            type="text"
            name="title"
            defaultValue={adDetails.title}
          />
        </label>
        <br />
        <label>
          Description:
          <br />
          <input
            className="text-field"
            type="text"
            name="description"
            defaultValue={adDetails.description}
          />
        </label>
        <br />
        <label>
          Vendeur:
          <br />
          <input
            className="text-field"
            type="text"
            name="owner"
            defaultValue={adDetails.owner}
            disabled
          />
        </label>
        <br />
        <label>
          Prix:
          <br />
          <input
            className="text-field"
            type="number"
            name="price"
            defaultValue={adDetails.price}
          />
        </label>
        <br />
        <label>
          Image:
          <br />
          <input
            className="text-field"
            type="text"
            name="picture"
            defaultValue={adDetails.picture}
          />
        </label>
        <br />
        <label>
          Ville:
          <br />
          <input
            className="text-field"
            type="text"
            name="location"
            defaultValue={adDetails.location}
          />
        </label>
        <br />
        <label>
          Catégorie:
          <select name="category" defaultValue={adDetails.category.id}>
            {categories.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </select>
        </label>
        <button className="button btn">Submit</button>
      </form>
    );
  } else {
    return <p>Loading</p>;
  }
}
