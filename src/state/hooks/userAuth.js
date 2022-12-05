import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {
  selectCurrentUser,
  selectDefaultLocation,
  selectLocation,
  selectPics,
  selectPushToken,
  selectToken,
} from '../reducers/userAuth';

export const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);
  const pics = useSelector(selectPics);
  const push_token = useSelector(selectPushToken);
  const locations = useSelector(selectLocation);
  const dlocation = useSelector(selectDefaultLocation);

  return useMemo(
    () => ({user, token, pics, push_token, locations, dlocation}),
    [user, token, pics, push_token, locations, dlocation],
  );
};
