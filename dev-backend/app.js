require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const profileRoute = require("./routes/profile");
const postRoute = require("./routes/post");
const passport = require("passport");
const passport_jwt = require("./passport");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  next();
});

app.use(passport.initialize());
passport_jwt(passport);

app.use("/api/users", userRoute);
app.use("/api/profile", profileRoute);
app.use("/api/post", postRoute);

mongoose
  .connect(
    "mongodb+srv://abhay:Bangarang@cluster0.5ei76.mongodb.net/dev-app?retryWrites=true&w=majority"
  )
  .then(
    app.listen(process.env.PORT, () => {
      console.log(`listening at port ${process.env.PORT}`);
    })
  );
