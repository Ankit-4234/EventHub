import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const Navigate = useNavigate();
  return (
    <nav className="navbar">
      <link to="/" className="brand">
        EVENT<span>HUB</span>
      </link>
      <div className="nav-links">
        {user ? (
          <>
            <link to="/create">Host an event </link>
            <Link to="/dashboard">Dashboard</Link>
            <span className="nav-user">Hi, {user.name.split(" ")[0]}</span>
            <button
              className="btn-ghost"
              onclick={() => {
                logout();
                navigate("");
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
