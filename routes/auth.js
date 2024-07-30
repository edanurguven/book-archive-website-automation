const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const csrfToken = require("../middleware/csrf");

router.get("/login", csrfToken, authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/signout", authController.signout);

module.exports = router;
