import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./firebase.ts"; // import the app from your firebase.ts file
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.ts";

export const handleSignup = async (email: string, password: string) => {
  const auth = getAuth(app);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return user;
  } catch (error) {
    // Handle error
  }
};

export const handleSignIn = async (email: string, password: string) => {
  const auth = getAuth(app);
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  return user;
};

export const fetchUserNotes = async (userId: string) => {
  try {
    const docRef = doc(db, "notes", userId); // Reference to the user-specific document in the "notes" collection
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data(); // You can also return the data if needed
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
};
