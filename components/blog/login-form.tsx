import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/lib/firebase";
import { toast } from "sonner";

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoggingIn(true);
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess();
    } catch (error: any) {
      setAuthError(error.message);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className='max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg'>
      <h2 className='text-2xl text-center font-bold mb-6 text-gray-900 dark:text-gray-100 font-cinzel'>
        Hello Zakarie
      </h2>
      <div className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
            Email
          </label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#4341a5] focus:border-transparent dark:bg-gray-700 dark:text-gray-100'
            required
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
            Password
          </label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#4341a5] focus:border-transparent dark:bg-gray-700 dark:text-gray-100'
            required
          />
        </div>
        {authError && <p className='text-red-500 text-sm'>{authError}</p>}
        <button
          type='submit'
          disabled={isLoggingIn}
          className='w-full bg-[#4341a5] text-white p-3 rounded-xl hover:bg-[#332f8a] transition duration-200 disabled:opacity-50'>
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
}
