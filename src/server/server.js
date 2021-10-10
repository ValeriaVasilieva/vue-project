const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3003;
const cors = require("cors");
// const handler = require("./handler");

app.use(express.json());
app.use("/", express.static("."));
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.header(("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"));
    return res.status(200).json({ tipe: "lala" });
  }
  next();
});

app.get("/api/paymentlist", (req, res) => {
  var page = +req.query.page;
  fs.readFile("src/server/bd/paymentlist.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else if (page) {
      console.log(page);
      console.log(
        JSON.stringify({
          items: JSON.parse(data).items.slice((page - 1) * 5, 5 * page),
          totalePages: JSON.parse(data).totalPages,
          totalAmount: JSON.parse(data).totalAmount,
        })
      );
      res.send(
        JSON.stringify({
          items: JSON.parse(data).items.slice((page - 1) * 5, 5 * page),
          totalePages: JSON.parse(data).totalPages,
          totalAmount: JSON.parse(data).totalAmount,
        })
      );
      // res.send(JSON.stringify({ text: "lalas" }));
    } else {
      res.send(data);
    }
  });
});

// app.post("/api/cart/", (req, res) => {
//   handler(req, res, "add", "server/db/userCart.json");
// });

// app.put("/api/cart/:id", (req, res) => {
//   handler(req, res, "change", "server/db/userCart.json");
// });

// app.delete("/api/cart/:id", (req, res) => {
//   handler(req, res, "remove", "server/db/userCart.json");
// });

const port = process.env.PORT || PORT;
app.listen(port, () => console.log(`Listen on port ${port}...`));
