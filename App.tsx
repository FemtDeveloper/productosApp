import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from './src/navigator/Navigator';
import {AuthProvider} from './src/context/AuthContext';

const AppState = ({children}: any) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default function App() {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
}