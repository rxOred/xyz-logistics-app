import React, { useState, FormEvent } from "react";
import { loginUser } from "../cognito";

type LoginPageProps = {
  onLoginSuccess: (idToken: string, userSub: string) => void;
  onSwitchToRegister: () => void;
};

export default function LoginPage({
  onLoginSuccess,
  onSwitchToRegister,
}: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { user, idToken } = await loginUser(email, password);
      onLoginSuccess(idToken, user.getUsername());
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-gray-900 flex items-center justify-center px-4 text-white font-sans">
      <div className="max-w-sm w-full bg-white bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-center text-indigo-300 mb-2">
          Welcome Back
        </h2>
        <p className="text-sm text-center text-indigo-100 mb-6">
          Log in to your dashboard
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm text-indigo-200 block mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm text-indigo-200 block mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md font-medium shadow"
          >
            Sign In
          </button>
        </form>

        <div className="text-sm text-center mt-6 text-indigo-200">
          Don’t have an account?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-indigo-400 hover:underline"
          >
            Register
          </button>
        </div>

        {error && (
          <p className="mt-4 text-red-400 text-sm text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
