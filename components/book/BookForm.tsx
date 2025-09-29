import { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import PrimaryButton from "../common/PrimaryButton";

type BookFormProps = {
  initial?: any;
  onSubmit: (books: any) => void;
  submitLabel?: string;
};

const BookForm = ({ initial, onSubmit, submitLabel = "Save" }: BookFormProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setAuthor(initial.author || "");
      setGenre(initial.genre || "");
      setYear(initial.year ? String(initial.year) : "");
      setPrice(initial.price ? String(initial.price) : "");
    }
  }, [initial]);

  const handleSubmit = () => {
    const bookData = {
      title,
      author,
      genre,
      year: parseInt(year) || 0,
      price: parseFloat(price) || 0,
    };
    onSubmit(bookData);
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#9E9E9E"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        placeholderTextColor="#9E9E9E"
        value={author}
        onChangeText={setAuthor}
      />
      <TextInput
        style={styles.input}
        placeholder="Genre"
        placeholderTextColor="#9E9E9E"
        value={genre}
        onChangeText={setGenre}
      />
      <TextInput
        style={styles.input}
        placeholder="Year"
        placeholderTextColor="#9E9E9E"
        keyboardType="numeric"
        value={year}
        onChangeText={setYear}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        placeholderTextColor="#9E9E9E"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <PrimaryButton label={submitLabel} onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#E0E0E0",  
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: "#212121",       
  },
});

export default BookForm;
