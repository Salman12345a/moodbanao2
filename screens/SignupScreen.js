import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import COLORS from "../regcomp/colors";
import Button from "../regcomp/buttons";
import Input from "../regcomp/input";
import Loader from "../regcomp/loader";
import { firebase } from "../config";

const RegistrationScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    email: "",
    fullname: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleValidation = (field, value) => {
    // Implement your validation logic for each field here.
    switch (field) {
      case "email":
        if (!value) return "Please input email";
        if (!value.match(/\S+@\S+\.\S+/)) return "Please enter a valid email.";
        if (!/\S+@gmail\.com$/.test(value))
          return "Email should end with @gmail.com";
        if (!/^[a-z0-9._%+-]+@gmail\.com$/.test(value))
          return " use only lowercase letters.";
        break;
      case "fullname":
        if (!value) return "Please input full name";
        break;
      case "password":
        if (!value) return "Please input password";
        if (value.length < 5) return "Minimum password length is 5";
        if (!/[a-zA-Z]/.test(value))
          return "Password must contain at least one letter";
        if (!/[!@#$%^&*?.,]$/.test(value))
          return "Special character are Atlast !@#$%^&*?.,";

        break;
      case "confirmPassword":
        if (value !== inputs.password) return "Passwords do not match";
        break;
      default:
        break;
    }
    return null;
  };

  const handleInputChange = (field, value) => {
    const error = handleValidation(field, value);
    setErrors({ ...errors, [field]: error });
    setInputs({ ...inputs, [field]: value });
  };

  const handleRegistration = async () => {
    Keyboard.dismiss();

    // Check for errors before registration
    const validationErrors = {};

    for (const field in inputs) {
      const error = handleValidation(field, inputs[field]);
      if (error) {
        validationErrors[field] = error;
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      // If there are validation errors, diy them and do not proceed with registration
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    const { email, password } = inputs;

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      setLoading(false);

      // Send a verification email to the user
      const user = firebase.auth().currentUser;
      await user.sendEmailVerification();

      // Navigate to the email verification screen
      navigation.navigate("EmailVerification");
    } catch (error) {
      Alert.alert("Error", "Registration failed: " + error.message);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Register
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Register
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleInputChange("email", text)}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />

          <Input
            onChangeText={(text) => handleInputChange("fullname", text)}
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullname}
          />

          <Input
            onChangeText={(text) => handleInputChange("password", text)}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />

          <Input
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
            iconName="lock-outline"
            label="Confirm Password"
            placeholder="Re-enter your password"
            error={errors.confirmPassword}
            password
          />

          <Button title="Register" onPress={handleRegistration} />
          <Text
            onPress={() => navigation.navigate("Login")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Already have an account? Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
