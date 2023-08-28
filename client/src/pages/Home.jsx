import { Link } from "react-router-dom";
import Landing from "../components/Landing";
import batikDown from "/batik-under.png";
import batikUp from "/batik-above.png";
import gate from "/gate.png";
import dish from "/dish.png";

export default function Home() {
  return (
    <main className="max-w-screen-2xl">
      <Landing />
      <div className="flex absolute w-full -mt-32 items-center">
        <img src={batikDown} className="w-1/3 " />
        <img src={batikUp} className="w-1/3 " />
        <img src={batikDown} className="w-1/3 " />
      </div>
      <div className="min-h-screen flex flex-wrap items-center">
        <article
          className="w-1/2 flex flex-col items-center
            text-2xl "
        >
          <p className="text-lg text-center italic">
            Get wonderful experience by explores <br /> historical destination
            in Cirebon!
          </p>

          <img src={gate} className="h-48" />

          <Link
            to={`/places/all`}
            className="bg-red-700 text-white text-sm text-center py-2 w-1/2"
          >
            <button>show more...</button>
          </Link>
        </article>

        {/* dishes */}
        <article
          className="w-1/2 flex flex-col items-center 
            text-2xl "
        >
          <p className="text-lg text-center italic">
            Taste the originally and speciality <br />
            various cuisine in Cirebon!
          </p>

          <img src={dish} className="h-48" />

          <Link
            to={`/dishes/all`}
            className="bg-red-700 text-white text-sm text-center py-2 w-1/2"
          >
            <button>show more...</button>
          </Link>
        </article>
      </div>
    </main>
  );
}
