const express = require("express");
const router = express.Router();
const userRouter = require("./user");

router.use("/user", userRouter);

// simple route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to Rajkamal Backend application." });
});

module.exports = router;
