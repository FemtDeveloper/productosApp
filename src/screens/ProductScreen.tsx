import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useContext} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {ProductStackParams} from '../navigator/ProductsNavigator';
import {useCategories} from '../hooks/useCategories';
import {useForm} from '../hooks/useForm';
import {ProductsContext} from '../context/ProductsContext';

interface Props extends StackScreenProps<ProductStackParams, 'ProductScreen'> {}

export const ProductScreen = ({navigation, route}: Props) => {
  const {name = '', id = ''} = route.params;

  const {categories} = useCategories();
  const {loadProductById, addProduct, updateProduct} =
    useContext(ProductsContext);

  const {categoriaId, img, nombre, form, _id, onChange, setFormValue} = useForm(
    {
      _id: id,
      categoriaId: '',
      nombre: name,
      img: '',
    },
  );

  useEffect(() => {
    navigation.setOptions({
      title: nombre ? nombre : 'Sin nombre de producto',
    });
  }, [nombre]);

  const loadProduct = async () => {
    if (id.length === 0) {
      return;
    }
    const producto = await loadProductById(id);
    setFormValue({
      _id: id,
      categoriaId: producto.categoria._id,
      img: producto.img || '',
      nombre,
    });
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const onUpdateOrCreate = async () => {
    if (id.length > 0) {
      updateProduct(categoriaId, nombre, id);
      return;
    } else {
      const tempCategory = categoriaId || categories[0]._id;

      const newProduct = await addProduct(tempCategory, nombre);
      onChange(newProduct._id, '_id');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto:</Text>
        <TextInput
          style={styles.textInput}
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
        />
        <Text style={styles.label}>Categoría:</Text>
        <Picker
          selectedValue={categoriaId}
          onValueChange={itemValue => onChange(itemValue, 'categoriaId')}>
          {!categoriaId && nombre !== '' ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={40} color={'black'} />
            </View>
          ) : (
            categories.map(item => (
              <Picker.Item
                label={item.nombre}
                value={item._id}
                key={item._id}
              />
            ))
          )}
        </Picker>
        <Button title="Guardar" color="#5856d6" onPress={onUpdateOrCreate} />
        {_id.length > 0 && (
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <Button title="cámara" color="#5856d6" />
            <Button title="galeria" color="#5856d6" />
          </View>
        )}
        <Text>{JSON.stringify(form, null, 4)}</Text>
        {img.length > 0 && (
          <Image
            source={{uri: img}}
            style={{
              width: '100%',
              height: 300,
              borderRadius: 25,
              marginTop: 20,
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, marginHorizontal: 20, marginTop: 10},
  label: {fontSize: 18, marginBottom: 5},
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: 'grey',
    height: 45,
    marginBottom: 15,
  },
});
