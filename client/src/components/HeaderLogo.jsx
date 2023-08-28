import { Link } from "react-router-dom";
import batik from "/batik-under.png";
import shrimp from "/shrimp.png";

export default function HeaderLogo() {
  return (
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
  );
}
