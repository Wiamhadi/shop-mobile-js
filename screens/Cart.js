import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } =
    useContext(CartContext);

  const total = (cart || []).reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <View style={{ flex: 1, padding: 15, backgroundColor: "#f4f6fa" }}>

      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        🛒 Mon panier
      </Text>

      {cart.length === 0 ? (
        <Text>Ton panier est vide</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                marginBottom: 15,
                backgroundColor: "#fff",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 80, height: 80, borderRadius: 10 }}
              />

              <View style={{ flex: 1, marginLeft: 10 }}>

                <Text style={{ fontWeight: "bold" }}>
                  {item.name}
                </Text>

                <Text style={{ color: "#2f80ed" }}>
                  {item.price * item.qty} €
                </Text>

                <Text>Qty: {item.qty}</Text>

                <View style={{ flexDirection: "row", marginTop: 8 }}>

                  <TouchableOpacity onPress={() => decreaseQty(item._id)}>
                    <Text>➖</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => increaseQty(item._id)}>
                    <Text>➕</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => removeFromCart(item._id)}>
                    <Text style={{ color: "red" }}>🗑</Text>
                  </TouchableOpacity>

                </View>
              </View>
            </View>
          )}
        />
      )}

      {/* TOTAL + PAY */}
      {cart.length > 0 && (
        <View
          style={{
            marginTop: 10,
            padding: 15,
            backgroundColor: "#fff",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Total : {total} €
          </Text>

          <TouchableOpacity
            onPress={() => alert("Paiement OK 💳")}
            style={{
              marginTop: 10,
              backgroundColor: "#2f80ed",
              padding: 12,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Payer
            </Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
}



