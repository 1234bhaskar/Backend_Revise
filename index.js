import express from "express";
import path from "path";

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
app.get("/ejs", (req, res) => {
  //render method is used in case of rendering dynamic content like index.ejs
  res.render("index", { name: "Bhaskar" });
});

//for rendering static file
app.use(express.static(path.join(path.resolve(), "public")));
app.get("/", (req, res) => {
  //res.sendFile("index.html");
  res.render("index", { name: "Bhaskar" });
});

//to post form details we need to use app.use/middleware
//using middleware
app.use(express.urlencoded({ extended: true }));
//using redirect
app.get("/success", (req, res) => {
  //res.sendFile("index.html");
  res.render("success");
});
app.post("/contacts", (req, res) => {
  console.log(req.body);
  //console.log(req.body.name);
  users.push({ userName: req.body.name, userEmail: req.body.email });
  //res.render("success");
  res.redirect("/success");
});

app.get("/users", (req, res) => {
  res.json({
    users,
  });
});

app.listen(5000, () => {
  console.log("runnig server");
});
