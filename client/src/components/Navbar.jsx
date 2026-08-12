import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const Navigate = useNavigate();
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        EVENT<span>HUB</span>
      </Link>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/create">Host an event </Link>
            <Link to="/dashboard">Dashboard</Link>
            <span className="nav-user">Hi, {user.name.split(" ")[0]}</span>
            <button
              className="btn-ghost"
              onclick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Log in </Link>
            <Link to="/register" className="btn-accent">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
