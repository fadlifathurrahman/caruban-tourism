import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";
import DropdownAccount from "./DropdownAccount";
import HeaderLogo from "./HeaderLogo";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <div
      className="sticky top-0 z-20 px-9 -mb-24
      max-w-screen h-24
      bg-slate-900/90 text-white
     flex justify-between items-center"
    >
      <HeaderLogo />
      <div className="flex gap-4 items-center">
        <Link to="/about">
          <button>About</button>
        </Link>
        {user ? (
          <DropdownAccount />
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
