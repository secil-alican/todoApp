import { View, Text } from "react-native";
import "react-native-reanimated";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from "../screens/IndexScreen";
import ManageScreen from "../screens/ManageScreen";

export default function RootLayout() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#BCCCDC",

            },
            headerTintColor: "#FFF",
            contentStyle: { backgroundColor: "#3E5879", color: "#FFF" },
            headerShown:false
          }}
        >
          <Stack.Screen
            name="IndexScreen"
            component={IndexScreen}
            options={{
              title: "Task List",
            }}
          />
          <Stack.Screen
            name="ManageScreen"
            component={ManageScreen}
            options={{ title: "Görev Ekle" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
