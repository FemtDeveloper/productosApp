import React, {useContext} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ProductsContext} from '../context/ProductsContext';

export const ProductsScreen = () => {
  const {products} = useContext(ProductsContext);

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <FlatList
        data={products}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.textItem}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textItem: {fontSize: 20},
  itemSeparator: {
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.5)',
    marginVertical: 5,
  },
});
