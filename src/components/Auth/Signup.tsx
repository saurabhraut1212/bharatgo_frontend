import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast"; 
import { Link, useNavigate } from "react-router-dom";  
import { useAuth } from "../../context/AuthContext";


interface FormData {
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const navigate=useNavigate();
  const { signUp: handleSignUp } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const handleSignup = async (data: FormData) => {
    setError(null);
    try {
      const response=await handleSignUp(data.email, data.password);
     
if (response && response.user) { // This was failing because handleSignUp had no return
  toast.success("Signup Successful!"); 
  navigate("/"); 
}
      toast.success("Signup Successful!"); 
    } catch (error) {
      setError((error as Error).message);
      toast.error("Signup failed! Please try again."); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required", pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Invalid email" } })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
