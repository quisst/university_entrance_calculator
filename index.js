const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
const config = require("./config/key");
const app = express();
const port = 8000;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/main.html");
});
app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/public/login.html");
});
app.get("/register", function (req, res) {
  res.sendFile(__dirname + "/public/register.html");
});
app.get("/view", function (req, res) {
  res.sendFile(__dirname + "/public/view.html");
});

app.listen(port, () => console.log(`app listening on port ${port}!`));

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      userInfo: userInfo,
    });
  });
});

app.post("/login", (req, res) => {
  User.findOne({ id: req.body.id }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "아이디를 다시 확인하세요.",
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 일치하지 않습니다.",
        });
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id, token: user.token });
      });
    });
  });
});

app.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, // role이 0이면 일반 유저, 그외는 관리자
    isAuth: true,
    name: req.user.name,
    role: req.user.role,
  });
});

app.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});
