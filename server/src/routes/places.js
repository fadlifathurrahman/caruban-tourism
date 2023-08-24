import express from "express";
import conn from "../db.js";

const places = [
  {
    id: 1,
    name: "Kasepuhan Royal Palace",
    address: "Kasepuhan Street 1st, Lemahwungkuk, Cirebon, West Java",
    description:
      "The largest and oldest surviving sultanate palace in Cirebon. Serves as the official residence of the Kasepuhan Sultanate which is one of the three sultanates in Cirebon",
    image:
      "https://disparbud.jabarprov.go.id/wp-content/uploads/2022/01/MUS9249-scaled.jpg",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.3561308559433!2d108.56843117366698!3d-6.726328465763555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ee263eaaaaaab%3A0x20ea18cbfb1df195!2sKeraton%20Kasepuhan%20Cirebon!5e0!3m2!1sid!2sid!4v1691765249118!5m2!1sid!2sid",
  },
  {
    id: 2,
    name: "Kanoman Royal Palace",
    address: "Kanoman Street 1st, Lemahwungkuk, Cirebon, West Java",
    description:
      "The second surviving sultanate palace in Cirebon. Serves as the official residence of the Kanoman Sultanate which expansion of Kasepuhan Sultanate",
    image: "https://sikidang.com/wp-content/uploads/Keraton-Kanoman.jpg",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.3882626239606!2d108.56524907366688!3d-6.722387765724239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ee25deaaaaaab%3A0xb5cb14c3d5f80987!2sKeraton%20Kanoman!5e0!3m2!1sid!2sid!4v1691765387972!5m2!1sid!2sid",
  },
  {
    id: 3,
    name: "Kacirebonan Royal Palace",
    address: "Ariodinoto Street 1st, Lemahwungkuk, Cirebon, West Java",
    description:
      "The youngest surviving sultanate palace in Cirebon. Serves as the official residence of the Kacirebonan Sultanate which expansion of Kanoman Sultanate",
    image:
      "https://disbudpar.cirebonkota.go.id/wp-content/uploads/2021/09/b2ap3_large_kraton2.jpg",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.3653963365437!2d108.56280247366693!3d-6.725192365752208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ee26f6aaaaaab%3A0xddcdf1633236d15a!2sKeraton%20Kacirebonan!5e0!3m2!1sid!2sid!4v1691765435917!5m2!1sid!2sid",
  },
  {
    id: 4,
    name: "Sunyaragi Royal Garden",
    address: "Brigjen Dharsono Street, Kesambi, Cirebon, West Java",
    description:
      "The royal garden of all Cirebonese Sultanate. serves as a place of recreation, bathing, and rest for members of the Cirebon Sultanate royal family",
    image:
      "https://travelspromo.com/wp-content/uploads/2019/05/Kawasan-Gua-Sunyaragi-Ahmad-Rasyid.jpg",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31698.47089528159!2d108.5025033041815!3d-6.732121444098538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f1df257d4d4fb%3A0x8d4ea2ef1ff1103d!2sTaman%20Wisata%20Goa%20Sunyaragi%20Cirebon!5e0!3m2!1sid!2sid!4v1691765033406!5m2!1sid!2sid",
  },
  {
    id: 5,
    name: "Tomb of Sunan Gunung Jati",
    address: "Gunung Jati Street, Astana, Cirebon, West Java",
    description:
      "The burial complex of Sunan Gunung Jati, sultans, and members of the royal family of the Cirebon sultanate",
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjz1MD8xUM8No2o0SVSmsOAgFtpIoWhmzADz1J95Jv2vKYSVMyrlZsAVJQhOYKT0Dtp7PfGPDHiufME_jyxA05NxNHJEfgV9Y4ccOvUfGMS7NHdFqCgKsBsUjJ6fA-qAUZ3-D_Js-RZr1Wn6ZhgBPvanpY4Of9Xsc3NlxrJGsCBQGiYXMOvTncmHkq6pA/s1600/gerbang%20makam%20gn%20jati.jpg",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.804079530228!2d108.53757607499419!3d-6.671182193323875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f1df535197233%3A0x44c868e9be858a42!2sMakam%20Sunan%20Gunung%20Jati!5e0!3m2!1sid!2sid!4v1691767342655!5m2!1sid!2sid",
  },
  {
    id: 6,
    name: "Trusmi Batik area",
    address: "Syekh Datul Kahfi Street, Plered, Cirebon, West Java",
    description:
      "The central area for the sale and production of typical Cirebonese batik, which is produced in both traditional and modern ways",
    image:
      "https://www.indonesia.travel/content/dam/indtravelrevamp/id-id/ide-liburan/ayo-ke-batik-trusmi-cirebon-dan-lakukan-4-aktivitas-seru-ini/kawasan-batik-trusmi.jpg",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1014203.6827406192!2d107.44808671318665!3d-6.802284608047452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ee193b48be581%3A0xdaa49b48b19ca154!2sKawasan%20Wisata%20Batik%20Trusmi!5e0!3m2!1sid!2sid!4v1691767964050!5m2!1sid!2sid",
  },
];

const router = express.Router();

// get all places data
router.get("/", async (_req, res) => {
  const planets = await conn.query("SELECT * FROM places");
  res.json(planets);
});

// get by id
router.get("/:id", async (req, res) => {
  const prepare = await conn.prepare("SELECT * FROM places WHERE id = ?");
  const place = (await prepare.execute([req.params.id]))[0];
  if (place) {
    res.json(place);
  } else {
    res.status(404);
    res.send("Places not found.");
  }
});

export default router;
