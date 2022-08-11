import React, {createContext, useMemo, useState} from 'react';

export const ProductUploadContext = createContext();

const ProductUploadContextProvider = props => {
  const [type, setType] = useState('')
  const [maker, setMaker] = useState('');
  const [model, setModel] = useState('');
  const [caryear, setCaryear] = useState('');
  const [carColor, setCarColor] = useState('');
  const [mileage, setMileage] = useState(0);
  const [location, setLocation] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [gearType, setGearType] = useState('');
  const [sellingCondition, setSellingCondition] = useState('');
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const value = useMemo(
    () => ({
      maker,
      setMaker,
      model,
      setModel,
      caryear,
      setCaryear,
      carColor,
      setCarColor,
      mileage,
      setMileage,
      location,
      setLocation,
      fuelType,
      setFuelType,
      bodyType,
      setBodyType,
      gearType,
      setGearType,
      sellingCondition,
      setSellingCondition,
      price,
      setPrice,
      images,
      setImages,
      type,
      setType,
    }),
    [
      maker,
      model,
      caryear,
      carColor,
      mileage,
      location,
      fuelType,
      bodyType,
      gearType,
      sellingCondition,
      price,
      images,
      type,
    ],
  );

  return (
    <ProductUploadContext.Provider value={value}>
      {props.children}
    </ProductUploadContext.Provider>
  );
};

export default ProductUploadContextProvider;
