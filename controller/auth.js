//const authData=require("../data/authdata");
const session = require("express-session");

const Users = require("../models/users");

exports.getLogin = (req, res, next) => {
  const message = req.session.message;
  console.log("mesaj", message);
  delete req.session.message; //sadece message session silinir. destroy tümünü siler.
  res.render("auth/login", {
    title: "Login",
    contentTitle: "Login",
    message: message,
    csrfToken: req.csrfToken(),
  });
};

exports.postLogin = async (req, res, next) => {
  console.log(req.body);
  const role = req.body.role;
  const user = await Users.findAll({
    where: {
      email: req.body.email,
    },
    raw: true,
  });
  console.log(user);

  if (user.length == 0) {
    req.session.message = { text: "Email hatalı", class: "warning" };
    console.log("mesaj1=", req.session.message);
    return res.redirect("login");
  }

  console.log(user[0].password);

  if (req.body.password == user[0].password) {
    //şifre uyuşuyorsa
    req.session.isAuth = 1;
    req.session.userid = user[0].id;
    req.session.role = user[0].role;

    let defaultUrl = user[0].role === "admin" ? "/admin/books" : "/user/";
    return res.redirect(defaultUrl);
  }

  //şifre uyuşmuyorsa
  req.session.message = { text: "Şifre hatalı", class: "warning" };
  return res.redirect("login");
};

exports.signout = async (req, res) => {
  await req.session.destroy(); //session temizle
  res.redirect("/auth/login"); //ana sayfaya git
};
