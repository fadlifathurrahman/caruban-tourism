import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./App";
import batik from "/batik-under.png";
import shrimp from "/shrimp.png";
import DropdownMenu from "./components/DropdownMenu";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <div
      className="sticky top-0 z-20 px-9 -mb-20
      max-w-screen h-20
      bg-slate-900/90 text-white
     flex justify-between items-center"
    >
      <div className="flex justify-center items-center">
        <img src={shrimp} className="h-32 -mr-10" />
        <div className="flex justify-center items-center">
          <Link to="/">
            <p className="text-3xl font-semibold font-serif">aruban Tourism</p>
          </Link>
          <img src={batik} className="-rotate-12 h-36 mt-20 -ml-24" />
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Link to="/about">
          <div>About</div>
        </Link>
        {user ? (
          <DropdownMenu />
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
      </div>
    </div>
  );
}
