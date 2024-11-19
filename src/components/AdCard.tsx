type AdCardProps = {
  id: number;
  title: string;
  picture: string;
  owner: string;
  price: number;
  category: { id: number; name: string } | null;
  createdAt: string;
  description?: string;
  location?: string;
  tags?: { id: number; name: string }[];
};

export default function AdCard({
  id,
  title,
  picture,
  price,
  category,
  location,
  owner,
  tags = [],
}: AdCardProps) {
  return (
    <div className="ad-card-container">
      <a href={`/ad/${id}`} className="ad-card-link">
        <p>{owner}</p>
        <img src={picture} className="ad-card-image" />
        <div className="ad-card-text">
          <div className="ad-card-text-main">
            <p className="ad-card-title">{title}</p>
            <p className="ad-card-price">{price}€</p>
          </div>
          <p className="ad-card-category">{category?.name}</p>
          <p className="ad-card-location">{location}</p>
          <div className="ad-card-tags">
            {tags &&
              tags.map((tag) => (
                <span key={tag.id} className="ad-card-tag">
                  {tag.name}
                </span>
              ))}
          </div>
        </div>
      </a>
    </div>
  );
}

export type { AdCardProps };
