const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const { isUser } = require("../middleware/role_check");
const userController = require("../controller/user");

router.get("/", isAuth, isUser, userController.getAncs);
router.get("/books", isAuth, isUser, userController.getBooks);
router.get("/my-basket", isAuth, isUser, userController.getBasket);
router.get("/anc/detail/:id", isAuth, isUser, userController.getAncDetail);
router.get("/book/detail/:id", isAuth, isUser, userController.getBookDetail);
router.get("/gallery", isAuth, isUser, userController.gallery);
module.exports = router;
