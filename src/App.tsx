// src/App.tsx
import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import UploadPage from "./components/UploadPage";
import RegisterPage from "./components/RegisterPage";

function App() {
  const [idToken, setIdToken] = useState<string | null>(null);
  const [userSub, setUserSub] = useState<string | null>(null);
  const [view, setView] = useState<"login" | "register" | "upload">("login");

  if (idToken && userSub)
    return <UploadPage idToken={idToken} userSub={userSub} />;

  return view === "register" ? (
    <RegisterPage onSwitchToLogin={() => setView("login")} />
  ) : (
    <LoginPage
      onLoginSuccess={(token, sub) => {
        setIdToken(token);
        setUserSub(sub);
        setView("upload");
      }}
      onSwitchToRegister={() => setView("register")}
    />
  );
}

export default App;
