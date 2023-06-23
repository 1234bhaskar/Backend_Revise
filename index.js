import express from "express";
import path from "path";

const app = express();

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
app.get("/", (req, res) => {
  res.render("index", { name: "Bhaskar" });
});

app.listen(5000, () => {
  console.log("runnig server");
});
