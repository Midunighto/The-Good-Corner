import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { Fragment } from "react";
import { ErrorMessage } from "@hookform/error-message";

type Inputs = {
  title: string;
};

export default function NewCat() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await axios.post("http://localhost:3000/categories", data);
  };

  return (
    <form className="ad-form" onSubmit={handleSubmit(onSubmit)}>
      <label>
        Titre de la catégorie:
        <br />
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
      <input type="submit" className="button" />
    </form>
  );
}
