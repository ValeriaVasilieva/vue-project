const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3003;
const cors = require("cors");
const handler = require("./handler");

app.use(express.json());
app.use("/", express.static("src"));
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.header(("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"));
    return res.status(200).json({});
  }
  next();
});

app.get("/api/paymentlist", (req, res) => {
  var top = +req.query.top;
  var skip = +req.query.skip;
  fs.readFile("src/server/bd/paymentlist.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else if (top !== undefined && skip !== undefined) {
      const newItems = JSON.parse(data).items.slice(skip, top + skip);
      res.send(
        JSON.stringify({
          items: newItems,
          totalCount: JSON.parse(data).totalCount,
          totalAmount: JSON.parse(data).totalAmount,
        })
      );
    } else {
      res.send(data);
    }
  });
});

app.post("/api/paymentlist", (req, res) => {
  handler(req, res, "add", "src/server/bd/paymentlist.json");
});

app.put("/api/paymentlist/:id", (req, res) => {
  handler(req, res, "change", "src/server/bd/paymentlist.json");
});

app.delete("/api/paymentlist/:id", (req, res) => {
  handler(req, res, "remove", "src/server/bd/paymentlist.json");
});

const port = process.env.PORT || PORT;
app.listen(port, () => console.log(`Listen on port ${port}...`));
