import { useState } from "react";
import { useGetAllAdsQuery } from "../generated/graphql-types";

import AdCard, { AdCardProps } from "./AdCard";

export default function RecentAds() {
  const { loading, error, data } = useGetAllAdsQuery();
  const [cart, setCart] = useState<AdCardProps[]>([]);
  const [total, setTotal] = useState(0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log("data", data);
  if (data) {
    return (
      <>
        <h2>Annonces Récentes</h2>
        <div className="cart-container">
          <svg
            className="cart"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="#ffa41b"
            width={40}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <line x1="32" y1="48" x2="32" y2="32"></line>
              <line x1="44" y1="48" x2="44" y2="32"></line>
              <line x1="20" y1="48" x2="20" y2="32"></line>
              <polygon points="8 24 12 56 52 56 56 24 8 24"></polygon>
              <line x1="16" y1="24" x2="20" y2="8"></line>
              <line x1="48" y1="24" x2="44" y2="8"></line>
            </g>
          </svg>
          <div className="cart-list-container">
            {cart.map((ad) => (
              <div className="cart-list" key={ad.id}>
                <p>
                  {ad.title} <span>{ad.price} €</span>
                </p>
              </div>
            ))}
            <div className="total-container">
              <p>{total} €</p>
              <button
                className="btn-clear"
                onClick={() => {
                  setTotal(0);
                  setCart([]);
                }}
              >
                x
              </button>
            </div>
          </div>
        </div>
        <section className="recent-ads">
          {data.getAllAds.map((ad: any) => (
            <div key={ad.id}>
              <AdCard
                id={ad.id}
                title={ad.title}
                picture={ad.pictures[0]?.url || ""}
                price={ad.price}
                category={ad.category}
                createdAt={ad.createdAt}
                description={ad.description}
                owner={ad.owner}
                location={ad.location}
                tags={ad.tags}
              />
              <button
                className="btn"
                onClick={() => {
                  setTotal(total + ad.price);
                  setCart([...cart, ad]);
                }}
              >
                Ajouter au panier
              </button>
            </div>
          ))}
        </section>
      </>
    );
  }
}
