import React, { useState, FormEvent } from "react";
import { userPool } from "../cognito";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

type RegisterPageProps = {
  onSwitchToLogin: () => void;
};

export default function RegisterPage({ onSwitchToLogin }: RegisterPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const attributeList = [
      new CognitoUserAttribute({ Name: "email", Value: email }),
    ];

    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        setError(err.message || JSON.stringify(err));
        return;
      }
      setSuccess(true);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-gray-900 flex items-center justify-center px-4 text-white font-sans">
      <div className="max-w-sm w-full bg-white bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-center text-indigo-300 mb-2">
          Create Account
        </h2>
        <p className="text-sm text-center text-indigo-100 mb-6">
          Sign up to access your dashboard
        </p>

        {success ? (
          <>
            <p className="text-green-400 text-sm text-center">
              ✅ Registered! Check your email to confirm.
            </p>
            <button
              onClick={onSwitchToLogin}
              className="mt-6 w-full py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md font-medium shadow"
            >
              Back to Login
            </button>
          </>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-sm text-indigo-200 block mb-1">
                Email
              </label>
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
              Register
            </button>

            <div className="text-sm text-center mt-6 text-indigo-200">
              Already have an account?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-indigo-400 hover:underline"
              >
                Log In
              </button>
            </div>
            {error && (
              <p className="mt-4 text-red-400 text-sm text-center">{error}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
