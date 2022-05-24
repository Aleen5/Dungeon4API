var express = require('express');
var router = express.Router();
var users = require("../controllers/users");

const bodyParser = require('body-parser').json()

//router.get("/users", users.list);
router.get("/users/:username", users.get);
router.get("/users/:username/:password", users.log); // LOGIN
router.post("/users", bodyParser, users.add);
router.put("/users/:username", bodyParser, users.update);
router.delete("/users/:username", users.delete);

module.exports = router;