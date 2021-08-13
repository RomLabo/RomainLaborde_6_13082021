const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauce');

router.post('/', sauceController.createSauce);
router.get('/', sauceController.getAllSauces);

module.exports = router;