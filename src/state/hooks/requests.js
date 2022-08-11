import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {selectRequest} from '../reducers/userRequest';

export const useAuth = () => {
  const requests = useSelector(selectRequest);

  return useMemo(() => ({requests}), [requests]);
};
