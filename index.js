const express = require("express");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
const session = require("express-session");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const galleryRouter = require("./routes/gallery");
const userRouter = require("./routes/user");
const db = require("./data/db");
const users = require("./models/users");
const books = require("./models/books");
const basket = require("./models/basket");
const VisitCounter = require("./models/counter");
const basketBook = require("./models/basketBooks");
const csurf = require("csurf");
const configSession = require("./middleware/config_session");
const Books = require("./models/books");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let onlineUsers = 0;

io.on("connection", (socket) => {
  onlineUsers++;
  io.emit("onlineUsers", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers--;
    io.emit("onlineUsers", onlineUsers);
  });
});

// Set view engine
app.set("view engine", "ejs");

// Static
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use("/img", express.static(path.join(__dirname, "img")));

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(configSession);
app.use(csurf());

(async () => {
  await db.sync({ alter: true });
  const [counter, created] = await VisitCounter.findOrCreate({
    where: { id: 1 },
    defaults: { count: 0 },
  });
})();

app.get("/", async (req, res, next) => {
  console.log("Ana sayfa isteği alındı");
  const counter = await VisitCounter.findByPk(1);
  await counter.increment("count");
  console.log("Sayaç artırıldı: ", counter.count);

  // Read images from the img folder
  const fs = require("fs");
  const imageDir = path.join(__dirname, "img");
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      return next(err);
    }
    const images = files.filter((file) => /\.(jpg|jpeg|png|gif)$/.test(file));
    res.render("start", { visitCount: counter.count, images });
  });
});

// Resim yükleme rotası
app.post("/upload", upload.single("image"), (req, res) => {
  res.redirect("/");
});

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);
//app.use("/siteMap", sitemapRouter);
// app.use("/galeri", galleryRouter);

app.use((err, req, res, next) => {
  res.render("error", {
    title: "Error Page",
    contentTitle: "Error Page",
    err: err,
  });
  if (err.code !== "EBADCSRFTOKEN") return next(err);
  res.status(403);
  res.send("form tamper with");
  console.log("Hatamız=", err);
});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});
