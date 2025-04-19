// components/Course/RatingStars.tsx
import React from 'react';
import { FaStar } from 'react-icons/fa';

interface RatingStarsProps {
  ratings: number[];
}

const RatingStars: React.FC<RatingStarsProps> = ({ ratings }) => {
  const total = ratings.length;
  const average = total ? ratings.reduce((a, b) => a + b, 0) / total : 0;

  //const rounded = Math.round(average * 2) / 2; // round to nearest 0.5

  const getStarColor = (i: number) =>
    i < average ? 'text-warning' : 'text-card-border';

  return (
    <div className="flex items-center gap-2 mb-4">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className={`${getStarColor(i + 1)} text-xl`} />
      ))}
      <span className="text-sm text-text">
        {average.toFixed(1)} ({total} rating{total !== 1 ? 's' : ''})
      </span>
    </div>
  );
};

export default RatingStars;
