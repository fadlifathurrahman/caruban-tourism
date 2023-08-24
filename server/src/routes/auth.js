import express from "express";
import conn from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import authMiddleware from "../middlewares/auth.js";

// membuat route (dengan objek Router)
const router = express.Router();

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
      // .send("Login success.");
    } else {
      res.status(401).send("Invalid email or password.");
    }
  } else {
    res.status(401).send("Invalid email or password.");
  }
});

router.use(authMiddleware);

// router akses akun
router.get("/me", (req, res) => {
  res.json(req.user);
});

export default router;
