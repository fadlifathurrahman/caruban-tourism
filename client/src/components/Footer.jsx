import lamp from "/lamp.png";

export default function Footer() {
  return (
    <footer
      className="bg-slate-800 text-white mt-40
    "
    >
      <section className="flex justify-center items-end h-12 max-w-screen-2xl mt-10">
        <div className="flex">
          <img src={lamp} className="h-56 bottom-0" />
          <img src={lamp} className="h-56 bottom-0" />
        </div>
        <p className="flex h-full items-center">
          &copy; 2023 By Fathur Arrahman
        </p>
        <div className="flex">
          <img src={lamp} className="h-56 bottom-0" />
          <img src={lamp} className="h-56 bottom-0" />
        </div>
      </section>
    </footer>
  );
}
