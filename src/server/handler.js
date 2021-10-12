const method = require("./methods");
const fs = require("fs");

const actions = {
  add: method.add,
  change: method.change,
  remove: method.remove,
};
//HANDLER отвечает за изменение данных в самом файле
let handler = (req, res, action, file) => {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      let newItem = actions[action](JSON.parse(data), req);
      fs.writeFile(file, newItem, (err) => {
        if (err) {
          res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
          res.send(JSON.stringify({ result: 1 }));
        }
      });
    }
  });
};

module.exports = handler;
