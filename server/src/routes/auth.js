import express from "express";
import conn from "../db.js";
import bcrypt from "bcrypt";
import authMiddleware from "../middlewares/auth.js";

// membuat route (dengan objek Router)
const router = express.Router();

router.use(authMiddleware);

// router akses akun
router.get("/me", (req, res) => {
  res.json(req.user);
});

// edit data account
router.put("/edit/:id", async (req, res) => {
  // check duplicate email
  const prepare = await conn.prepare("SELECT * FROM users WHERE email = ?");
  const email = (await prepare.execute([req.body.email]))[0];
  if (email) {
    // if email was using
    res.status(401).send("Email was using");
  } else {
    // if email available for use
    // check duplicate username
    const prepare = await conn.prepare(
      "SELECT * FROM users WHERE username = ?"
    );
    const username = (await prepare.execute([req.body.username]))[0];
    if (username) {
      // if username was using
      res.status(401).send("Username was using");
    } else {
      // if username and email available for use
      try {
        // hashing password before insert to database
        const hash = await bcrypt.hash(req.body.password, 10);
        const prepare = await conn.prepare(
          "UPDATE users SET email = ? WHERE id = ?"
        );
        // execute user`s data to database
        await prepare.execute([req.body.email, req.params.id]);
        res.status(200).send("Your data has been successfully edited");
      } catch (error) {
        res.status(500).send(error);
      }
    }
  }
});

export default router;
