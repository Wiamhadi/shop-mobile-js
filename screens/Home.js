import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function Home({ navigation }) {
  const { cart } = useContext(CartContext);

  // ✅ PRODUITS DEPUIS BACKEND
  const [products, setProducts] = useState([]);

 
  const isLoggedIn = true;

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.replace("Login");
    }
  }, [isLoggedIn]);

  // ✅ FETCH MONGODB
  useEffect(() => {
    fetch("http://172.16.18.85:5000/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA =", data);
        setProducts(data);
      })
      .catch((err) => console.log("Erreur API:", err));
  }, []);

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>🛍 Shop App</Text>

        {/* PANIER */}
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => navigation.navigate("Cart")}
        >
          <Text style={styles.cartText}>
            🛒  {cart.reduce((total, item) => total + item.qty, 0)}
          </Text>
        </TouchableOpacity>

        {/* PROFILE */}
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text>👤 Profil</Text>
        </TouchableOpacity>
      </View>

      {/* PRODUITS */}
      <FlatList
        data={products}
        keyExtractor={(item) => item._id} // ✅ MongoDB ID
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Product", { product: item })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>

              <Text style={styles.desc}>
                {item.desc}
              </Text>

              <Text style={styles.price}>
                {item.price} €
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fa",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    elevation: 5,
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  cartBtn: {
    backgroundColor: "#2f80ed",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  cartText: {
    color: "#fff",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 160,
  },

  info: {
    padding: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  desc: {
    color: "#666",
    marginVertical: 5,
  },

  price: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#2f80ed",
  },
});
