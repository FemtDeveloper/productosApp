import React, {useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ReactLogo} from '../components/ReactLogo';
import {loginStyles} from '../theme/LoginTheme';
import {useForm} from '../hooks/useForm';
import {AuthContext} from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {email, password, name, onChange} = useForm({
    name: '',
    email: '',
    password: '',
  });
  const {signUp} = useContext(AuthContext);

  const onRegister = () => {
    console.log({email, password, name});
    signUp({nombre: name, correo: email, password});
    Keyboard.dismiss();
  };
  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: 'red'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.formContainer}>
          <ReactLogo />
          <Text style={loginStyles.title}>Registro</Text>
          <Text style={loginStyles.label}>Nombre:</Text>
          <TextInput
            placeholder="Ingrese su nombre"
            placeholderTextColor={'white'}
            underlineColorAndroid={'white'}
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIos,
            ]}
            selectionColor={'cyan'}
            autoCapitalize="words"
            onSubmitEditing={onRegister}
            autoCorrect={false}
            onChangeText={value => onChange(value, 'name')}
            value={name}
          />
          <Text style={loginStyles.label}>Email</Text>
          <TextInput
            placeholder="Ingrese su email"
            keyboardType="email-address"
            placeholderTextColor={'white'}
            underlineColorAndroid={'white'}
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIos,
            ]}
            selectionColor={'cyan'}
            autoCapitalize="none"
            onSubmitEditing={onRegister}
            autoCorrect={false}
            onChangeText={value => onChange(value, 'email')}
            value={email}
          />
          <Text style={loginStyles.label}>Password</Text>
          <TextInput
            placeholder="********"
            placeholderTextColor={'white'}
            underlineColorAndroid={'white'}
            autoCapitalize="none"
            style={loginStyles.inputField}
            onChangeText={value => onChange(value, 'password')}
            onSubmitEditing={onRegister}
            secureTextEntry
          />
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              style={loginStyles.button}
              activeOpacity={0.7}
              onPress={onRegister}>
              <Text style={loginStyles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.replace('LoginScreen')}
            style={loginStyles.buttonReturn}>
            <Text style={loginStyles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
