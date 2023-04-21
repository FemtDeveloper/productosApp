import React, {useContext, useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ProductsContext} from '../context/ProductsContext';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductStackParams} from '../navigator/ProductsNavigator';

interface Props extends StackScreenProps<ProductStackParams, 'ProductScreen'> {}

export const ProductsScreen = ({navigation}: Props) => {
  const {products} = useContext(ProductsContext);

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => navigation.navigate('ProductScreen', {})}>
          <Text>Agregar</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <FlatList
        data={products}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate('ProductScreen', {
                id: item._id,
                name: item.nombre,
              })
            }>
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
