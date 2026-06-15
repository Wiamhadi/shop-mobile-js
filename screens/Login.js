import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login({ navigation }) {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.email) {
      newErrors.email = "Email obligatoire";
    } else if (!form.email.includes("@")) {
      newErrors.email = "Email invalide";
    }

    if (!form.password) {
      newErrors.password = "Mot de passe obligatoire";
    } else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    console.log("Tentative login", form);

    try {
      const res = await fetch("http://172.16.18.85:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("Status =", res.status);
      console.log("Data =", data);
    
       if (res.ok) {
        login(data.user); 
      }

      if (res.ok) {
        login(data.user);
        navigation.navigate("Home");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log("ERREUR COMPLETE =", err);
      alert("Erreur réseau");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Connexion</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="exemple@mail.com"
          value={form.email}
          onChangeText={(t) => handleChange("email", t)}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="******"
          secureTextEntry
          value={form.password}
          onChangeText={(t) => handleChange("password", t)}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>
            Pas de compte ? S'inscrire
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#eef1f6",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#f9fafc",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#2f80ed",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    textAlign: "center",
    color: "#2f80ed",
  },
});
