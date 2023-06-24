import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();

const users = [];

// app.get("/", (req, res) => {
//   res.send("HI");
// });

// app.get("/", (req, res) => {
//   res.status = 404;
//   if (res.status == 404) res.send(404 + "Not fpund");
// });

//JSON imp
app.get("/products", (req, res) => {
  //res.sendStatus(500);
  res.json({
    success: true,
    product: [],
  });
});
// app.get("/", (req, res) => {
//   const pathloction = path.resolve();
//   res.sendFile(path.join(pathloction, "./index.html"));
// });

//EJS Template
//Setting up View Engine
app.set("view engine", "ejs");
// app.get("/ejs", (req, res) => {
//   //render method is used in case of rendering dynamic content like index.ejs
//   res.render("index", { name: "Bhaskar" });
// });

//for rendering static file
app.use(express.static(path.join(path.resolve(), "public")));

// app.get("/", (req, res) => {
//   //res.sendFile("index.html");
//   res.render("index", { name: "Bhaskar" });
// });

//to post form details we need to use app.use/middleware
//using middleware
app.use(express.urlencoded({ extended: true }));
//using redirect
app.get("/success", (req, res) => {
  //res.sendFile("index.html");
  res.render("success");
});

// app.post("/contacts", (req, res) => {
//   console.log(req.body);
//   //console.log(req.body.name);
//   users.push({ userName: req.body.name, userEmail: req.body.email });
//   //res.render("success");
//   res.redirect("/success");
// });

app.get("/users", (req, res) => {
  res.json({
    users,
  });
});

//Connecting to database MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "Backend_Revise",
  })
  .then(() => console.log("Database Connected"))
  .catch(() => {
    console.log("error");
  });

//Creating Schema
const dbSchema = new mongoose.Schema({
  name: String,
  email: String,
});
//Creating Modle/Collection
const Message = mongoose.model("Message", dbSchema);

app.get("/add", async (req, res) => {
  await Message.create({ name: "bhaskar", email: "bhas@113" });
  res.send("NICE");
});

app.post("/contacts", async (req, res) => {
  console.log(req.body);
  //console.log(req.body.name);
  const { name, email } = req.body;
  //users.push({ userName: req.body.name, userEmail: req.body.email });
  //res.render("success");
  await Message.create({ name: name, email: email });
  res.redirect("/success");
});

//authentication
const isAuthenticated = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    next();
    //res.render("logout");
  } else {
    res.render("login");
  }
};
app.use(cookieParser());

app.get("/", isAuthenticated, (req, res) => {
  res.render("logout");
});
// app.get("/", (req, res) => {
//   // console.log(req.cookies);
//   // console.log(req.cookies.token);
//   const { token } = req.cookies;
//   if (token) {
//     res.render("logout");
//   } else {
//     res.render("login");
//   }
//   //res.render("login");
// });
app.post("/login", (req, res) => {
  res.cookie("token", "iamIN", {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });

  res.redirect("/");
});
app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.redirect("/");
});

app.listen(5000, () => {
  console.log("runnig server");
});
