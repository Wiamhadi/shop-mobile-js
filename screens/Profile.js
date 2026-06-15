import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Profile({ setIsLoggedIn }) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>👤 Mon Profil</Text>

      <View style={styles.card}>
        <Text style={styles.text}>Nom: User</Text>
        <Text style={styles.text}>Email: user@mail.com</Text>
      </View>

      <TouchableOpacity
        style={styles.logout}
        onPress={() => setIsLoggedIn(false)}
      >
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fa",
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
  },

  text: {
    fontSize: 16,
    marginBottom: 5,
  },

  logout: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});