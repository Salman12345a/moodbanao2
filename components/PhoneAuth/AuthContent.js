import { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import FlatButton from "../ui/FlatButton";
import PhoneAuthForm from "./PhoneAuthForm"; // Assume you create a PhoneAuthForm component
import { Colors } from "../../constants/styles";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    phoneNumber: false,
    confirmationCode: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("PhoneSignup"); // Adjust navigation name accordingly
    } else {
      navigation.replace("PhoneLogin"); // Adjust navigation name accordingly
    }
  }

  function submitHandler(credentials) {
    let { phoneNumber, confirmationCode } = credentials;

    phoneNumber = phoneNumber.trim();
    confirmationCode = confirmationCode.trim();

    // Implement your validation logic for phone number and confirmation code

    const phoneNumberIsValid = phoneNumber;
    const confirmationCodeIsValid = confirmationCode.length === 6;

    if (!phoneNumberIsValid || !confirmationCodeIsValid) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        phoneNumber: !phoneNumberIsValid,
        confirmationCode: !confirmationCodeIsValid,
      });
      return;
    }

    onAuthenticate({ phoneNumber, confirmationCode });
  }

  return (
    <ScrollView contentContainerStyle={styles.container1}>
      <ImageBackground
        source={require("../../image/img1.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.authContent}>
          <PhoneAuthForm
            isLogin={isLogin}
            onSubmit={submitHandler}
            credentialsInvalid={credentialsInvalid}
          />
          <View style={styles.buttons}>
            <FlatButton onPress={switchAuthModeHandler}>
              {isLogin ? "Switch to Phone Signup" : "Switch to Phone Login"}
            </FlatButton>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 370,
    marginBottom: 100,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 15,
  },

  container1: {
    justifyContent: "center",
    padding: -1,
  },

  backgroundImage: {
    marginTop: -19,
  },

  buttons: {
    marginTop: 8,
  },
});
