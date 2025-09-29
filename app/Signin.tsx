import React, { useState } from "react";
import { Text, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContainer from "../components/common/AppContainer";
import AppInput from "../components/common/AppInput";
import AppButton from "../components/common/AppButton";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignin = async () => {
  try {
    const res = await fetch("http://10.26.144.48:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Invalid credentials");
    }

    const data = await res.json();
      console.log("Login success:", data);

      if (data.token) {
        await AsyncStorage.setItem("userToken", data.token);
      }
      await AsyncStorage.setItem("userEmail", email);

      Alert.alert("Welcome!", "Login successful");

      router.push("/book");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };



  return (
    <AppContainer>
      <Text style={styles.title}>Sign In</Text>
      <AppInput placeholder="Email" value={email} onChangeText={setEmail} />
      <AppInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <AppButton title="Login" onPress={handleSignin} />
      <AppButton
        title="Create Account"
        type="secondary"
        onPress={() => router.push("/Signup")}
      />
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#212121",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default Signin;
