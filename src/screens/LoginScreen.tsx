import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';
import {Background} from '../components/Background';
import {ReactLogo} from '../components/ReactLogo';
import {loginStyles} from '../theme/LoginTheme';
import {useForm} from '../hooks/useForm';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthContext} from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {
  const {email, password, onChange} = useForm({email: '', password: ''});
  const {signIn, errorMessage, removeError} = useContext(AuthContext);

  const onLogin = () => {
    console.log({email, password});
    signIn({correo: email, password});
    Keyboard.dismiss();
  };

  const onNavigate = () => {
    console.log('navigatingToRegister');
    navigation.navigate('RegisterScreen');
  };

  useEffect(() => {
    if (errorMessage.length === 0) {
      return;
    }
    Alert.alert('Login incorrecto', errorMessage, [
      {text: 'Ok', onPress: removeError},
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  return (
    <>
      <Background />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.formContainer}>
          <ReactLogo />
          <Text style={loginStyles.title}>Login</Text>
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
            onSubmitEditing={onLogin}
            autoCorrect={false}
            onChangeText={value => onChange(value, 'email')}
          />
          <Text style={loginStyles.label}>Password</Text>
          <TextInput
            placeholder="********"
            placeholderTextColor={'white'}
            underlineColorAndroid={'white'}
            autoCapitalize="none"
            style={loginStyles.inputField}
            onChangeText={value => onChange(value, 'password')}
            onSubmitEditing={onLogin}
            secureTextEntry
          />
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              style={loginStyles.button}
              activeOpacity={0.7}
              onPress={onLogin}>
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity activeOpacity={0.7} onPress={onNavigate}>
              <Text style={loginStyles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
