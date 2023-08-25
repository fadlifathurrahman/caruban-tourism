import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Landing from "./Landing";
import { Skeleton } from "@mui/material";
import { BsTicketPerforated } from "react-icons/bs";
import batik from "/batik.png";

export default function Home() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/places")
      .then((response) => response.json())
      .then((places) => setPlaces(places));
  }, []);

  return (
    <main>
      <Landing />
      {places ? (
        <div
          className="max-w-screen-xl py-4 gap-y-6
        flex flex-wrap justify-evenly items-center"
        >
          {/* iteration for places */}
          {places.map((place) => (
            // place`s container
            <div key={place.id}>
              {/* place card header */}
              <div className="flex items-center">
                {/* place`s name */}
                <div
                  className="bg-slate-800 text-white text-xl p-4 z-10 relative
                  h-fit w-64 flex text-center justify-center rounded-bl-2xl rounded-tr-2xl"
                >
                  {place.name}
                </div>
                {/* batik */}
                <img src={batik} className="h-36 w-52 -ml-20 relative" />
              </div>

              {/* place card body */}
              <div
                className="bg-slate-700 p-6 -mt-16 ml-6 w-80
              gap-4 flex flex-col items-center rounded-bl-2xl rounded-tr-2xl"
              >
                {/* place`s image */}
                <img src={place.image} className="h-48" />

                {/* place`s detail and price */}
                <div className="flex justify-between items-center w-full">
                  <p className="text-white text-sm font-bold flex gap-2 items-center ">
                    <BsTicketPerforated size={24} />
                    {place.ticket_price === 0
                      ? "Free"
                      : place.ticket_price.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                  </p>
                  <Link to={`/places/${place.id}`}>
                    <button className="bg-red-700 text-white text-sm w-32 py-1">
                      Detail
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={210}
          height={118}
        />
      )}
    </main>
  );
}
