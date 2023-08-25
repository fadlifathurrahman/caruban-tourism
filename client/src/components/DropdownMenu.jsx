import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuSettings, LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

export default function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="flex justify-center text-black">
      <div onMouseLeave={() => setOpen(false)} className="relative">
        <button
          onMouseOver={() => setOpen(true)}
          className="flex items-center gap-2 p-2 bg-white border rounded-md"
        >
          <span>Account</span> <IoIosArrowDown />
        </button>
        <ul
          className={`absolute right-0 bg-white w-max py-2 rounded-lg shadow-xl z-20 ${
            open ? "block" : "hidden"
          }`}
        >
          <Link to={`/auth/edit/${user.id}`}>
            <button className="flex w-full items-center gap-2 py-2 px-3 text-sm hover:bg-gray-100">
              <LuSettings /> <span>Setting</span>
            </button>
          </Link>
          <button
            onClick={() => {
              confirm("Are you sure for logout?");
              localStorage.removeItem("token");
              setUser(null);
            }}
            className="flex w-full items-center gap-2 py-2 px-3 text-sm hover:bg-gray-100"
          >
            <LuLogOut /> <span>Logout</span>
          </button>
        </ul>
      </div>
    </div>
  );
}
