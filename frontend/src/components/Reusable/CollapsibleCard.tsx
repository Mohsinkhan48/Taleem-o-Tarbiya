import React, { useState } from 'react';
import Card from './Card';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Props {
  title: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}

const CollapsibleCard: React.FC<Props> = ({ title, defaultExpanded = false, children }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <Card className="p-4 rounded-lg mb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4 className="text-lg font-semibold">{title}</h4>
        {isExpanded ? (
          <FaChevronUp className="text-secondary text-xl" />
        ) : (
          <FaChevronDown className="text-secondary text-xl" />
        )}
      </div>
      {isExpanded && <div className="mt-3 space-y-4">{children}</div>}
    </Card>
  );
};

export default CollapsibleCard;
