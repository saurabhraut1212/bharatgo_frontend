
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDEYLDF9gfzjLWYyibHmrhayQQUF9b6r0",
  authDomain: "bharatgo-5538f.firebaseapp.com",
  projectId: "bharatgo-5538f",
  storageBucket: "bharatgo-5538f.firebasestorage.app",
  messagingSenderId: "166919922062",
  appId: "1:166919922062:web:dfc402eac391a3c047c4df",
  measurementId: "G-YNBLR1DPMW"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;