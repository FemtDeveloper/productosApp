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
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {ProductStackParams} from '../navigator/ProductsNavigator';
import {useCategories} from '../hooks/useCategories';
import {useForm} from '../hooks/useForm';
import {ProductsContext} from '../context/ProductsContext';

interface Props extends StackScreenProps<ProductStackParams, 'ProductScreen'> {}

export const ProductScreen = ({navigation, route}: Props) => {
  const {name = 'Nuevo Producto', id = ''} = route.params;

  const {categories} = useCategories();
  const {loadProductById} = useContext(ProductsContext);
  const {_id, categoriaId, img, nombre, form, onChange, setFormValue} = useForm(
    {
      _id: id,
      nombre: name,
      categoriaId: '',
      img: '',
    },
  );

  const loadProduct = async () => {
    if (id.length === 0) {
      return;
    }
    const producto = await loadProductById(id);
    setFormValue({
      _id: id,
      categoriaId: producto.categoria._id,
      img: producto.img || '',
      nombre: name,
    });
  };

  useEffect(() => {
    loadProduct();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [name, navigation]);

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
          onValueChange={value => onChange(value, 'categoriaId')}>
          {categories.map(cat => (
            <Picker.Item label={cat.nombre} value={cat._id} key={cat._id} />
          ))}
        </Picker>
        <Button title="Guardar" color="#5856d6" />
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
