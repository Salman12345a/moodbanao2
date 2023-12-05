import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Button from '../ui/Button';
import Input from './Input';

function PhoneAuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');
  const [enteredConfirmationCode, setEnteredConfirmationCode] = useState('');

  const {
    phoneNumber: phoneNumberIsInvalid,
    confirmationCode: confirmationCodeIsInvalid,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'phoneNumber':
        setEnteredPhoneNumber(enteredValue);
        break;
      case 'confirmationCode':
        setEnteredConfirmationCode(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      phoneNumber: enteredPhoneNumber,
      confirmationCode: enteredConfirmationCode,
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container1}>
      <View style={styles.form}>
        <Input
          label="Phone Number"
          onUpdateValue={updateInputValueHandler.bind(this, 'phoneNumber')}
          value={enteredPhoneNumber}
          keyboardType="phone-pad"
          isInvalid={phoneNumberIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirmation Code"
            onUpdateValue={updateInputValueHandler.bind(this, 'confirmationCode')}
            value={enteredConfirmationCode}
            isInvalid={confirmationCodeIsInvalid}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

export default PhoneAuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },

  form: {
    color: 'black',
  },

  container1: {
    justifyContent: 'center',
    padding: 16,
  },
});
