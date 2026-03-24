const express = require('express');
const router = express.Router();
let users = [{
  "id": 1,
  "name": "name"
}];
let inc = 2;
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(users);
});
router.post('/', function(req, res, next) {
  const newUser = req.body;
  users.push({"id" : inc, "name" : req.body.name});
  inc++;
  res.status(201).json(newUser);
});
router.get('/:id', function(req, res, next) {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
})
module.exports = router;
