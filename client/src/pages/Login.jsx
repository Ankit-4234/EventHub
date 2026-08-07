import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const submit = async (e) => {
    e.PreventDefault();
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "login failed");
    }
  };
  retrun(
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h2>welcome back</h2>
        {error && <p className="error-text">{error}</p>}
        <input
          type="email"
          placeholder="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="btn-accent" type="submit">
          Login
        </button>
        <p className="muted">
          New here?<Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>,
  );
};
export default Login;
