var express = require('express');
var router = express.Router();
var campaigns = require("../controllers/campaigns");

const bodyParser = require('body-parser').json()

router.get("/campaigns", campaigns.list);
router.get("/campaigns/:id", campaigns.get);
router.post("/campaigns", bodyParser, campaigns.add);
router.put("/campaigns/:id", bodyParser, campaigns.update);
router.delete("/campaigns/:id", campaigns.delete);

module.exports = router;