/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { keyTypeGuard } from './keyTypeGuard';

export const useSortSearchParams = (elements: IElement[]) => {
  const [searchParams, setSearchParams] = useSearchParams({
    sortedBy: Object.keys(elements)[0],
    order: 'ASC',
  });

  const [sortedBy, setSortedBy] = useState<keyof IElement>(() => {
    const sortedBy = searchParams.get('sortedBy');
    if (sortedBy && keyTypeGuard(sortedBy, elements[0])) {
      return sortedBy;
    }
    return 'id';
  });
  const [order, setOrder] = useState<SortOrder>(() => {
    const order = searchParams.get('order');
    if (order === 'DESC' || order === 'ASC') {
      return order;
    }
    return 'ASC';
  });

  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    setSearchParams({ sortedBy, order });
  }, [sortedBy, order, setSearchParams, trigger]);

  const handleOrderChange = (key?: keyof IElement) => {
    if (!key) {
      setTrigger((p) => !p);
      return;
    }

    if (key !== sortedBy) {
      setSortedBy(key);
      setOrder('ASC');
      return;
    }

    setOrder((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
  };

  return { sortedBy, order, handleOrderChange };
};
