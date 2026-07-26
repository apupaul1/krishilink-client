import { Star } from "lucide-react";

interface RatingProps {
  rating: number;
}

const Rating = ({ rating }: RatingProps) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={18}
          style={{
            animationDelay: `${index * 120}ms`,
          }}
          className={`
            rating-star
            ${
              index < rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }
          `}
        />
      ))}
    </div>
  );
};

export default Rating;