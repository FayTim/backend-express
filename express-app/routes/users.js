const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY AUTOINCREMENT, name text)`);

// let users = [{
//     "id": 1,
//     "name": "Файзуллин Тимур"
//   },
//   {
//     "id": 2,
//     "name": "Сергеев Матвей"
//   }];

let inc = 3;
/* GET users listing. */
router.get('/', function(req, res, next) {
  db.all("SELECT id, name FROM users", [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});
router.post('/', function(req, res, next) {
  const name = req.body.name;
  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, [name], function(err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({
        id: this.lastID,
        name: name
      });
    }
  });
});
router.get('/:id', function(req, res, next) {
  const id = parseInt(req.params.id);
  db.get("SELECT id, name FROM users WHERE id = ?", [id], (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    } else if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Пользователя нет' });
    }
  });
})
module.exports = router;
