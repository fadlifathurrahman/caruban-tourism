// import express dan cors
import express from "express";
import cors from "cors";
// import jsonwebtoken and dotenv/config
import jwt from "jsonwebtoken";
import "dotenv/config";
// import bycrypt for hasing password
import bcrypt from "bcrypt";

// import components
import placesRouter from "./routes/places.js";
import conn from "./db.js";
// mengexport function express
export const app = express();

// middlewares
app.use(cors({ origin: "http://localhost:5173" })); // menggunakan cors
app.use(express.json()); // membaca body

// membuat route (dengan objek Router)
const router = express.Router();

// router akses places
router.use("/places", placesRouter);

// login comparing
router.post("/login", async (req, res) => {
  const prepare = await conn.prepare("SELECT * FROM users WHERE email = ?");
  const user = (await prepare.execute([req.body.email]))[0];
  if (user) {
    const result = await bcrypt.compare(req.body.password, user.password);
    if (result === true) {
      res.json({
        token: jwt.sign(user, process.env.SECRET_KEY),
        user,
      });
    } else {
      res.status(401);
      res.send("Invalid email or password.");
    }
  } else {
    res.status(401);
    res.send("Invalid email or password.");
  }
});

// register
router.post("/register", async (req, res) => {
  const prepare = await conn.prepare("SELECT * FROM users WHERE email = ?");
  const email = (await prepare.execute([req.body.email]))[0];
  if (email) {
    res.status(401);
    res.send("Email was using");
  } else {
    try {
      const hash = await bcrypt.hash(req.body.password, 10);
      const prepare = await conn.prepare(
        "INSERT INTO users (email, password, name, username, phone) VALUES (?, ?, ?, ?, ?)"
      );
      await prepare.execute([
        req.body.email,
        hash,
        req.body.name,
        req.body.username,
        req.body.phone,
      ]);
      res.send("Your account is successfully created.");
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  }
});

// middleware otentikasi
router.use((req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const user = jwt.verify(token, process.env.SECRET_KEY);
      req.user = user;
      next();
    } catch {
      res.status(401);
      res.send("Token salah.");
    }
  } else {
    res.status(401);
    res.send("Token belum diisi.");
  }
});

// router akses akun
router.get("/me", (req, res) => {
  res.json(req.user);
});

app.use("/api", router);

const port = 3000;
app.listen(port, () => console.log(`Running in http://localhost:${port}`));
