import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../config";
import firebase from "firebase/compat/app";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Otp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    checkIfUserIsAuthenticated();
  }, []);

  const checkIfUserIsAuthenticated = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        // User is authenticated, navigate to the welcome screen
        navigation.navigate("Welcomes");
      }
    } catch (error) {
      console.error("Error checking authentication status:", error);
    }
  };

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
    setPhoneNumber("");
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );

    // Sign in the user with the credentials
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(async () => {
        setCode("");
        // Save the authentication status
        await AsyncStorage.setItem("userToken", "authenticated");

        // Navigate to the welcome screen
        navigation.navigate("Welcomes");
        Alert.alert("Login successful. Welcome to the dashboard");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text style={styles.otpText}>Login using otp</Text>
      <TextInput
        placeholder="Enter your mobile number"
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoCompleteType="tel"
        style={styles.textInput}
      />
      <TouchableOpacity
        style={styles.sendVerification}
        onPress={sendVerification}
      >
        <Text style={styles.buttonText}>Send Verification Code</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Confirm code"
        onChangeText={setCode}
        keyboardType="number-pad"
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
        <Text style={styles.buttonText}>Confirm Verification Code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  textInput: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    fontSize: 24,
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },

  sendVerification: {
    padding: 20,
    backgroundColor: "#3498db",
    borderRadius: 10,
  },

  sendCode: {
    padding: 20,
    backgroundColor: "#9b59b6",
    borderRadius: 10,
  },

  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },

  otpText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    margin: 20,
  },
});
