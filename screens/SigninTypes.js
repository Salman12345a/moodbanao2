import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const AuthSelectionScreen = ({ navigation }) => {
  const handleEmailAuth = () => {
    // Navigate to email authentication screen
    navigation.navigate("Login");
  };

  const PhoneAuthentication = () => {
    // Navigate to email authentication screen
    navigation.navigate("PhoneAuthentication");
  };

  const Register = () => {
    // Navigate to email authentication screen
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Authentication Method</Text>

      <TouchableOpacity style={styles.button} onPress={PhoneAuthentication}>
        <Text style={styles.buttonText}>Login with Phone</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleEmailAuth}>
        <Text style={styles.buttonText}>Login with Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={Register}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AuthSelectionScreen;
