import {ScrollView, StyleSheet} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Category} from './Category';
import {AppContext} from '../../state/AppContext';
import Box from '../../Components/Box';
import _ from 'lodash';
import {useGetCategoriesQuery} from '../../state/services/ContentService';
import {useDispatch} from 'react-redux';
import {setCategories} from '../../state/reducers/contentReducer';
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
  // const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const {categories} = useContent();
  //   const {navigate} = useNavigation();
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
              image={cat.picture}
              title={cat.title}
            />
          ))}
        </>
      )}
    </Box>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    // height: 35,
    marginBottom: 4,
    // flexDirection: 'row',
    // marginLeft: 10,
    paddingVertical: 5,
    borderColor: 'rgba(112,112,112,0.5)',
    // borderTopWidth: 0.3,
    // borderBottomWidth: 0.3,
  },
});
