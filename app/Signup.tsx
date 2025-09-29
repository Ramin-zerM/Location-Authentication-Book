import React, { useState } from "react";
import { Text, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import AppContainer from "../components/common/AppContainer";
import AppInput from "../components/common/AppInput";
import AppButton from "../components/common/AppButton";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
  try {
    const res = await fetch("http://10.26.144.48:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Signup failed");
    }

    Alert.alert("Success", "Account created successfully!");
    router.push("/Signin");
  } catch (err: any) {
    Alert.alert("Error", err.message || "Something went wrong");
  }
};


  return (
    <AppContainer>
      <Text style={styles.title}>Create Account</Text>

      <AppInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <AppInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <AppInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <AppButton title="Sign Up" onPress={handleSignup} />
      <AppButton
        title="Back to Sign In"
        type="secondary"
        onPress={() => router.push("/Signin")}
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
    marginBottom: 24,
  },
});

export default Signup;
