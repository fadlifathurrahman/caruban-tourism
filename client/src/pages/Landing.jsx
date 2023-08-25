import video from "/video.mp4";

export default function Landing() {
  return (
    <main className=" min-h-screen flex justify-center items-center">
      <video className="videoTag" autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
      {/* <div
        className="backdrop-blur-sm bg-white/30 text-slate-800
        w-1/2 h-36
      flex flex-col justify-center items-center
      text-4xl font-bold"
      >
        <p>Explore Magical Land</p>
        <p>of Cirebon</p>
      </div> */}
    </main>
  );
}
