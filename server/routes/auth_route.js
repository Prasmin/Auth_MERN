import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("Singup router");
});
router.get("/login", (req, res) => {
  res.send("loging router");
});
router.get("/logout", (req, res) => {
  res.send("logout router");
});

export default router;
