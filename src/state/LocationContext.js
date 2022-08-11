import React, {createContext, useMemo, useState} from 'react';

export const LocationContext = createContext();

const LocationContextProvider = props => {
  const [date, setDate] = useState(null);
  const [location, setLocation] = useState(false);
  const [state, setState] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const value = useMemo(
    () => ({
      date,
      setDate,
      location,
      setLocation,
      state,
      setState,
      area,
      setArea,
      address,
      setAddress,
      type,
      setType,
    }),
    [date, state, area, location, address, type],
  );

  return (
    <LocationContext.Provider value={value}>
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationContextProvider;
