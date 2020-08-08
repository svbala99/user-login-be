const express = require("express");
const router = express.Router();
const userController = require("../../controllers").user;

router.get("/:id", userController.fetchOne);

router.post("/", userController.create);

router.put("/:id", userController.update);

router.delete("/:id", userController.destroy);

module.exports = router;
