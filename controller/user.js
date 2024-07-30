const session = require("express-session");
const Users = require("../models/users");
const Basket = require("../models/basket");
const BasketBooks = require("../models/basketBooks");
const Ancs = require("../models/anc");
const Books = require("../models/books");

exports.homepage = async (req, res, next) => {
  res.render("user/homepage");
};

exports.getBooks = async (req, res, next) => {
  try {
    const books = await Books.findAll();
    res.render("user/books", { data: books });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getAncs = async (req, res, next) => {
  try {
    const ancs = await Ancs.findAll();
    res.render("user/homepage", { data: ancs });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getBasket = async (req, res, next) => {
  try {
    // Assuming req.userId is available, representing the logged-in user
    const userId = req.body.userId;

    // Find the basket for the user
    const basket = await Basket.findOne({
      where: { userId: userId },
      include: [
        {
          model: Books,
          through: {
            attributes: ["quantity"],
          },
        },
      ],
    });

    if (!basket) {
      return res.status(404).send("Basket not found");
    }

    // Extract books and their quantities
    const booksInBasket = basket.Books.map((book) => {
      return {
        name: book.name,
        author: book.author,
        description: book.description,
        url: book.url,
        price: book.price,
        quantity: book.BasketBooks.quantity,
      };
    });

    // Render the view with basket contents
    res.render("admin/basket", { books: booksInBasket });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getAncDetail = async (req, res, next) => {
  try {
    const anc = await Ancs.findByPk(req.params.id);
    console.log("LOGGGGG: ", req.body);
    res.render("user/ancDetail", { data: anc });
  } catch (err) {
    return next(err);
  }
};

exports.getBookDetail = async (req, res, next) => {
  try {
    const book = await Books.findByPk(req.params.id);
    res.render("user/bookDetail", { data: book });
  } catch (err) {
    return next(err);
  }
};

exports.gallery = (req, res, next) => {
  res.render("user/gallery");
};
