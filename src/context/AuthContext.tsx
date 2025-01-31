import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../../firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth"; // Firebase authentication method
import { signUp, signIn, logOut } from "../services/auth/auth.service"; // Importing the functions you provided for auth actions

interface AuthResponse {
  user: User;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Set up an observer to track user authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignUp = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await signUp(email, password); // Get the user from signUp
      setUser(response.user); // Set the user in state
      setIsAuthenticated(true);
      return response; // Return AuthResponse
    } catch (error) {
      console.error("Error during sign-up:", error);
      throw new Error("Sign-up failed. Please try again."); // Ensure error is thrown
    }
  };

  const handleSignIn = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await signIn(email, password); // Get the user from signIn
      setUser(response.user); // Set the user in state
      setIsAuthenticated(true);
      return response; // Return AuthResponse
    } catch (error) {
      console.error("Error during sign-in:", error);
      throw new Error("Sign-in failed. Please try again."); // Ensure error is thrown
    }
  };

  const handleLogOut = async (): Promise<void> => {
    try {
      await logOut();
      setUser(null); // Clear user on logout
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during sign-out:", error);
      throw new Error("Sign-out failed. Please try again."); // Ensure error is thrown
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signUp: handleSignUp, signIn: handleSignIn, logOut: handleLogOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
