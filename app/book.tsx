import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator,TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, Link } from "expo-router";

type Book = { id?: number; _id?: string; title: string; author: string };

const BookScreen = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      const token = await AsyncStorage.getItem("userToken"); 
      if (!token) {
        router.replace("/Signin");
        return;
      }
      try {
        const res = await fetch("http://10.26.144.48:3000/api/books", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setBooks(data.books);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 My Books</Text>
      <Text style={styles.createBtn}>
          <Link href="/book_new">＋ New</Link>
        </Text>
      <FlatList
        data={books}
        keyExtractor={(item, index) => (item.id ?? item._id ?? index).toString()}
        renderItem={({ item }) => (
          <Link href={`/book_detail?id=${item.id ?? item._id}`} asChild>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookAuthor}>{item.author}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
};

export default BookScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FAFAFA" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 10, color: "#212121" , marginTop: 20},
  bookItem: {
    fontSize: 16,
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  card: {
  backgroundColor: "#fff",
  padding: 16,
  borderRadius: 12,
  marginBottom: 12,
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
},
bookTitle: { fontSize: 16, fontWeight: "600", color: "#212121" },
bookAuthor: { fontSize: 14, color: "#757575", marginTop: 4 },
createBtn: {
  fontSize: 16,
  color: "#2196F3",
  fontWeight: "600",
  textAlign: "right",
  marginBottom: 10,
},
});
