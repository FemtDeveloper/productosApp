import React from 'react';
import {View} from 'react-native';

export const Background = () => {
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: '#5856d6',
        top: -250,
        height: 1100,
        width: 1000,
        transform: [{rotate: '-70deg'}],
      }}
    />
  );
};
