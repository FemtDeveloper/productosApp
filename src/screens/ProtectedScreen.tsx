import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const ProtectedScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ProtectedScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'blue',
  },
});
