import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type BookCardProps = {
  title: string;
  author: string;
  genre: string;
  year: number;
  price: number;
  onPress?: () => void;
};

const BookCard = ({ title, author, genre, year, price, onPress }: BookCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.year}>{year}</Text>
      </View>
      <Text style={styles.author}>by {author}</Text>
      <Text style={styles.genre}>Genre: {genre}</Text>
      <Text style={styles.price}>${price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#977DFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0033FF",
  },
  year: {
    fontSize: 14,
    color: "#977DFF",
    fontWeight: "600",
  },
  author: {
    marginTop: 6,
    fontSize: 15,
    color: "#555",
  },
  genre: {
    fontSize: 14,
    marginTop: 4,
    color: "#977DFF",
  },
  price: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "700",
    color: "#0033FF",
  },
});

export default BookCard;
