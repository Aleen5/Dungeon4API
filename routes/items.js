var express = require('express');
var router = express.Router();
var items = require("../controllers/items");

const bodyParser = require('body-parser').json()

router.get("/items", items.list);
router.get("/items/:id", items.get);
router.post("/items", bodyParser, items.add);
router.put("/items/:id", bodyParser, items.update);
router.delete("/items/:id", items.delete);

module.exports = router;