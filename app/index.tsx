import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import AppButton from "../components/common/AppButton";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📚 My Library</Text>
        <Text style={styles.subtitle}>
          Welcome! Please sign in or create an account
        </Text>
      </View>

      {/* Full-width Buttons */}
      <View style={styles.buttonGroup}>
        <Link href="/Signup" asChild>
          <AppButton title="SIGN UP" onPress={() => {}} />
        </Link>

        <Link href="/Signin" asChild>
          <AppButton title="LOGIN" type="secondary"   onPress={() => {}}/>
        </Link>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#212121",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#757575",
    textAlign: "center",
  },
  buttonGroup: {
    width: "100%",
    marginTop: 20,
  },
});
