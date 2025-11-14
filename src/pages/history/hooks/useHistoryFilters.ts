import { useState } from 'react';

export const useHistoryFilters = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  return {
    activeFilter,
    setActiveFilter,
  };
};
