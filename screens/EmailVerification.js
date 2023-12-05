import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import * as Animatable from "react-native-animatable";

const EmailVerificationScreen = ({ navigation }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const [error, setError] = useState("");

  const handleVerifyEmail = async () => {
    try {
      await firebase.auth().applyActionCode(verificationCode);
      setVerificationStatus("verified");
    } catch (error) {
      setError(error.message);
      setVerificationStatus("failed");
    }
  };

  // Use useEffect to automatically trigger the email verification process.
  useEffect(() => {
    handleVerifyEmail();
  }, []); // An empty dependency array ensures that this effect runs once, similar to componentDidMount.

  return (
    <View style={styles.container}>
      <Animatable.View animation="bounce" iterationCount="infinite">
        <Image
          source={require("../image/email.png")}
          style={styles.emailicon}
        />
      </Animatable.View>

      <Text style={styles.text}>
        {"\n"}
        {
          "Hi, We have sent you a confirmation link on your registered email address, kindly verify before logging in.otherwise your acount will get deleted."
        }
        {"\n"}
        {""}
      </Text>
      {/* Optionally, you can add a button for users to manually proceed to the login screen. */}
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={() => navigation.navigate("WelcomeScreen")}
      >
        <View>
          <Text style={styles.buttonText}>Continue to Login</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(16, 196, 40)",
  },
  text: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textAlign: "center",
    lineHeight: 24,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    margin: 10,
  },
  button: {
    paddingVertical: 6,
    marginTop: 40,
    paddingHorizontal: 12,
    backgroundColor: "red",
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textAlign: "center",
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 10,
  },
  emailicon: {
    height: 210,
    width: 215,
    alignSelf: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default EmailVerificationScreen;
