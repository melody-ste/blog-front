import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Signup() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: { email, password, password_confirmation: passwordConfirmation }
      }),
    });

    if (!res.ok) {
      console.error("Signup failed");
      return;
    }

    const data = await res.json();
    const token = res.headers.get("Authorization")?.split(" ")[1];

    login(data.user, token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email :</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <label htmlFor="password">Mot de passe :</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Mot de passe"
      />
      <label htmlFor="confirmation">Confirmation :</label>
      <input
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        type="password"
        placeholder="Confirmation"
      />
      <div>
        <button type="submit">S'inscrire</button>
      </div>
      
    </form>
  );
}

export default Signup;
