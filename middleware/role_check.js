// isAdmin.js
module.exports = {
  isAdmin: (req, res, next) => {
    if (!req.session.isAuth || req.session.role !== "admin") {
      return res.redirect("/auth/login");
    }
    next();
  },

  // isUser.js
  isUser: (req, res, next) => {
    if (!req.session.isAuth || req.session.role !== "user") {
      return res.redirect("/auth/login");
    }
    next();
  },
};
