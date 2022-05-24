var express = require('express')
const bodyParser = require('body-parser').json()
var router = express.Router()
var users = require("../controllers/users")


//router.get("/users", users.list);
router.get("/users/:username", users.get);
//router.get("/users/:username/:password", users.log); // LOGIN
router.post("/users/login", bodyParser, users.login);
router.post("/users", bodyParser, users.add);
router.put("/users/:username", bodyParser, users.update);
router.delete("/users/:username", users.delete);

module.exports = router;