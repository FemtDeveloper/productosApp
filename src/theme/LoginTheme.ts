import {StyleSheet} from 'react-native';

export const loginStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    height: 600,
    marginBottom: 50,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
  label: {marginTop: 20, fontSize: 22, fontWeight: 'bold', color: 'white'},
  inputField: {
    color: 'white',
    fontSize: 18,
  },
  inputFieldIos: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    paddingBottom: 5,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    borderWidth: 2,
    borderColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  newUserContainer: {alignItems: 'flex-end', marginTop: 20},
  buttonReturn: {
    position: 'absolute',
    top: 50,
    left: 20,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});
