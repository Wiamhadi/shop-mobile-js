import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Product({ route }) {
  const { product } = route.params;
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

 
  const inCart = cart.some((item) => item._id === product._id);

  return (
    <View style={styles.container}>

      <Image source={{ uri: product.image }} style={styles.image} />

      <Text style={styles.title}>{product.name}</Text>

      <Text style={styles.desc}>{product.desc}</Text>

      <Text style={styles.price}>{product.price} €</Text>

      {!inCart ? (
        <Button
          title="Ajouter au panier"
          onPress={() => addToCart(product)}
        />
      ) : (
        <Button
          title="Retirer du panier"
          color="red"
          onPress={() => removeFromCart(product._id)}
        />
      )}

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f6fa",
  },

  image: {
    width: "100%",
    height: 250,
    borderRadius: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
  },

  desc: {
    marginTop: 10,
    color: "#666",
    fontSize: 14,
  },

  price: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#2f80ed",
  },
});