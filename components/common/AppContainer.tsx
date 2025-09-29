import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
};

export default AppContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA", 
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
});
