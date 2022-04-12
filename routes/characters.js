var express = require('express');
var router = express.Router();
var characters = require("../controllers/characters");

const bodyParser = require('body-parser').json()

router.get("/characters", characters.list);
router.get("/characters/:id", characters.get);
router.post("/characters", bodyParser, characters.add);
router.put("/characters/:id", bodyParser, characters.update);
router.delete("/characters/:id", characters.delete);

module.exports = router;