import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BiometricGate = ({ onRetry }: { onRetry: () => void }) => {
    return (
        <View style={styles.container}>
        <Ionicons name="lock-closed" size={64} color="#2196F3" />
        <Text style={styles.title}>Authentication Required</Text>
        <Text style={styles.subtitle}>
            Please login with Face ID / Touch ID to continue
        </Text>
        <TouchableOpacity style={styles.button} onPress={onRetry}>
            <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
        </View>
    );
};

export default BiometricGate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FAFAFA",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginTop: 20,
        color: "#212121",
    },
    subtitle: {
        fontSize: 14,
        marginTop: 8,
        color: "#757575",
        textAlign: "center",
    },
    button: {
        marginTop: 24,
        backgroundColor: "#2196F3",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});
