const bcrypt = require("bcrypt");
const Books = require("../models/books");
const Ancs = require("../models/anc");
const Users = require("../models/users");
const slugField = require("../helpers/slugfield");
const db = require("../data/db");
const Anc = require("../models/anc");

exports.homepage = async (req, res, next) => {
  res.render("admin/homepage");
};

exports.getBooks = async (req, res, next) => {
  try {
    const books = await Books.findAll();
    res.render("admin/books", { books });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getAncs = async (req, res, next) => {
  try {
    const ancs = await Ancs.findAll();
    res.render("admin/ancs", { data: ancs });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getAddBook = async (req, res, next) => {
  res.render("admin/bookAdd", { csrfToken: req.csrfToken() });
};

exports.getAddAnc = async (req, res, next) => {
  res.render("admin/ancAdd", { csrfToken: req.csrfToken() });
};
exports.postAddBook = async (req, res, next) => {
  const body = req.body;
  //const userid = req.session.userid;
  try {
    await Books.create({
      name: body.name,
      author: body.author,
      description: body.description,
      url: body.url,
      price: body.price,
    });
    res.redirect("/admin/books");
  } catch (error) {
    return next(error);
  }
};

exports.postAddAnc = async (req, res, next) => {
  const body = req.body;
  //const userid = req.session.userid;
  try {
    await Ancs.create({
      title: body.title,
      exp: body.exp,
    });
    res.redirect("/admin/ancs");
  } catch (error) {
    return next(error);
  }
};

exports.getEditABook = async (req, res, next) => {
  try {
    const selectedData = await Books.findByPk(req.params.id);
    // const users = await Users.findAll({ raw: true });

    console.log("selected data:", selectedData);
    res.render("admin/bookEdit", {
      data: selectedData,
      csrfToken: req.csrfToken(),
    });
  } catch (err) {
    return next(err);
  }
};

exports.getEditAnc = async (req, res, next) => {
  try {
    const selectedData = await Ancs.findByPk(req.params.id);
    // const users = await Users.findAll({ raw: true });

    console.log("selected data:", selectedData);
    res.render("admin/ancEdit", {
      data: selectedData,
      csrfToken: req.csrfToken(),
    });
  } catch (err) {
    return next(err);
  }
};

exports.postEditABook = async (req, res, next) => {
  try {
    const book = await Books.findByPk(req.body.id);
    if (book) {
      book.name = req.body.name;
      book.author = req.body.author;
      book.description = req.body.description;
      book.url = req.body.url;
      // book.slug = slugField(req.body.name);
      book.price = req.body.price;
      await book.save();
    }
    res.redirect("/admin/books");
  } catch (err) {
    return next(err);
  }

  res.render("admin/books");
};

exports.postEditAnc = async (req, res, next) => {
  try {
    const anc = await Ancs.findByPk(req.body.id);
    if (anc) {
      anc.title = req.body.title;
      anc.exp = req.body.exp;
      await anc.save();
    }
    res.redirect("/admin/ancs");
  } catch (err) {
    return next(err);
  }

  res.render("admin/ancs");
};

exports.postDeleteABook = async (req, res, next) => {
  const deldataIndex = data.findIndex((x) => x.id == req.body.id);
  data.splice(deldataIndex, 1); //başlangıç ve adet parametreleri

  try {
    await db.execute("DELETE from books WHERE id=?", [req.body.id]);
  } catch (err) {
    return next(err);
  }

  res.redirect("/admin/books");
};

exports.getDeleteABook = async (req, res, next) => {
  try {
    await Books.destroy({ where: { id: req.params.id } });
    res.redirect("/admin/books");
  } catch (err) {
    return next(err);
  }
};

exports.getDeleteAnc = async (req, res, next) => {
  try {
    await Ancs.destroy({ where: { id: req.params.id } });
    res.redirect("/admin/ancs");
  } catch (err) {
    return next(err);
  }
};
