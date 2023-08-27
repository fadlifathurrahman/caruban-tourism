import video from "/video.mp4";
import dance from "/mask-dance.png";
import batik from "/batik-above.png";

export default function Landing() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <video className="videoTag" autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
      <div className="absolute flex items-center ">
        <img src={dance} className="h-80 -mr-36 -mb-40 z-10" />
        <div className="absolute bg-red-800/80 w-1/2 h-16 -mt-72"></div>
        <div className="absolute bg-red-800/80 w-1/2 h-16 -mb-72 right-0"></div>
        <div
          className=" text-white bg-slate-800/60 
          flex flex-col justify-center
          text-3xl 
          w-max h-1/2 px-20 py-16
          text-center "
        >
          <p>Explore heritage places &</p>
          <p className="mt-5">enjoy delightful dishes</p>
          <p className="mt-5">
            in{" "}
            <span className="italic font-bold font-serif text-4xl">
              Cirebon!
            </span>
          </p>
        </div>
        <img src={batik} className="h-60 -mt-80 -ml-52 z-10" />
      </div>
    </main>
  );
}
