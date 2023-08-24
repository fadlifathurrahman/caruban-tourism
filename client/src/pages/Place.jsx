import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ImLocation } from "react-icons/im";
import { CircularProgress } from "@mui/material";

export default function Place() {
  const [place, setPlace] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/places/${id}`)
      .then((response) => response.json())
      .then((place) => setPlace(place));
    clearTimeout();
  }, [id]);

  return (
    <main className="pt-24 px-6">
      {place ? (
        <div className="flex flex-col max-w-screen-xl justify-center items-center">
          <div className="flex gap-6">
            <div
              className="flex flex-col gap-6
              w-1/2"
            >
              <img src={place.image} alt={place.name} className="h-80" />
              <p className="flex gap-1 items-center text-lg">
                <ImLocation /> {place.address}
              </p>
            </div>
            <div
              className="w-1/3 gap-4
              flex flex-col"
            >
              <p className="text-3xl">{place.name}</p>
              <p>{place.description}</p>
            </div>
          </div>
          <iframe
            src={place.maps}
            className="w-4/5 py-6"
            height="300px"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          >
            <CircularProgress />
          </iframe>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </main>
  );
}
