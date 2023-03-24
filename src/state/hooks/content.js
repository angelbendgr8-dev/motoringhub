import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {
  selectAllModels,
  selectCategories,
  selectModels,
} from '../reducers/contentReducer';

export const useContent = () => {
  const categories = useSelector(selectCategories);
  const models = useSelector(selectModels);
  const allmodels = useSelector(selectAllModels);

  return useMemo(
    () => ({categories, models, allmodels}),
    [categories, models, allmodels],
  );
};
