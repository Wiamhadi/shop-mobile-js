import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useState } from "react";

export default function Register({ navigation, setIsLoggedIn }) {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.nom) newErrors.nom = "Le nom est obligatoire";
    if (!form.prenom) newErrors.prenom = "Le prénom est obligatoire";

    if (!form.email) newErrors.email = "Email obligatoire";
    else if (!form.email.includes("@")) {
      newErrors.email = "Email invalide";
    }

    if (form.email !== form.confirmEmail) {
      newErrors.confirmEmail = "Les emails ne correspondent pas";
    }

    if (!form.password) newErrors.password = "Mot de passe obligatoire";
    else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 caractères";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validate()) {
      try {
        console.log("REGISTER START");
  
        const res = await fetch("http://172.16.18.85:5000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: form.nom,
            prenom: form.prenom,
            email: form.email,
            password: form.password,
          }),
        });
  
        const data = await res.json();
  
        console.log("REGISTER RESPONSE =", data);
  
        if (res.ok) {
          alert("Compte créé !");
          setIsLoggedIn(true); // auto login
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.log("REGISTER ERROR =", err);
        alert("Erreur serveur");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Créer un compte</Text>

        {/* NOM */}
        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          placeholder="Votre nom"
          value={form.nom}
          onChangeText={(t) => handleChange("nom", t)}
        />
        {errors.nom && <Text style={styles.error}>{errors.nom}</Text>}

        {/* PRENOM */}
        <Text style={styles.label}>Prénom</Text>
        <TextInput
          style={styles.input}
          placeholder="Votre prénom"
          value={form.prenom}
          onChangeText={(t) => handleChange("prenom", t)}
        />
        {errors.prenom && <Text style={styles.error}>{errors.prenom}</Text>}

        {/* EMAIL */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="exemple@mail.com"
          value={form.email}
          onChangeText={(t) => handleChange("email", t)}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        {/* CONFIRM EMAIL */}
        <Text style={styles.label}>Confirmer email</Text>
        <TextInput
          style={styles.input}
          placeholder="retapez votre email"
          value={form.confirmEmail}
          onChangeText={(t) => handleChange("confirmEmail", t)}
        />
        {errors.confirmEmail && (
          <Text style={styles.error}>{errors.confirmEmail}</Text>
        )}

        {/* PASSWORD */}
        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="******"
          secureTextEntry
          value={form.password}
          onChangeText={(t) => handleChange("password", t)}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        {/* CONFIRM PASSWORD */}
        <Text style={styles.label}>Confirmer mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="******"
          secureTextEntry
          value={form.confirmPassword}
          onChangeText={(t) => handleChange("confirmPassword", t)}
        />
        {errors.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword}</Text>
        )}

        {/* BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>

        {/* LINK LOGIN */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>
            Vous avez déjà un compte ? Se connecter
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