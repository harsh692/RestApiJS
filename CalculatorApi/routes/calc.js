const express = require("express")
const router = express.Router();
const {handleCalculation,handleExp} = require("../controllers/calc")
router.get('/',handleCalculation);
router.get('/current',handleExp);

module.exports = router