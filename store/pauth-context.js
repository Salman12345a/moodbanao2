import React, { createContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  signInWithPhoneNumber: (phoneNumber) => {},
  confirmCode: (verificationId, code) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authenticatedUser) => {
      setUser(authenticatedUser);
    });

    return () => unsubscribe();
  }, []);

  async function signInWithPhoneNumber(phoneNumber) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      // Save the verificationId to AsyncStorage or some state management
      // for later use in confirming the code.
      const verificationId = confirmation.verificationId;
      // Save the verificationId to AsyncStorage
      await AsyncStorage.setItem("verificationId", verificationId);
    } catch (error) {
      console.error("Phone authentication error:", error);
    }
  }

  async function confirmCode(verificationId, code) {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      await auth().signInWithCredential(credential);
    } catch (error) {
      console.error("Phone code confirmation error:", error);
    }
  }

  async function logout() {
    await auth().signOut();
    setUser(null);
    // Clear any other necessary data from AsyncStorage
    await AsyncStorage.removeItem("verificationId");
  }

  const value = {
    user,
    isAuthenticated: !!user,
    signInWithPhoneNumber,
    confirmCode,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
