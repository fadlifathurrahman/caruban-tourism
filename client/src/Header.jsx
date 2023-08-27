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
      className="sticky top-0 z-20 px-9 -mb-24
      max-w-screen h-24
      bg-slate-900/90 text-white
     flex justify-between items-center"
    >
      <div className="flex ">
        <div className="flex flex-col justify-center items-center pt-3">
          <div className="flex flex-row items-center -mt-8">
            <img src={shrimp} className="-rotate-12 h-24 -mr-8" />
            <p className="text-xl font-serif">
              <Link to="/">aruban</Link>
            </p>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-xl font-serif -mt-12 ml-32">
              <Link to="/">Tourism</Link>
            </p>
          </div>
        </div>
        <img src={batik} className="-rotate-12 h-24 w-40 mt-24 -ml-14" />
      </div>
      <div className="flex gap-4 items-center">
        <Link to="/about">
          <button>About</button>
        </Link>
        {user ? (
          <DropdownMenu />
        ) : (
          <div className="flex gap-4">
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
