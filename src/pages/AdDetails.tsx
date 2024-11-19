import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_AD_BY_ID } from "../graphql/queries";

export default function AdDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_AD_BY_ID, {
    variables: { getAdByIdId: Number(id) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log("data.getAdById", data.getAdById);

  const tags = data.getAdById.tags || [];

  return (
    <>
      <p>Displaying the details of ad {data.getAdById.id}</p>
      <h2 className="ad-details-title">{data.getAdById.title}</h2>
      <p>{data.getAdById.category?.name}</p>
      <section className="ad-details">
        <div className="ad-details-image-container">
          <img
            className="ad-details-image"
            src={
              data.getAdById.pictures.length > 0
                ? data.getAdById.pictures[0].url
                : "https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
            }
            alt={data.getAdById.title}
            width={200}
          />
        </div>
        <div className="ad-details-info">
          <div className="ad-details-price">{data.getAdById.price} €</div>
          <div className="ad-details-description">
            {data.getAdById.description}
          </div>
          {tags.length > 0 &&
            tags.map((tag: any) => (
              <span key={tag.id} className="ad-details-tag">
                {tag.name}
              </span>
            ))}
          <hr className="separator" />
          <p className="ad-details-owner">
            Annonce publiée par <b>{data.getAdById.owner}</b> le{" "}
            {new Date(data.getAdById.createdAt as string).toDateString()} à{" "}
            {data.getAdById.location}.
          </p>
          <a
            href={`mailto:${data.getAdById.owner}@${data.getAdById.owner}.com`}
            className="button button-primary link-button"
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
              style={{
                stroke: "currentcolor",
                strokeWidth: 2.5,
                fill: "none",
              }}
            >
              <path d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"></path>
            </svg>
            Envoyer un email
          </a>
        </div>
        <div className="ad-card-details-buttons">
          <button
            className="btn btn-supp"
            /*  onClick={() =>
              
            } */
          >
            Supprimer l'annonce
          </button>

          <button
            onClick={() => navigate(`/ad/edit/${data.getAdById.id}`)}
            className="btn btn-edit"
          >
            Modifier l'annonce
          </button>
        </div>
      </section>
    </>
  );
}
