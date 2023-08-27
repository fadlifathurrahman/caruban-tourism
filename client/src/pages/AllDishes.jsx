import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Skeleton } from "@mui/material";
import batik from "/batik.png";

export default function AllDishes() {
  const [keyword, setKeyword] = useState("");

  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/dishes")
      .then((response) => response.json())
      .then((dishes) => setDishes(dishes));
  }, []);

  return (
    <main>
      <header>
        <label>
          Seacrh dishes:
          <Input type="text" onChange={(e) => setKeyword(e.target.value)} />
        </label>
      </header>

      {dishes ? (
        <div
          className="max-w-screen-xl py-4 gap-y-6
          flex flex-wrap justify-evenly items-center"
        >
          {/* iteration and filter for dishes */}
          {dishes
            .filter((dish) => dish.name.toLowerCase().includes(keyword))
            .map((dish) => (
              // dish`s container
              <div key={dish.id}>
                {/* dish card header */}
                <div className="flex items-center">
                  {/* dish`s name */}
                  <div
                    className="bg-slate-800 text-white text-xl p-4 z-10 relative
                    h-fit w-64 flex text-center justify-center rounded-bl-2xl rounded-tr-2xl"
                  >
                    &quot;{dish.name}&quot;
                  </div>
                  {/* batik */}
                  <img src={batik} className="h-36 w-52 -ml-20 relative" />
                </div>
                {/* dish card body */}
                <div
                  className="bg-slate-700 p-6 -mt-14 ml-6 w-80
                gap-4 flex flex-col items-center rounded-bl-2xl rounded-tr-2xl"
                >
                  {/* dish`s image */}
                  <img src={dish.image} className="h-48" />
                  {/* dish`s detail and price */}
                  <div className="flex justify-between items-center w-full">
                    <Link to={`/dishes/${dish.id}`}>
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
