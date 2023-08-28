import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";

export default function Dish() {
  const [dish, setDish] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/dishes/${id}`)
      .then((response) => response.json())
      .then((dish) => setDish(dish));
    clearTimeout();
  }, [id]);

  return (
    <main className="px-6 max-w-screen-2xl">
      {dish ? (
        <div className="flex w-full min-h-screen justify-center items-center gap-6">
          <div className="flex gap-6 w-full">
            {/* image */}
            <div
              className="flex flex-col gap-6
              w-1/2"
            >
              <img src={dish.image} alt={dish.name} className="h-80" />
            </div>

            {/* description and button container */}
            <div className="w-1/2 flex flex-col justify-between">
              {/* description */}
              <div
                className="gap-4
              flex flex-col"
              >
                <p className="text-3xl">&quot;{dish.name}&quot;</p>
                <p className="text-justify">{dish.description}</p>
              </div>

              {/* button */}
              <div className="w-full">
                <Button
                  className="w-full"
                  variant="contained"
                  color="info"
                  onClick={() =>
                    window.open(`http://www.google.com/search?q=${dish.maps}`)
                  }
                >
                  Browse
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </main>
  );
}
