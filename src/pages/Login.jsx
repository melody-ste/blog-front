import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/users/sign_in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { email, password } })
    });

    if (!res.ok) {
      console.error("Login failed");
      return;
    }

    const data = await res.json();
    const token = res.headers.get("Authorization")?.split(" ")[1];
    login(data.user, token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
      <button>Login</button>
    </form>
  );
}

export default Login;