function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {!user ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Profile" component={Profile} />
        </>
      )}
    </Stack.Navigator>
  );
}