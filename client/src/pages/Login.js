import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const navigate = useNavigate();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://auth-app-21ub.onrender.com/auth/login",
        { email, password }
      );

      console.log(res.data);

      // 🔥 token save
      localStorage.setItem("token", res.data.accessToken);

      alert("Login success");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;