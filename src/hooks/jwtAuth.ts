"use client";

import { useState } from "react";
import api from "../utils/axios";
import { useRouter } from "next/navigation";

interface LoginData {
  email: string;
  password: string;
}

export const useAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Hit endpoint login di backend
      const response = await api.post("/auth/login", data);

      // Simpan token dari response backend
      const { token } = response.data;
      localStorage.setItem("token", token);

      // Redirect ke dashboard setelah login
      router.push("/");
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return { login, logout, isLoading, errorAuth: error };
};
