import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./firebase.ts"; // import the app from your firebase.ts file
// import { getFirestore, doc, setDoc } from "firebase/firestore";

// ...

// const auth = getAuth(app);

export const handleSignup = async (email: string, password: string) => {
  const auth = getAuth(app);
  //   const db = getFirestore(app);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Store additional user data in Firestore
    // await setDoc(doc(db, "userftfs", user.uid), {
    //   username,
    //   role,
    // });

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
