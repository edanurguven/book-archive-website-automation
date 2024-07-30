const express = require("express");
const multer = require("multer");
const path = require("path");
const Book = require("../models/books");
const isAuth = require("../middleware/isAuth");
const { isUser } = require("../middleware/role_check");

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "img/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Route to create a new book
router.post(
  "/add",
  isAuth,
  isUser,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const imageUrl = `/img/${req.file.filename}`;

      const book = await Book.create({ title, description, imageUrl });

      res.status(201).json(book);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while adding the book" });
    }
  }
);

module.exports = router;
