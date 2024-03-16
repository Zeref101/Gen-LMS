import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./firebase.ts"; // import the app from your firebase.ts file
import {
  doc,
  getDoc,
  getDocs,
  query,
  where,
  collection,
  orderBy,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "./firebase.ts";
import axios from "axios";
// import { useState } from "react";

export interface Quiz {
  id: string;
  courseId: string;
  end_date: Date; // Depending on your data structure, this might need to adjust
  // Add other quiz properties here
  name: string;
}
export interface Submitted_Quiz {
  id: string;
  quiz_id: string;
  user_id: string; // Depending on your data structure, this might need to adjust
  // Add other quiz properties here
  marks_scored: number;
  saved_answers: string[];
  name: string;
}
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
    console.log("userID" + userId);
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

export const fetchUserCourses = async (userID: string) => {
  try {
    const uid = "wfPc1lDadJcMcID4Nyyz";
    // const [courses, setCourses] = useState<DocumentData[]>([]);
    const courses = [];
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    const courseData = docSnap.data();
    if (!courseData) {
      console.log("No such document!");
    } else {
      console.log(courseData["course_list"]);
      const courseId = courseData["course_list"];
      for (const course of courseId) {
        const courseRef = doc(db, "courses", course);
        const courseSnap = await getDoc(courseRef);
        courses.push(courseSnap.data());
      }
    }
    console.log(courses);
    return courses;
  } catch (error) {
    console.error("Error fetching document:", error);
  }
};

export const fetchStudentquiz = async (
  courseID: string
): Promise<[Quiz[], Submitted_Quiz[]]> => {
  const quizzesRef = collection(db, "quiz");
  const q = query(quizzesRef, where("course_id", "==", courseID));
  const querySnapshot = await getDocs(q);
  const fetchedQuizzes: Quiz[] = [];
  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    const quizData = doc.data();
    fetchedQuizzes.push({ id: doc.id, ...quizData } as Quiz);
  });

  // Fetch the user document where the user_id matches the current user
const usersRef = collection(db, "users");
const uq = query(usersRef, where("user_id", "==", "wfPc1lDadJcMcID4Nyyz"));
const userQuerySnapshot = await getDocs(uq);
// console.log(doc.data().attempted_quizzes)

// Get the attempted_quizzes field of the user document
let attemptedQuizzes: string[] = [];
userQuerySnapshot.forEach((doc: QueryDocumentSnapshot) => {
  const userData = doc.data();
  attemptedQuizzes = userData.submitted_quizzes;
  console.log(userData)
});
console.log(attemptedQuizzes, "hi");

// Fetch the quizzes that have been attempted by the user
const submitsPromises = attemptedQuizzes.map(async (quizId) => {
  const submit_quizzesRef = collection(db, "submit_quiz");
  const sq = query(submit_quizzesRef, where("user_id", "==", quizId));
  const submitquerySnapshot = await getDocs(sq);
  const submitfetchedQuizzes: Submitted_Quiz[] = [];
  submitquerySnapshot.forEach((doc: QueryDocumentSnapshot) => {
    const quizData = doc.data();
    submitfetchedQuizzes.push({ id: doc.id, ...quizData } as Submitted_Quiz);
  });
  return submitfetchedQuizzes;
});

  // Wait for all submitted quizzes to be fetched
  const submittedQuizzesArray = await Promise.all(submitsPromises);
  // Flatten the array of arrays to a single array
  const submitfetchedQuizzes: Submitted_Quiz[] = submittedQuizzesArray.flat();

  return [fetchedQuizzes, submitfetchedQuizzes];
};

export const fetchquiz = async (quizID: string) => {
  const docRef = doc(db, "quiz", quizID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return [];
  }
};

export const fetchTimeline = async (courseID: string) =>{
  const uid = "wfPc1lDadJcMcID4Nyyz";
  axios.post(`http://192.168.47.237:8000/show_upcoming_quiz`,{
    student_id:uid
  }).then(response=>{
    console.log(response);
  })
}
