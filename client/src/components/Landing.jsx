import LandingGreetings from "./LandingGreetings";
import video from "/video.mp4";

export default function Landing() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      {/* background video */}
      <video className="videoTag" autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>

      {/* mask dance, text, and mega mendung batik */}
      <LandingGreetings />
    </main>
  );
}
