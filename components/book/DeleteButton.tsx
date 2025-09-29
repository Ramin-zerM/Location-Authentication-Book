import { Text, StyleSheet } from "react-native";

const DeleteButton = () => {
  return <Text style={styles.delete}>Delete this book</Text>;
};

const styles = StyleSheet.create({
  delete: {
    color: "red",
    marginTop: 20,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default DeleteButton;
