import React, {createContext, useEffect, useReducer} from 'react';
import {
  LoginData,
  LoginResponse,
  RegisterData,
  Usuario,
} from '../interfaces/appInterfaces';
import {AuthState, authReducer} from './AuthReducer';
import cafeApi from '../api/cafeApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not authenticated';
  signUp: (obj: RegisterData) => Promise<void>;
  signIn: (obj: LoginData) => Promise<void>;
  logOut: () => void;
  removeError: () => void;
};

const authInitialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.log('no hay token');

      return dispatch({type: 'authenticationFailed'});
    }
    const resp = await cafeApi.get('/auth');

    if (resp.status !== 200) {
      return dispatch({type: 'authenticationFailed'});
    }
    await AsyncStorage.setItem('token', resp.data.token);

    dispatch({
      type: 'signUp',
      payload: {token: resp.data.token, user: resp.data.usuario},
    });
  };

  const signIn = async ({correo, password}: LoginData) => {
    try {
      const {data} = await cafeApi.post<LoginResponse>('/auth/login', {
        correo,
        password,
      });
      dispatch({
        type: 'signUp',
        payload: {token: data.token, user: data.usuario},
      });

      await AsyncStorage.setItem('token', data.token);

      console.log(data);
    } catch (error: any) {
      console.log(error.response.data);
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'Datos incorrectos',
      });
    }
  };
  const signUp = async ({nombre, correo, password}: RegisterData) => {
    try {
      const {data} = await cafeApi.post<LoginResponse>('/usuarios', {
        nombre,
        correo,
        password,
      });
      dispatch({
        type: 'signUp',
        payload: {token: data.token, user: data.usuario},
      });

      await AsyncStorage.setItem('token', data.token);

      console.log(data);
    } catch (error: any) {
      console.log(error.response.data);
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'El correo ya está registrado',
      });
    }
  };
  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'logout'});
  };
  const removeError = () => {
    dispatch({type: 'removeError'});
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
