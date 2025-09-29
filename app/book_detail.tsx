import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import BookForm from "../components/book/BookForm";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://10.26.144.48:3000/api/books";

const BookDetail = () => {
  const { id } = useLocalSearchParams();
  const [book, setBook] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await fetch(`${API_URL}/${id}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        const data = await response.json();
        setBook(data.books || data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleSave = async (updatedBook: any) => {
    setSaving(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(updatedBook),
      });

      if (response.ok) {
        Alert.alert("Success", "Book updated successfully");
      } else {
        const text = await response.text();
        Alert.alert("Error", text || "Update failed");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (response.ok) {
        Alert.alert("Deleted", "Book deleted successfully", [
          { text: "OK", onPress: () => router.replace("/book") },
        ]);
      } else {
        const text = await response.text();
        Alert.alert("Error", text || "Delete failed");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      Alert.alert("Error", "Network error while deleting book");
    }
  };

  const confirmDelete = () => {
    Alert.alert("Confirm Deletion", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: handleDelete },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  if (!book) return <Text>No book found.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✏️ Edit Book</Text>

      <BookForm
        initial={book}
        onSubmit={handleSave}
        submitLabel={saving ? "Saving..." : "Save"}
      />

      {/* ปุ่ม Delete */}
      <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
        <Text style={styles.deleteText}>Delete this book</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookDetail;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FAFAFA" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20, color: "#212121" ,marginTop:20},
  deleteButton: {
    marginTop: 20,
    backgroundColor: "#ff5b5bff", 
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
