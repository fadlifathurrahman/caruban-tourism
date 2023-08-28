import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ImLocation } from "react-icons/im";
import { CircularProgress } from "@mui/material";
// import QRCode from "react-qr-code";

export default function Place() {
  const [place, setPlace] = useState();
  const [additionalImage, setAdditionalImage] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/places/${id}`)
      .then((response) => response.json())
      .then((place) => setPlace(place));
    clearTimeout();
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/places/additional-image/${id}`)
      .then((response) => response.json())
      .then((image) => setAdditionalImage(image));
    clearTimeout();
  }, [id]);

  return (
    <main className="pt-24 px-6 max-w-screen-2xl">
      {place ? (
        // main container
        <section
          className="flex flex-col 
        mt-12"
        >
          {/* place`s name */}
          <header
            className="text-white bg-zinc-800 font-bold
            px-5 py-3"
          >
            <h1 className="text-3xl">{place.name}</h1>
          </header>

          {/* place`s image and description */}
          <article
            className="flex w-full
          py-5"
          >
            <img src={place.image} alt={place.name} className="w-2/3 pr-2" />
            <p className="flex text-center items-center w-1/3">
              {place.description}
            </p>
          </article>

          <header
            className="text-white bg-zinc-800 font-bold my-5
            px-5 py-3"
          >
            <h1 className="text-3xl">Highlight</h1>
          </header>
          {additionalImage ? (
            <section className="flex flex-col flex-wrap justify-items-end gap-4">
              <article className="flex">
                <img
                  className="w-1/3 pr-2 hover:scale-150 hover:ml-24 hover:-mr-24"
                  src={additionalImage.image_1}
                />
                <img
                  className="w-1/3 px-2 hover:scale-150"
                  src={additionalImage.image_2}
                />
              </article>
              <article className="flex justify-end">
                <img
                  className="w-1/3 px-2 hover:scale-150"
                  src={additionalImage.image_3}
                />
                <img
                  className="w-1/3 pl-2 hover:scale-150 hover:mr-24 hover:-ml-24"
                  src={additionalImage.image_4}
                />
              </article>
            </section>
          ) : (
            ""
          )}

          <div className="">
            {/* header */}
            <header
              className="text-white bg-zinc-800 font-bold mt-10 mb-5
            px-5 py-3"
            >
              <h1 className="text-3xl">Address and Map</h1>
            </header>

            {/* address and map */}
            <div className="flex w-full items-start justify-between gap-5 ">
              <p className="flex gap-1 items-center text-lg w-1/3">
                <ImLocation /> {place.address}
              </p>
              <iframe
                src={place.maps}
                className="w-2/3"
                height="300px"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* <QRCode
            value="Bismillah"
            bgColor="#000000"
            fgColor="#FFFFFF"
            size="20%"
          /> */}
        </section>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </main>
  );
}
