import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = (props: { rating: number; text: string }) => {
  const { rating, text } = props;

  return (
    <div className="rating">
      {Array.from({ length: 5 }, (_, idx: number) => (
        <span key={idx}>
          {rating >= idx + 1 ? (
            <FaStar />
          ) : rating >= idx + 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
      ))}
      <span className="rating-text">{text}</span>
    </div>
  );
};

export default Rating;
