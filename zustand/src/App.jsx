import React, { useState } from "react";
import "./App.css";
import useAuthStore from "./zustand/useAuthStore";

const App = () => {
  const { userEmail, isLogin, login, logout } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email: email.trim(), password });
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(`[로그인 실패] ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(`[로그아웃 실패] ${error.message}`);
    }
  };

  if (!isLogin) {
    return (
      <div>
        <h2 className="header">Supabase Auth + Zustand 로그인</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">로그인</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2 className="header">{userEmail} 님, 환영합니다.</h2>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default App;
