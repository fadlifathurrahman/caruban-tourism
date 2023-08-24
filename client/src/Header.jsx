import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./App";
import batik from "/batik-under.png";
import shrimp from "/shrimp.png";

export default function Header() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div
      className="sticky top-0 z-20 px-9 -mb-20
      max-w-screen h-20
      bg-slate-900/90 text-white
     flex justify-between items-center"
    >
      <Link to="/">
        <div className="flex justify-center items-center">
          <img src={shrimp} className="h-32 -mr-10" />
          <div className="flex justify-center items-center">
            <p className="text-3xl font-semibold font-serif">aruban Tourism</p>
            <img src={batik} className="-rotate-12 h-36 mt-20 -ml-24" />
          </div>
        </div>
      </Link>
      {user ? (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            setUser(null);
          }}
        >
          Logout
        </button>
      ) : (
        <div>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Sign Up</button>
          </Link>
        </div>
      )}
      <Link to="/about">
        <div>About</div>
      </Link>
    </div>
  );
}
