import { View, Text, StyleSheet } from "react-native";

const HeaderBar = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Books</Text>
      <Text style={styles.link}>＋ New</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0033FF",
  },
  link: {
    fontSize: 16,
    fontWeight: "700",
    color: "#977DFF",
  },
});

export default HeaderBar;
