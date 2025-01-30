import { auth } from "../../../firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  User 
} from "firebase/auth";

// Define a custom type for the authentication response
interface AuthResponse {
  user: User;
}

// Sign Up User
export const signUp = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user,"data")
    return { user: userCredential.user };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// Sign In User
export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// Sign Out User
export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
