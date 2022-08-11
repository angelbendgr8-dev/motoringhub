import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {selectCategories, selectModels} from '../reducers/contentReducer';

export const useContent = () => {
  const categories = useSelector(selectCategories);
  const models = useSelector(selectModels);

  return useMemo(() => ({categories, models}), [categories, models]);
};
