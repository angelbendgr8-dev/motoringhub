import React, {useEffect} from 'react';
import {Category} from './Category';

import Box from '../../Components/Box';
import _ from 'lodash';
import {
  useGetAllBrandsMutation,
  useGetCategoriesQuery,
} from '../../state/services/ContentService';
import {useDispatch} from 'react-redux';
import {setAllModels, setCategories} from '../../state/reducers/contentReducer';
import {useContent} from '../../state/hooks/content';

// const categories = [
//   {title: 'Cars', image: car},
//   {title: 'convetibles', image: convertible},
//   {title: 'Mini Van', image: minivan},
//   {title: 'Pickup Trucks', image: pickup},
//   {title: 'Trucks', image: trucks},
//   {title: 'Buses', image: bus},
//   {title: 'Motorcycles', image: motorbike},
//   {title: 'Heavy Duty', image: excavator},
//   {title: 'Watercrafts', image: ship},
// ];

const CategoryList = ({}) => {
  const {data, error, isLoading, refetch} = useGetCategoriesQuery();
  const [getAllBrands, {data: brands}] = useGetAllBrandsMutation();
  const dispatch = useDispatch();
  const {categories} = useContent();
  //   const {navigate} = useNavigation();
  useEffect(() => {
    getAllBrands();
  }, [getAllBrands]);

  useEffect(() => {
    if (data) {
      // console.log(data.data);
      dispatch(setCategories({categories: data.data}));
    }
    if (error) {
      console.log(error);
    }
    if (isLoading) {
      // console.log('loading');
    }
    // refetch();
  }, [data, error, isLoading, refetch, dispatch]);

  useEffect(() => {
    if (brands) {
      dispatch(setAllModels({models: brands.data}));
    }
  }, [brands, dispatch]);

  useEffect(() => {}, [categories]);

  return (
    <Box
      marginBottom="my1"
      justifyContent="space-around"
      flexDirection="row"
      flexWrap="wrap">
      {!_.isEmpty(categories) && (
        <>
          {[...categories].map((cat, index) => (
            <Category
              key={index}
              onPress={() => {}}
              category={cat}
              image={cat.picture}
              title={cat.name}
            />
          ))}
        </>
      )}
    </Box>
  );
};

export default CategoryList;
