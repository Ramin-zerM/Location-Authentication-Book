import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { ExpoRoot } from "expo-router";
import BiometricGate from "./components/auth/BiometricGate";

export default function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkBiometric = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) {
        setAuthChecked(true);
        return;
      }

      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) {
        setAuthChecked(true);
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with Biometrics",
        fallbackLabel: "Use Passcode",
      });

      setIsAuthenticated(result.success);
      setAuthChecked(true);
    };

    checkBiometric();
  }, []);

  if (!authChecked) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <BiometricGate onRetry={() => setAuthChecked(false)} />;
  }

  const ctx = (require as any).context("./app");
  return <ExpoRoot context={ctx} />;
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
});
