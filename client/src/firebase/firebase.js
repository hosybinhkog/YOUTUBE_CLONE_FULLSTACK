import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbcx0ayk1-SxwoUNW3bz09VrJi9umR-Ow",
  authDomain: "clone-7e868.firebaseapp.com",
  projectId: "clone-7e868",
  storageBucket: "clone-7e868.appspot.com",
  messagingSenderId: "870470063232",
  appId: "1:870470063232:web:2d0a099c7d2f68759a0265",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
