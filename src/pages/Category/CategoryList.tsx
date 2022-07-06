import {ScrollView, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {Category} from './Category';
import {AppContext} from '../../state/AppContext';
import {
  bus,
  car,
  convertible,
  excavator,
  minivan,
  motorbike,
  pickup,
  ship,
  trucks,
} from '../../assets';
import Box from '../../Components/Box';

const categories = [
  {title: 'Cars', image: car},
  {title: 'convetibles', image: convertible},
  {title: 'Mini Van', image: minivan},
  {title: 'Pickup Trucks', image: pickup},
  {title: 'Trucks', image: trucks},
  {title: 'Buses', image: bus},
  {title: 'Motorcycles', image: motorbike},
  {title: 'Heavy Duty', image: excavator},
  {title: 'Watercrafts', image: ship},
];

const CategoryList = ({}) => {
  const {setCategory, category} = useContext(AppContext);
  //   const {category} = useCategory();
  // console.log(categories);
  //   const {navigate} = useNavigation();

  return (
    <Box justifyContent="space-around" flexDirection="row" flexWrap="wrap">
      {[...categories].map((cat, index) => (
        <Category
          key={index}
          onPress={() => {
            setCategory(cat);
          }}
          active={
            !category ? false : cat.title === category.title ? true : false
          }
          image={cat.image}
          title={cat.title}
        />
      ))}
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
