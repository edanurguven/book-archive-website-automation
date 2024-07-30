const adminController = require("../controller/admin");
const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const csrfToken = require("../middleware/csrf");
const { isAdmin } = require("../middleware/role_check");

router.get("/", isAuth, isAdmin, adminController.homepage);

router.get("/books", isAuth, isAdmin, adminController.getBooks);
router.get("/ancs", isAuth, isAdmin, adminController.getAncs);

router.get(
  "/book/edit/:id",
  isAuth,
  isAdmin,
  csrfToken,
  adminController.getEditABook
);
router.post("/book/edit/:id", isAuth, isAdmin, adminController.postEditABook);

router.get(
  "/anc/edit/:id",
  isAuth,
  isAdmin,
  csrfToken,
  adminController.getEditAnc
);
router.post("/anc/edit/:id", isAuth, isAdmin, adminController.postEditAnc);

router.get("/book/add", isAuth, isAdmin, csrfToken, adminController.getAddBook);
router.post("/book/add", isAuth, isAdmin, adminController.postAddBook);

router.get("/anc/add", isAuth, isAdmin, csrfToken, adminController.getAddAnc);
router.post("/anc/add", isAuth, isAdmin, adminController.postAddAnc);

router.get("/book/delete/:id", isAuth, isAdmin, adminController.getDeleteABook);
router.post("/book/delete", isAuth, isAdmin, adminController.postDeleteABook);
router.get("/anc/delete/:id", isAuth, isAdmin, adminController.getDeleteAnc);

module.exports = router;
