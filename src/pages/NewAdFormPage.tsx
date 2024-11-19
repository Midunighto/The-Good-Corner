import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import {
  useGetAllCategoriesQuery,
  useGetAllTagsQuery,
} from "../generated/graphql-types";
import { useMutation } from "@apollo/client";
import { CREATE_NEW_AD } from "../graphql/mutations";

type Inputs = {
  title: string;
  description: string;
  owner: string;
  price: number;
  picturesUrls: { url: string }[];
  location: string;
  createdAt: Date;
  categoryId: number;
  tags: string[];
};

export default function NewAdFormPage() {
  const navigate = useNavigate();

  const { loading, error, data } = useGetAllCategoriesQuery();
  const {
    loading: loadingTag,
    error: errorTag,
    data: dataTag,
  } = useGetAllTagsQuery();
  const [createNewAd] = useMutation(CREATE_NEW_AD);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "picturesUrls",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("data from react hook form", data);
    const dataForBackend = {
      ...data,
      price: parseInt(data.price.toString()),
      categoryId: parseInt(data.categoryId.toString()),
      tags: data.tags ? data.tags : [],
    };
    console.log("data formatted for backend", dataForBackend);

    try {
      await createNewAd({
        variables: { data: dataForBackend },
      });

      toast.success("Ad has been added");
      navigate("/");
    } catch (err) {
      console.error("Error sending data to backend", err);
      toast.error("Failed to add ad");
    }
  };

  if (loading || loadingTag) return <p>Loading...</p>;
  if (error || errorTag)
    return <p>Error : {error?.message || errorTag?.message}</p>;

  return (
    <form className="ad-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Publier une annonce</h2>
      <>
        <label htmlFor="">
          Titre de l'annonce: <br />
          <input
            className="text-field"
            {...register("title", {
              minLength: { value: 2, message: "Minimum 2 characters" },
              required: "This field is required",
            })}
          />
        </label>
        <ErrorMessage
          errors={errors}
          name="title"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              console.log(message);
              return (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              );
            })
          }
        />
      </>
      <br />
      <>
        <label>
          Description:
          <br />
          <input
            className="text-field"
            {...register("description", {
              minLength: { value: 10, message: "Minimum 10 characters" },
              required: "This field is required",
            })}
          />
        </label>
        <ErrorMessage
          errors={errors}
          name="description"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              console.log(message);
              return (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              );
            })
          }
        />
      </>
      <br />
      <>
        <label>
          Auteur:
          <br />
          <input
            className="text-field"
            {...register("owner", {
              minLength: { value: 2, message: "Minimum 2 characters" },
              required: "This field is required",
            })}
          />
        </label>
        <ErrorMessage
          errors={errors}
          name="owner"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              console.log(message);
              return (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              );
            })
          }
        />
      </>
      <br />
      <>
        <label>
          Prix :
          <br />
          <input
            type="number"
            className="text-field"
            {...register("price", {
              min: { value: 0, message: "Minimum 0" },
              required: "This field is required",
              valueAsNumber: true,
            })}
          />
        </label>
        <ErrorMessage
          errors={errors}
          name="price"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              console.log(message);
              return (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              );
            })
          }
        />
      </>
      <br />
      <>
        <br />
        <button
          className="button"
          type="button"
          onClick={() => append({ url: "" })}
        >
          Add Image
        </button>
        <br />
        <div className="field">
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <section className="image-input-and-remove">
                  <input
                    className="text-field"
                    placeholder="Your image url"
                    {...register(`picturesUrls.${index}.url` as const)}
                  />
                  <button className="button" onClick={() => remove(index)}>
                    Remove
                  </button>
                  <br />
                </section>
                <span>{errors.picturesUrls?.[index]?.url?.message}</span>
              </div>
            );
          })}
        </div>
      </>
      <br />
      <>
        <label>
          Ville :
          <br />
          <input
            className="text-field"
            {...register("location", {
              minLength: { value: 2, message: "Minimum 2 characters" },
              required: "This field is required",
            })}
          />
        </label>
        <ErrorMessage
          errors={errors}
          name="location"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              console.log(message);
              return (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              );
            })
          }
        />
      </>
      <br />
      <>
        <label>
          <br />
          Category :
          <br />
          <select {...register("categoryId")} defaultValue="">
            <option value="" disabled>
              Sélectionner une catégorie
            </option>
            {data &&
              data.getAllCategories.map((el: any) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
          </select>
        </label>
        <ErrorMessage
          errors={errors}
          name="categoryId"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              console.log(message);
              return (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              );
            })
          }
        />
      </>
      <div className="checkboxes">
        {dataTag &&
          dataTag.getAllTags.map((el: any) => {
            return (
              <div className="tag-container" key={el.id}>
                <label>{el.name}</label>
                <input
                  className="tags"
                  type="checkbox"
                  value={el.id}
                  {...register("tags")}
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
              </div>
            );
          })}
      </div>
      <button type="submit" className="button btn">
        Submit
      </button>
    </form>
  );
}
