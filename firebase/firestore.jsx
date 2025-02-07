import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {db} from "./firebaseConfig"



export const saveTasks = async (value, id, done) => {
  try {
    const docRef = await setDoc(doc(db, "tasks", id), {
      task: value,
      id: id,
      done: done,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const removeTasks = async (id) => {
  try {
    await deleteDoc(doc(db, "tasks", id));
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

export const setDone = async (id, done) => {
  try {
    const taskDoc = doc(db, "tasks", id);
    await updateDoc(taskDoc, {
      done: !done,
    });
  } catch (error) {
    console.log(error);
  }
};
