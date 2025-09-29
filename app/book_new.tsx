import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import BookForm from "../components/book/BookForm";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookNew = () => {
  const [saving, setSaving] = useState(false);

  const handleCreate = async (bookData: any) => {
    setSaving(true);
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Error", "You must login first!");
        setSaving(false);
        return;
      }

      const response = await fetch("http://10.26.144.48:3000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookData),
      });

      const text = await response.text();
      console.log("Create book response:", text);

      if (response.ok) {
        Alert.alert("Success", "Book created successfully", [
          {
            text: "OK",
            onPress: () => {
              router.replace("/book");
            },
          },
        ]);
      } else {
        let message = "Failed to create book";
        try {
          const errorData = JSON.parse(text);
          message = errorData.message || message;
        } catch {
          if (text) message = text;
        }
        Alert.alert("Error", message);
      }
    } catch (error) {
      console.error("Error creating book:", error);
      Alert.alert("Error", "Something went wrong while creating the book");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Book</Text>
      <BookForm
        onSubmit={handleCreate}
        submitLabel={saving ? "Creating..." : "Create Book"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1e293b",
  },
});

export default BookNew;
