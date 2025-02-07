import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Foundation from "@expo/vector-icons/Foundation";
import { saveTasks, removeTasks, setDone } from "../firebase/firestore";
import { collection, addDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function IndexScreen() {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);

  function resetValue() {
    setValue("");
  }

  useEffect(() => {
    const getTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        const fetchedTasks = [];
        querySnapshot.forEach((doc) => {
          fetchedTasks.push({ id: doc.id, ...doc.data() });
        });
        setTasks(fetchedTasks);
      } catch (err) {
        console.error("Error fetching tasks: ", err);
      }
    };

    getTasks();
  }, [tasks]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Today's Tasks</Text>
      {tasks.length <= 0 && (
        <Text style={styles.text}>You have no task today!</Text>
      )}

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          {
            return (
              <View style={[styles.list, item.done ? styles.isDone : null]}>
                <View style={styles.item}>
                  <Foundation name="clipboard-notes" size={24} color="black" />
                  <Text style={styles.taskText}>{item.task}</Text>
                </View>
                <View>
                  <View style={styles.icons}>
                    <Pressable
                      style={({ pressed }) => pressed && styles.pressed}
                      onPress={() => setDone(item.id, item.done)}
                    >
                      <MaterialIcons name="done" size={24} color="black" />
                    </Pressable>
                    <Pressable
                      style={({ pressed }) => pressed && styles.pressed}
                      onPress={async () => {
                        await removeTasks(item.id);
                      }}
                    >
                      <Entypo name="trash" size={24} color="black" />
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          }
        }}
      />

      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          placeholder="New Task"
          value={value}
          onChangeText={(newValue) => setValue(newValue)}
          multiline
          maxLength={100}
          placeholderTextColor="gray"
        />

        <Pressable
          style={({ pressed }) => pressed && styles.pressed}
          onPress={async () => {
            const newId = Math.random().toString();
            const done = false;
            await saveTasks(value, newId, done);

            resetValue();
          }}
        >
          <AntDesign
            name="plus"
            size={40}
            color="#9AA6B2"
            style={styles.icon}
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 60,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: "#FFF",
    borderColor: "white",
    fontSize: 20,
    padding: 10,
    width: 300,
  },
  icon: {
    width: 50,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 50,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
  },
  input: {
    flexDirection: "row",
    gap: 8,
  },
  pressed: {
    opacity: 0.5,
  },
  item: {
    flexDirection: "row",
    gap: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "20",
  },
  taskText: {
    fontSize: 20,
    width: 230,
  },
  list: {
    backgroundColor: "#FFF",
    padding: 30,
    borderRadius: 20,
    marginVertical: 20,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  icons: {
    flexDirection: "row",
    gap: 10,
  },
  isDone: {
    backgroundColor: "#AEEA94",
  },
});
