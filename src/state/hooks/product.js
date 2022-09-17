import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {selectCars, selectCarts, selectParts} from '../reducers/productReducer';

export const useProduct = () => {
  const cars = useSelector(selectCars);
  const parts = useSelector(selectParts);
  const carts = useSelector(selectCarts);

  return useMemo(() => ({cars, parts, carts}), [cars, parts, carts]);
};
