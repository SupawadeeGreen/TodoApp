import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const FilterComponent = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={{color: props.color}}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default FilterComponent;
